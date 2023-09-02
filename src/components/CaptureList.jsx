import React from "react";
import styles from "./CaptureList.module.css"; // Importa tus estilos aquí
import deleteImage from "../images/delete.svg";

function CaptureList({ title, capturedImages, onDeleteImage }) {
  return (
    capturedImages && (
      <div className={styles.captureContainer}>
        <h2 className={styles.title}>{title}</h2>
        <ul className={styles.captureGrid}>
          {capturedImages.map((image, index) => (
            <li className={styles.captureList} key={index}>
              <img className={styles.capturedImage} src={image.src} alt={`Captured ${index}`} />
              <button title="Delete image" onClick={() => onDeleteImage(index)}>
                <img className={styles.deleteIcon} src={deleteImage} alt="Delete snapshot" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default CaptureList;
