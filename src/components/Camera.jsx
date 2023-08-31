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
  const [captureInterval, setCaptureInterval] = useState(null);
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

  const tabs = createTabsConfig({
    capturedImages,
    handleDeleteImage,
  });

  useEffect(() => {
    const storedCameraState = localStorage.getItem("cameraState");

    if (storedCameraState === "off") {
      stopCameraStream(videoRef);
      stopAutomaticCapture();
      setIsCameraOn(false);
    } else {
      startCameraStream(videoRef);
      startAutomaticCapture(captureInterval, isCameraOn, handleCapture);
    }

    console.log({ capturedImages });

    return () => {
      stopAutomaticCapture(); // Detener el intervalo al desmontar el componente
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
