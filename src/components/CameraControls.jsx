import React from "react";
import styles from "./CameraControls.module.css";
import Button from "./Button";
import captureImage from "../images/capture-image.svg";
import cameraOn from "../images/camera-on.svg";
import cameraOff from "../images/camera-off.svg";

function CameraControls({ isCameraOn, toggleCamera, captureUtility }) {
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.controlsWrapper}>
        <Button onClick={toggleCamera}>
          {isCameraOn ? (
            <img src={cameraOn} alt="Turn on the camera" />
          ) : (
            <img src={cameraOff} alt="Turn off the camera" />
          )}
        </Button>
        <Button onClick={captureUtility}>
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
