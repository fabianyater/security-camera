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
  getAvailableCameras,
} from "../utils/cameraActions";
import Tabs from "./Tabs";
import createTabsConfig from "../utils/tabsConfig";
import { useRecording } from "../hooks/useRecording";
import CameraControls from "./CameraControls";
import createCameraControlsConfig from "../utils/cameraControlsConfig";

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
  const [customInterval, setCustomInterval] = useState(5000);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const videoRef = useRef(null);
  const { startRecording, videoList } = useRecording(isCameraOn, videoRef);
  const { captureImage } = useCaptureImage(videoRef);
  const deleteAutomaticCapturedImage = (index) =>
    handleDeleteImage(
      index,
      capturedAtuomaticImages,
      setcapturedAtuomaticImages
    );

  const deleteImage = (index) =>
    handleDeleteImage(index, capturedImages, setcapturedImages);

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

  const changeCaptureInterval = (newInterval) => {
    stopAutomaticCapture(captureInterval);
    const newCaptureInterval = startAutomaticCapture(
      null,
      captureUtility,
      newInterval
    );
    setCaptureInterval(newCaptureInterval);
    setCustomInterval(newInterval);
  };

  const toggleAutoCapture = () => {
    if (isAutoCaptureOn) {
      stopAutomaticCapture(captureInterval);
      setCaptureInterval(null);
      setIsAutoCaptureOn(false);
      localStorage.setItem("autoCaptureState", "false");
    } else {
      const newInterval = startAutomaticCapture(
        null,
        captureUtility,
        customInterval
      );
      setCaptureInterval(newInterval);
      setIsAutoCaptureOn(true);
      localStorage.setItem("autoCaptureState", "true");
    }
  };

  const changeCamera = async (deviceId) => {
    stopCameraStream(videoRef);
    startCameraStream(videoRef, deviceId)
      .then(() => {
        setSelectedCamera(deviceId);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
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
            const newInterval = startAutomaticCapture(
              null,
              captureUtility,
              customInterval
            );
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

    getAvailableCameras(setCameras, setSelectedCamera);

    return () => {
      stopAutomaticCapture();
    };
  }, []);

  const tabs = createTabsConfig({
    capturedImages,
    capturedAtuomaticImages,
    capturedVideos: videoList,
    handleDeleteAutoCapturedImage: deleteAutomaticCapturedImage,
    handleDeleteImage: deleteImage,
    isAutoCaptureOn: isAutoCaptureOn,
    toggleAutoCapture: toggleAutoCapture,
    customInterval,
    onChangeInterval: changeCaptureInterval,
  });

  const cameraControls = createCameraControlsConfig({
    isCameraOn,
    isMicrophoneOn,
    isUnmute,
    captureUtility: captureSnapshot,
    toggleCamera,
    toggleMicrophone,
    toggleVideoVolume,
  });

  return (
    <main className={styles.camera}>
      <section className={styles.videoWrapper}>
        <video ref={videoRef} autoPlay />
        {isCameraOn && <div className={styles.recordingLabel}></div>}
        <CameraControls controls={cameraControls}/>
      </section>
      <section>
        <select
          onChange={(e) => changeCamera(e.target.value)}
          value={selectedCamera}
          className={styles.customSelect}
        >
          {cameras.map((camera, index) => (
            <option key={index} value={camera.deviceId}>
              {camera.label}
            </option>
          ))}
        </select>
      </section>
      <section className={styles.tabs}>
        <Tabs tabs={tabs} />
      </section>
    </main>
  );
}

export default Camera;
