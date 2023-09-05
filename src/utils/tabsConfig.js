import React from "react";
import Capture from "../components/Capture";
import VideoList from "../components/VideoList";

const createTabsConfig = ({ capturedImages, capturedAtuomaticImages, capturedVideos, handleDeleteImage, handleDeleteAutoCapturedImage, isAutoCaptureOn, toggleAutoCapture }) => [
  {
    id: "captures",
    label: "Captures",
    content: (
      <Capture
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
      <Capture
        title="Automatic Captures"
        capturedImages={capturedAtuomaticImages}
        onDeleteImage={handleDeleteAutoCapturedImage}
        isAutoCaptureOn={isAutoCaptureOn}
        toggleAutoCapture={toggleAutoCapture}
        id="automaticCaptures"
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
