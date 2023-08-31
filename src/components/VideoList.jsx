import React from "react";

function CaptureList({ title, capturedVideos }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {capturedVideos && capturedVideos.map((videoItem, index) => (
          <li key={index}>
            <video controls>
              <source src={videoItem.videoUrl} type="video/webm" />
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CaptureList;
