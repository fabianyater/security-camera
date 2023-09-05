import React from "react";
import styles from "./CaptureOptions.module.css";
import AutomaticCaptureToggle from "./AutomaticCaptureToggle";
import CaptureIntervalSelector from "./CaptureIntervalSelector";

function CaptureOptions({
  isAutoCaptureOn,
  toggleAutoCapture,
  customInterval,
  onChangeInterval,
  id,
}) {
  return (
    <div className={styles.captureOptions}>
      <AutomaticCaptureToggle
        id={id}
        isAutoCaptureOn={isAutoCaptureOn}
        toggleAutoCapture={toggleAutoCapture}
      />
      {isAutoCaptureOn && (
        <CaptureIntervalSelector
          customInterval={customInterval}
          onChangeInterval={onChangeInterval}
          id={id}
          isAutoCaptureOn
        />
      )}
    </div>
  );
}

export default CaptureOptions;
