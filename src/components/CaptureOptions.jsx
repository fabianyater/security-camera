import React from "react";
import styles from "./CaptureOptions.module.css";
import AutomaticCaptureToggle from "./AutomaticCaptureToggle";
import CaptureIntervalSelector from "./CaptureIntervalSelector";
import Button from "./Button";
import download from "../images/download.svg";
import { downloadAllFiles } from "../utils/filesActions";

function CaptureOptions({
  isAutoCaptureOn,
  toggleAutoCapture,
  customInterval,
  onChangeInterval,
  capturedImages,
  id,
}) {
  const ID = "automaticCaptures";

  return (
    <div className={styles.captureOptions}>
      <Button
        disabled={capturedImages <= 0}
        title="Descargar todas las imágenes"
        label="Descargar todas las imágenes"
        onClick={() => downloadAllFiles(capturedImages, "images")}
        backgroundColor="#007BFF"
      >
        <img src={download} alt="Download all snapshots" />
      </Button>
      {isAutoCaptureOn && id === ID && (
        <CaptureIntervalSelector
          customInterval={customInterval}
          onChangeInterval={onChangeInterval}
          isAutoCaptureOn
        />
      )}
      {id === ID && (
        <AutomaticCaptureToggle
          isAutoCaptureOn={isAutoCaptureOn}
          toggleAutoCapture={toggleAutoCapture}
        />
      )}
    </div>
  );
}

export default CaptureOptions;
