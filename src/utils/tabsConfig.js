import React from "react";
import CaptureList from "../components/CaptureList";
import VideoList from "../components/VideoList";

const createTabsConfig = ({ capturedImages, capturedVideos, handleDeleteImage }) => [
  {
    id: "captures",
    label: "Captures",
    content: (
      <CaptureList
        title="Captures"
        capturedImages={capturedImages}
        onDeleteImage={handleDeleteImage}
      />
    ),
  },
  {
    id: "videos",
    label: "Videos",
    content: (
      <VideoList
        title="Videos"
        capturedVideos={capturedVideos}
      />
    ),
  },
];

export default createTabsConfig;
