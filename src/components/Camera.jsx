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
import { useRecording } from "../hooks/useRecording";

function Camera() {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [capturedImages, setCapturedImages] = useState([]);
  const [captureInterval] = useState(null);
  const videoRef = useRef(null);
  const { startRecording, videoList } = useRecording(
    isCameraOn,
    videoRef
  );
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
