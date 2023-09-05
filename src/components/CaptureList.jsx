import React from "react";
import styles from "./CaptureList.module.css"; // Importa tus estilos aquí
import deleteImage from "../images/delete.svg";

function CaptureList({
  capturedImages,
  onDeleteImage,
}) {
  return (
      <ul className={styles.captureGrid}>
        {capturedImages &&
          capturedImages.map((image, index) => {
            if (image.src === "data:,") {
              return null;
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
  );
}

export default CaptureList;
