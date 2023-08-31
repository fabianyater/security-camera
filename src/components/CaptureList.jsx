import React from "react";
import styles from "./CaptureList.module.css"; // Importa tus estilos aquí

function CaptureList({ title, capturedImages, onDeleteImage }) {
  return (
    capturedImages && (
      <div className={styles.captureContainer}>
        <h2 className={styles.title}>{title}</h2>
        <ul className={styles.captureGrid}>
          {capturedImages.map((image, index) => (
            <li className={styles.captureList} key={index}>
              <img src={image.src} alt={`Captured ${index}`} />
              <button onClick={() => onDeleteImage(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default CaptureList;
