import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Camera.module.css";
import { useCaptureImage } from "../hooks/useCaptureImage";
import {
  startCameraStream,
  stopAutomaticCapture,
  stopCameraStream,
  handleCapture,
  handleDeleteImage,
  startAutomaticCapture,
  muteMicrophone,
  unmuteMicrophone,
} from "../utils/cameraActions";
import Tabs from "./Tabs";
import createTabsConfig from "../utils/tabsConfig";
import { useRecording } from "../hooks/useRecording";
import CameraControls from "./CameraControls";

function Camera() {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [capturedImages, setCapturedImages] = useState([]);
  const [captureInterval] = useState(null);
  const videoRef = useRef(null);
  const { startRecording, videoList } = useRecording(isCameraOn, videoRef);
  const { captureImage } = useCaptureImage(videoRef);
  const deleteImage = (index) =>
    handleDeleteImage(index, capturedImages, setCapturedImages);
  const captureUtility = useCallback(
    () => handleCapture(captureImage, setCapturedImages),
    [captureImage]
  );

  const toggleCamera = useCallback(() => {
    if (isCameraOn) {
      stopCameraStream(videoRef);
      stopAutomaticCapture(captureInterval);
      setIsCameraOn(false);
      localStorage.setItem("cameraState", "off");
    } else {
      startCameraStream(videoRef)
        .then(() => {
          startAutomaticCapture(captureInterval, captureUtility);
          startRecording();
          setIsCameraOn(true);
          localStorage.setItem("cameraState", "on");
        })
        .catch((error) => console.log("Error: ", error));
    }
  }, [captureInterval, captureUtility, isCameraOn, startRecording]);

  const toggleMicrophone = () => {
    if (isMicrophoneOn) {
      muteMicrophone(videoRef);
      setIsMicrophoneOn(false);
    } else {
      unmuteMicrophone(videoRef);
      setIsMicrophoneOn(true);
    }
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
          startAutomaticCapture(captureInterval, captureUtility);
          startRecording();
        })
        .catch((error) => {
          console.error("Could not start camera: ", error);
        });
      setIsCameraOn(true);
    }

    return () => {
      stopAutomaticCapture();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = createTabsConfig({
    capturedImages,
    capturedVideos: videoList,
    handleDeleteImage: deleteImage,
  });

  return (
    <div className={styles.camera}>
      <div className={styles.videoWrapper}>
        <video ref={videoRef} autoPlay muted />
        <CameraControls
          isCameraOn={isCameraOn}
          isMicrophoneOn={isMicrophoneOn}
          toggleCamera={toggleCamera}
          captureUtility={captureUtility}
          toggleMicrophone={toggleMicrophone}
        />
      </div>
      <div className={styles.tabs}>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

export default Camera;
