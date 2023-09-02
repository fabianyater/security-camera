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
          title={isCameraOn ? "Apagar Cámara" : "Encender Cámara"}
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
          title={isMicrophoneOn ? "Apagar Micrófono" : "Encender Micrófono"}
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
          title={isUnmute ? "Silenciar" : "Activar sonido"}
          isActive={isUnmute}
        >
          {isUnmute ? (
            <img src={unmute} alt="Turn on the volume" />
          ) : (
            <img src={mute} alt="Turn off the volume" />
          )}
        </Button>
        <Button onClick={captureUtility} title="Tomar Captura">
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
