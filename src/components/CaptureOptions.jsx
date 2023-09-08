import React from "react";
import styles from "./CaptureOptions.module.css";
import AutomaticCaptureToggle from "./AutomaticCaptureToggle";
import CaptureIntervalSelector from "./CaptureIntervalSelector";
import { downloadAllFiles } from "../utils/cameraActions";
import Button from "./Button";
import download from "../images/download.svg";

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
      {id === ID && (
        <AutomaticCaptureToggle
          isAutoCaptureOn={isAutoCaptureOn}
          toggleAutoCapture={toggleAutoCapture}
        />
      )}
      {isAutoCaptureOn && id === ID && (
        <CaptureIntervalSelector
          customInterval={customInterval}
          onChangeInterval={onChangeInterval}
          isAutoCaptureOn
        />
      )}
      {capturedImages.length > 0 && (
        <Button
          title="Descargar todas las imágenes"
          label="Descargar todas las imágenes"
          onClick={() => downloadAllFiles(capturedImages, "images")}
          backgroundColor="#007BFF"
        >
          <img src={download} alt="Download all snapshots" />
        </Button>
      )}
    </div>
  );
}

export default CaptureOptions;
