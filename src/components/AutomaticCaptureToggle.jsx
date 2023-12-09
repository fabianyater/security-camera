import React from "react";
import Toggle from "./Toggle";
import styles from "./AutomaticCaptureToggle.module.css";

function AutomaticCapture({ isAutoCaptureOn, toggleAutoCapture }) {
  const UNABLE = "Unable";
  const ENABLE = "Enable";
  
  return (
    <div className={styles.autoCapture}>
      <p>{isAutoCaptureOn ? UNABLE : ENABLE} automatic captures</p>
      <Toggle isAutomatic={isAutoCaptureOn} onToggle={toggleAutoCapture} />
    </div>
  );
}

export default AutomaticCapture;
