import React from "react";
import CaptureList from "../components/CaptureList";
import VideoList from "../components/VideoList";

const createTabsConfig = ({ capturedImages, handleDeleteImage }) => [
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
        // ... (props para el componente VideoList)
      />
    ),
  },
];

export default createTabsConfig;
