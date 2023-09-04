import React from "react";
import CaptureList from "../components/CaptureList";
import VideoList from "../components/VideoList";

const createTabsConfig = ({ capturedImages, capturedAtuomaticImages, capturedVideos, handleDeleteImage, isAutoCaptureOn, toggleAutoCapture }) => [
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
    id: "automaticCaptures",
    label: "Automatic Captures",
    content: (
      <CaptureList
        title="Automatic Captures"
        capturedImages={capturedAtuomaticImages}
        onDeleteImage={handleDeleteImage}
        isAutoCaptureOn={isAutoCaptureOn}
        toggleAutoCapture={toggleAutoCapture}
        id={"automaticCaptures"}
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
