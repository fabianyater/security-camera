import React from "react";
import styles from './VideoList.module.css';
import formatDate, { formatDate2 } from "../utils/formatDate";

function CaptureList({ title, capturedVideos }) {
  return (
    <div className={styles.videoContainer}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.videoGrid}>
        {capturedVideos && capturedVideos.map((videoItem, index) => (
          <li className={styles.videoList} key={index}>
            <video controls>
              <source src={videoItem.videoUrl} type="video/webm" />
            </video>
            <p className={styles.videoDate}>{formatDate2(videoItem.videoStartTime)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CaptureList;
