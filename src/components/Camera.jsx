import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Camera.module.css";
import { useCaptureImage } from "../hooks/useCaptureImage";
import {
  startAutomaticCapture,
  startCameraStream,
  stopAutomaticCapture,
  stopCameraStream,
} from "../utils/cameraUtils";
import Tabs from "./Tabs";
import createTabsConfig from "../utils/tabsConfig";

function Camera() {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [capturedImages, setCapturedImages] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [captureInterval] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [videoChunks, setVideoChunks] = useState([]);
  const videoRef = useRef(null);
  const { captureImage } = useCaptureImage(videoRef);

  const toggleCamera = useCallback(() => {
    if (isCameraOn) {
      stopCameraStream(videoRef);
      stopAutomaticCapture(captureInterval);
    } else {
      startCameraStream(videoRef);
      startAutomaticCapture(captureInterval, isCameraOn, handleCapture);
    }

    setIsCameraOn((prevState) => !prevState);
    localStorage.setItem("cameraState", isCameraOn ? "off" : "on");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCameraOn]);

  const handleCapture = () => {
    const newImage = captureImage();

    if (newImage) {
      setCapturedImages((prevImages) => [...prevImages, newImage]);
    }
  };

  const handleDeleteImage = (index) => {
    const newCapturedImages = [...capturedImages];
    newCapturedImages.splice(index, 1);
    setCapturedImages(newCapturedImages);
  };

  const startRecording = useCallback(() => {
    if (isCameraOn && !isRecording) {
      // Initialize video chunks
      setVideoChunks([]);

      // Access the current video stream
      const stream = videoRef.current.srcObject;
      if (!stream) {
        console.error("Stream not available");
        return;
      }

      try {
        // Create a new Media Recorder
        const newMediaRecorder = new MediaRecorder(stream);

        // Current recording start time
        const currentRecordingStartTime = Date.now();

        // On data available
        newMediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setVideoChunks((prevChunks) => [...prevChunks, event.data]);
          }
        };

        // On stop
        newMediaRecorder.onstop = () => {
          setVideoChunks((chunks) => {
            const blob = new Blob(chunks, { type: "video/webm" });
            const videoUrl = URL.createObjectURL(blob);
  
            setVideoList((prevList) => [
              ...prevList,
              {
                videoUrl,
                videoStartTime: currentRecordingStartTime,
              },
            ]);
            return [];
          });
        };

        newMediaRecorder.onerror = (e) => {
          console.error("MediaRecorder error", e);
        };

        // Start recording
        newMediaRecorder.start();
        setIsRecording(true);
        setRecordingStartTime(Date.now());

        // Stop recording after 30 seconds
        setTimeout(() => {
          newMediaRecorder.stop();
          setIsRecording(false);
          startRecording();
        }, 30000);
      } catch (e) {
        console.error("Failed to start recording");
      }
    }
  }, [isCameraOn, isRecording]);

  useEffect(() => {
    const storedCameraState = localStorage.getItem("cameraState");

    if (storedCameraState === "off") {
      stopCameraStream(videoRef);
      stopAutomaticCapture();
      setIsCameraOn(false);
    } else {
      startCameraStream(videoRef)
        .then(() => {
          startAutomaticCapture(captureInterval, isCameraOn, handleCapture);
          startRecording();
        })
        .catch((error) => {
          console.error("Could not start camera: ", error);
        });
    }

    return () => {
      stopAutomaticCapture();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(videoList);
  }, [videoList]);

  const tabs = createTabsConfig({
    capturedImages,
    capturedVideos: videoList,
    handleDeleteImage,
  });

  return (
    <div className={styles.camera}>
      <div className={styles.videoWrapper}>
        <video ref={videoRef} autoPlay muted />
      </div>
      <div>
        <button className={styles.toggleButton} onClick={toggleCamera}>
          {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </button>
        <button className={styles.toggleButton} onClick={handleCapture}>
          Capture
        </button>
      </div>
      <div className={styles.tabs}>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

export default Camera;
