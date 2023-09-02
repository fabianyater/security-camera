import React from "react";
import styles from "./CameraControls.module.css";
import Button from "./Button";
import captureImage from "../images/capture-image.svg";
import cameraOn from "../images/camera-on.svg";
import cameraOff from "../images/camera-off.svg";
import microphoneOn from "../images/microphone-on.svg";
import microphoneOff from "../images/microphone-off.svg";
import unmute from "../images/unmute.svg";
import mute from "../images/mute.svg";

function CameraControls({
  isCameraOn,
  isMicrophoneOn,
  isUnmute,
  toggleCamera,
  captureUtility,
  toggleMicrophone,
  toggleVideoVolume,
}) {
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.controlsWrapper}>
        <Button
          onClick={toggleCamera}
          title={isCameraOn ? "Turn off the camera" : "Turn on the camera"}
          isActive={isCameraOn}
        >
          {isCameraOn ? (
            <img src={cameraOn} alt="Turn on the camera" />
          ) : (
            <img src={cameraOff} alt="Turn off the camera" />
          )}
        </Button>
        <Button
          onClick={toggleMicrophone}
          title={isMicrophoneOn ? "Turn off the microphone" : "Turn on the microphone"}
          isActive={isMicrophoneOn}
        >
          {isMicrophoneOn ? (
            <img src={microphoneOn} alt="Turn on the microphone" />
          ) : (
            <img src={microphoneOff} alt="Turn off the microphone" />
          )}
        </Button>
        <Button
          onClick={toggleVideoVolume}
          title={isUnmute ? "Mute" : "Enable sound"}
          isActive={isUnmute}
        >
          {isUnmute ? (
            <img src={unmute} alt="Enable sound" />
          ) : (
            <img src={mute} alt="Mute" />
          )}
        </Button>
        <Button onClick={captureUtility} title="Capture snapshot">
          <img
            src={captureImage}
            alt="Capture snapshot from the stream video"
          />
        </Button>
      </div>
    </div>
  );
}

export default CameraControls;
