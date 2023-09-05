import React from "react";
import styles from "./CameraControls.module.css";
import Button from "./Button";
import {
  captureImage,
  cameraOn,
  cameraOff,
  microphoneOn,
  microphoneOff,
  unmute,
  mute,
} from "../images/icons";
import ControlButton from "./ControlButton";

function CameraControls({
  isCameraOn,
  isMicrophoneOn,
  isUnmute,
  toggleCamera,
  captureUtility,
  toggleMicrophone,
  toggleVideoVolume,
}) {
  const controls = [
    {
      onClick: toggleCamera,
      title: isCameraOn ? "Turn off the camera" : "Turn on the camera",
      isActive: isCameraOn,
      iconActive: cameraOn,
      iconInactive: cameraOff,
    },
    {
      onClick: toggleMicrophone,
      title: isMicrophoneOn
        ? "Turn off the microphone"
        : "Turn on the microphone",
      isActive: isMicrophoneOn,
      iconActive: microphoneOn,
      iconInactive: microphoneOff,
    },
    {
      onClick: toggleVideoVolume,
      title: isUnmute ? "Mute" : "Enable sound",
      isActive: isUnmute,
      iconActive: unmute,
      iconInactive: mute,
    },
    {
      onClick: captureUtility,
      title: "Capture snapshot",
      iconActive: captureImage,
      iconInactive: captureImage,
    },
  ];

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.controlsWrapper}>
        {controls.map((control, index) => (
          <ControlButton key={index} {...control} />
        ))}
      </div>
    </div>
  );
}

export default CameraControls;
