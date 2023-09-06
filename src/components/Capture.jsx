import React from "react";
import styles from "./Capture.module.css";
import CaptureList from "./CaptureList";
import CaptureOptions from "./CaptureOptions";

function Capture({
  title,
  capturedImages,
  onDeleteImage,
  isAutoCaptureOn,
  toggleAutoCapture,
  customInterval,
  onChangeInterval,
  id,
}) {
  return (
    <div className={styles.captureContainer}>
      <h2 className={styles.title}>{title}</h2>
      <CaptureOptions
        customInterval={customInterval}
        isAutoCaptureOn={isAutoCaptureOn}
        onChangeInterval={onChangeInterval}
        toggleAutoCapture={toggleAutoCapture}
        capturedImages={capturedImages}
        id={id}
      />
      <CaptureList
        capturedImages={capturedImages}
        onDeleteImage={onDeleteImage}
      />
    </div>
  );
}

export default Capture;
