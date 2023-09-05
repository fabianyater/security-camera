import React from "react";
import Toggle from "./Toggle";
import styles from "./AutomaticCaptureToggle.module.css";

function AutomaticCapture({ isAutoCaptureOn, toggleAutoCapture, id }) {
  return (
    id ===
    "automaticCaptures"  && (
      <div className={styles.autoCapture}>
        <p>{isAutoCaptureOn ? "Desactivar" : "Activar"} capturas automáticas</p>
        <Toggle isAutomatic={isAutoCaptureOn} onToggle={toggleAutoCapture} />
      </div>
    )
  );
}

export default AutomaticCapture;
