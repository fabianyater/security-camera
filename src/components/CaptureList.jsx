import React, { useState } from "react";
import "react-medium-image-zoom/dist/styles.css";
import download from "../images/download.svg";
import { downloadAllFiles } from "../utils/filesActions";
import Button from "./Button";
import styles from "./CaptureList.module.css";
import ImageOptions from "./ImageOptions";
import { Modal } from "./Modal";

function CaptureList({ capturedImages, onDeleteImage }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);

  if (!Array.isArray(capturedImages) || capturedImages.length === 0) {
    return;
  }

  const handleImageSelect = (imageSrc) => {
    if (selectedImages.includes(imageSrc)) {
      setSelectedImages((prevImages) =>
        prevImages.filter((src) => src !== imageSrc)
      );
    } else {
      setSelectedImages((prevImages) => [...prevImages, imageSrc]);
    }
  };

  const handleCheckboxChange = (index, imageSrc) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);

    handleImageSelect(imageSrc);
  };

  const downloadImages = () => {
    downloadAllFiles(selectedImages, "images");
    setSelectedImages([]);
    setCheckboxes([]);
  };

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
      {selectedImages.length > 0 && (
        <Button
          title="Descargar seleccionadas"
          label={`Descargar seleccionadas (${selectedImages.length})`}
          margin
          backgroundColor="#007BFF"
          onClick={() => downloadImages()}
        >
          <img src={download} alt="Download all snapshots" />
        </Button>
      )}
      {Object.keys(groupedImages).map((monthYear, index) => (
        <div key={index}>
          <h2>{monthYear}</h2>
          <ul className={styles.captureGrid}>
            {groupedImages[monthYear].map((image, index) => (
              <li className={styles.captureList} key={index}>
                <div className={`${styles.image_container} ${checkboxes[index] && styles.selected}`}>
                  <Modal alt={`Captured ${index}`} src={image.src} />
                  <input
                    className={styles.select_image}
                    type="checkbox"
                    onChange={() => handleCheckboxChange(index, image)}
                    checked={checkboxes[index] || false}
                  />
                </div>
                <ImageOptions
                  index={index}
                  image={image}
                  onDeleteImage={onDeleteImage}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default CaptureList;
