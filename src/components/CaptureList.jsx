import React from "react";
import styles from "./CaptureList.module.css";
import "react-medium-image-zoom/dist/styles.css";
import deleteImage from "../images/delete.svg";
import { Modal } from "./Modal";
import Button from "./Button";
import { downloadImage } from "../utils/filesActions";
import download from "../images/download.svg";

function CaptureList({ capturedImages, onDeleteImage }) {
  if (!Array.isArray(capturedImages) || capturedImages.length === 0) {
    return;
  }

  const sortedImages = [...capturedImages].sort((a, b) => {
    return a.timestamp - b.timestamp;
  });

  const groupedImages = {};

  sortedImages.forEach((image) => {
    const date = new Date(image.timestamp);
    const monthYear = date.toLocaleString("es-ES", {
      month: "long",
      year: "numeric",
    });

    if (!groupedImages[monthYear]) {
      groupedImages[monthYear] = [];
    }

    groupedImages[monthYear].push(image);
  });

  return (
    <>
      {Object.keys(groupedImages).map((monthYear, index) => (
        <div key={index}>
          <h2>{monthYear}</h2>
          <ul className={styles.captureGrid}>
            {groupedImages[monthYear].map((image, index) => (
              <li className={styles.captureList} key={index}>
                <Modal alt={`Captured ${index}`} src={image.src} />
                <div className={styles.actions}>
                  <Button
                    title="Eliminar imagem"
                    onClick={() => onDeleteImage(index)}
                  >
                    <img src={deleteImage} alt="Delete capture" />
                  </Button>
                  <Button
                    title="Descargar imagem"
                    onClick={() => downloadImage(image)}
                  >
                    <img src={download} alt="Download all snapshots" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default CaptureList;
