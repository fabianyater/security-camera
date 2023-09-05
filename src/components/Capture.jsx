import React from "react";
import styles from "./Capture.module.css";
import AutomaticCaptureToggle from "./AutomaticCaptureToggle";
import CaptureList from "./CaptureList";

function Capture({
  title,
  capturedImages,
  onDeleteImage,
  isAutoCaptureOn,
  toggleAutoCapture,
  id,
}) {
  return (
    <div className={styles.captureContainer}>
      <h2 className={styles.title}>{title}</h2>
      <AutomaticCaptureToggle
        id={id}
        isAutoCaptureOn={isAutoCaptureOn}
        toggleAutoCapture={toggleAutoCapture}
      />
      <CaptureList
        capturedImages={capturedImages}
        onDeleteImage={onDeleteImage}
      />
    </div>
  );
}

export default Capture;
