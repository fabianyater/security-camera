import React from "react";
import styles from "./CaptureList.module.css";
import 'react-medium-image-zoom/dist/styles.css';
import deleteImage from "../images/delete.svg";
import { Modal } from "./Modal";

function CaptureList({ capturedImages, onDeleteImage }) {
  return (
    <ul className={styles.captureGrid}>
      {capturedImages &&
        capturedImages.map((image, index) => {
          if (image.src === "data:,") {
            return null;
          }
          return (
            <li className={styles.captureList} key={index}>
              <Modal alt={`Captured ${index}`} src={image.src} />
              <button title="Delete image" onClick={() => onDeleteImage(index)}>
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
