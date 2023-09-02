import React from "react";
import styles from "./CameraControls.module.css";
import Button from "./Button";
import captureImage from "../images/capture-image.svg";
import cameraOn from "../images/camera-on.svg";
import cameraOff from "../images/camera-off.svg";
import microphoneOn from "../images/microphone-on.svg";
import microphoneOff from "../images/microphone-off.svg";

function CameraControls({
  isCameraOn,
  isMicrophoneOn,
  toggleCamera,
  captureUtility,
  toggleMicrophone,
}) {
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.controlsWrapper}>
        <Button
          onClick={toggleCamera}
          title={isCameraOn ? "Apagar Cámara" : "Encender Cámara"}
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
        >
          {isMicrophoneOn ? (
            <img src={microphoneOn} alt="Turn on the microphone" />
          ) : (
            <img src={microphoneOff} alt="Turn off the microphone" />
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
