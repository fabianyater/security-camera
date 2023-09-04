import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Camera.module.css";
import { useCaptureImage } from "../hooks/useCaptureImage";
import {
  startCameraStream,
  stopAutomaticCapture,
  stopCameraStream,
  handleCapture,
  handleDeleteImage,
  muteMicrophone,
  unmuteMicrophone,
  unmuteVideoVolume,
  muteVideoVolume,
  startAutomaticCapture,
} from "../utils/cameraActions";
import Tabs from "./Tabs";
import createTabsConfig from "../utils/tabsConfig";
import { useRecording } from "../hooks/useRecording";
import CameraControls from "./CameraControls";

function Camera() {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isUnmute, setIsUnmute] = useState(true);
  const [isAutoCaptureOn, setIsAutoCaptureOn] = useState(() => {
    const storedState = localStorage.getItem("autoCaptureState");
    return storedState === "true";
  });
  const [capturedAtuomaticImages, setcapturedAtuomaticImages] = useState([]);
  const [capturedImages, setcapturedImages] = useState([]);
  const [captureInterval, setCaptureInterval] = useState(null);
  const videoRef = useRef(null);
  const { startRecording, videoList } = useRecording(isCameraOn, videoRef);
  const { captureImage } = useCaptureImage(videoRef);
  const deleteImage = (index) =>
    handleDeleteImage(
      index,
      capturedAtuomaticImages,
      setcapturedAtuomaticImages
    );

  const captureUtility = useCallback(
    () => handleCapture(captureImage, setcapturedAtuomaticImages),
    [captureImage]
  );

  const captureSnapshot = useCallback(
    () => handleCapture(captureImage, setcapturedImages),
    [captureImage]
  );

  const toggleCamera = useCallback(() => {
    if (isCameraOn) {
      stopCameraStream(videoRef);
      setIsCameraOn(false);
      localStorage.setItem("cameraState", "off");
    } else {
      startCameraStream(videoRef)
        .then(() => {
          startRecording();
          setIsCameraOn(true);
          localStorage.setItem("cameraState", "on");
        })
        .catch((error) => console.log("Error: ", error));
    }
  }, [isCameraOn, startRecording]);

  const toggleMicrophone = () => {
    if (isMicrophoneOn) {
      muteMicrophone(videoRef);
      setIsMicrophoneOn(false);
    } else {
      unmuteMicrophone(videoRef);
      setIsMicrophoneOn(true);
    }
  };

  const toggleVideoVolume = () => {
    if (isUnmute) {
      muteVideoVolume(videoRef);
      setIsUnmute(false);
    } else {
      unmuteVideoVolume(videoRef);
      setIsUnmute(true);
    }
  };

  const toggleAutoCapture = () => {
    if (isAutoCaptureOn) {
      stopAutomaticCapture(captureInterval);
      setCaptureInterval(null);
      setIsAutoCaptureOn(false);
      localStorage.setItem("autoCaptureState", "false");
    } else {
      const newInterval = startAutomaticCapture(null, captureUtility);
      setCaptureInterval(newInterval);
      setIsAutoCaptureOn(true);
      localStorage.setItem("autoCaptureState", "true");
    }
  };

  useEffect(() => {
    const storedCameraState = localStorage.getItem("cameraState");
    const storedAutoCaptureState = localStorage.getItem("autoCaptureState");

    if (storedCameraState === "off") {
      stopCameraStream(videoRef);
      stopAutomaticCapture(captureInterval);
      setIsCameraOn(false);
    } else {
      startCameraStream(videoRef)
        .then(() => {
          if (storedAutoCaptureState === "true") {
            const newInterval = startAutomaticCapture(null, captureUtility);
            setCaptureInterval(newInterval);
            setIsAutoCaptureOn(true);
          } else {
            stopAutomaticCapture(captureInterval);
            setCaptureInterval(null);
            setIsAutoCaptureOn(false);
          }
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
    capturedAtuomaticImages,
    capturedVideos: videoList,
    handleDeleteImage: deleteImage,
    isAutoCaptureOn: isAutoCaptureOn,
    toggleAutoCapture: toggleAutoCapture,
  });

  return (
    <div className={styles.camera}>
      <div className={styles.videoWrapper}>
        <video ref={videoRef} autoPlay />
        <CameraControls
          isCameraOn={isCameraOn}
          isMicrophoneOn={isMicrophoneOn}
          isUnmute={isUnmute}
          toggleCamera={toggleCamera}
          captureUtility={captureSnapshot}
          toggleMicrophone={toggleMicrophone}
          toggleVideoVolume={toggleVideoVolume}
        />
      </div>
      <div className={styles.tabs}>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

export default Camera;
