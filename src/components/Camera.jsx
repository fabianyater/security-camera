import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Camera.module.css";
import CaptureList from "./CaptureList";
import { useCaptureImage } from "../hooks/useCaptureImage";
import { startCameraStream, stopCameraStream } from "../utils/cameraUtils";

function Camera() {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [capturedImages, setCapturedImages] = useState([]);
  const [captureInterval, setCaptureInterval] = useState(null);
  const videoRef = useRef(null);
  const { captureImage } = useCaptureImage(videoRef);

  const toggleCamera = useCallback(() => {
    if (isCameraOn) {
      stopCameraStream(videoRef);
      stopAutomaticCapture();
    } else {
      startCameraStream(videoRef);
      startAutomaticCapture();
    }

    setIsCameraOn((prevState) => !prevState);
    localStorage.setItem("cameraState", isCameraOn ? "off" : "on");
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

  const startAutomaticCapture = () => {
    if (captureInterval === null) {
      const interval = setInterval(function () {
        if (isCameraOn) {
          handleCapture();
        }
      }, 5000);
      setCaptureInterval(interval);
    }
  };

  const stopAutomaticCapture = () => {
    clearInterval(captureInterval);
    setCaptureInterval(null); // Limpiar el intervalo al detener la captura automática
  };

  useEffect(() => {
    const storedCameraState = localStorage.getItem("cameraState");

    if (storedCameraState === "off") {
      stopCameraStream(videoRef);
      stopAutomaticCapture();
      setIsCameraOn(false);
    } else {
      startCameraStream(videoRef);
      startAutomaticCapture();
    }

    console.log({capturedImages});

    return () => {
      stopAutomaticCapture(); // Detener el intervalo al desmontar el componente
    };
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
      <div className={styles.capture}>
        <CaptureList
          title="Captures"
          capturedImages={capturedImages}
          onDeleteImage={handleDeleteImage}
        />
      </div>
    </div>
  );
}

export default Camera;
