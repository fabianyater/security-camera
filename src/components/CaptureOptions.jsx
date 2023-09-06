import React from "react";
import styles from "./CaptureOptions.module.css";
import AutomaticCaptureToggle from "./AutomaticCaptureToggle";
import CaptureIntervalSelector from "./CaptureIntervalSelector";
import { downloadAllImages } from "../utils/cameraActions";
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

  return id === ID && (
    <div className={styles.captureOptions}>
      <AutomaticCaptureToggle
        isAutoCaptureOn={isAutoCaptureOn}
        toggleAutoCapture={toggleAutoCapture}
      />
      {isAutoCaptureOn && (
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
          onClick={() => downloadAllImages(capturedImages)}
          backgroundColor="#007BFF"
        >
          <img src={download} alt="Download all snapshots" />
        </Button>
      )}
    </div>
  );
}

export default CaptureOptions;
