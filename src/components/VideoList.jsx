import React from "react";
import styles from "./VideoList.module.css";
import { formatDate2 } from "../utils/formatDate";
import Button from "./Button";
import { downloadAllFiles } from "../utils/cameraActions";
import download from "../images/download.svg";

function CaptureList({ title, capturedVideos }) {
  return (
    <div className={styles.videoContainer}>
      <h2 className={styles.title}>{title}</h2>
      {capturedVideos.length > 0 && (
        <Button
          title="Descargar todos los videos grabados"
          label="Descargar todas los videos grabados"
          onClick={() => downloadAllFiles(capturedVideos, "videos")}
          backgroundColor="#007BFF"
        >
          <img src={download} alt="Download all recorded videos" />
        </Button>
      )}
      <ul className={styles.videoGrid}>
        {capturedVideos &&
          capturedVideos.map((videoItem, index) => (
            <li className={styles.videoList} key={index}>
              <video controls>
                <source src={videoItem.videoUrl} type="video/webm" />
              </video>
              <p className={styles.videoDate}>
                {formatDate2(videoItem.videoStartTime)}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CaptureList;
