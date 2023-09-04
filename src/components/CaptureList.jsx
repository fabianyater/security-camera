import React from "react";
import styles from "./CaptureList.module.css"; // Importa tus estilos aquí
import deleteImage from "../images/delete.svg";
import Toggle from "./Toggle";

function CaptureList({
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
      {id === "automaticCaptures" && (
        <div className={styles.autoCapture}>
          <p>Activar capturas automáticas</p>
          <Toggle isAutomatic={isAutoCaptureOn} onToggle={toggleAutoCapture} />
        </div>
      )}
      <ul className={styles.captureGrid}>
        {capturedImages &&
          capturedImages.map((image, index) => {
            if (image.src === "data:,") {
              return null; // No renderizar nada si el src es "data:,"
            }
            return (
              <li className={styles.captureList} key={index}>
                <img
                  className={styles.capturedImage}
                  src={image.src}
                  alt={`Captured ${index}`}
                />
                <button
                  title="Delete image"
                  onClick={() => onDeleteImage(index)}
                >
                  <img
                    className={styles.deleteIcon}
                    src={deleteImage}
                    alt="Delete snapshot"
                  />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default CaptureList;
