import Capture from "../components/Capture";
import VideoList from "../components/VideoList";
import { autoImages, images, favorite, videos } from "../images/icons";

const INACTIVE_BACKGROUND_COLOR = "#cccbcb80";
const ACTIVE_BACKGROUND_COLOR = "#007BFF";

const createTabsConfig = ({ capturedImages, favorites, capturedAtuomaticImages, capturedVideos, handleDeleteImage, handleDeleteAutoCapturedImage, isAutoCaptureOn, toggleAutoCapture, customInterval, onChangeInterval }) => [
  {
    id: "captures",
    label: "Captures",
    content: (
      <Capture
        title="Manual Captures"
        capturedImages={capturedImages}
        onDeleteImage={handleDeleteImage}
      />
    ),
    src: images,
    alt: "List of manual captures",
    activeBackgroundColor: ACTIVE_BACKGROUND_COLOR,
    inactiveBackgroundColor: INACTIVE_BACKGROUND_COLOR
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
        customInterval={customInterval}
        onChangeInterval={onChangeInterval}
        id="automaticCaptures"
      />
    ),
    src: autoImages,
    alt: "List of all auto captures",
    activeBackgroundColor: ACTIVE_BACKGROUND_COLOR,
    inactiveBackgroundColor: INACTIVE_BACKGROUND_COLOR
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
    src: videos,
    alt: "List of recorded videos",
    activeBackgroundColor: ACTIVE_BACKGROUND_COLOR,
    inactiveBackgroundColor: INACTIVE_BACKGROUND_COLOR
  },
  {
    id: "favorites",
    label: "Favorites",
    content: (
      <Capture
        title="Favorites"
        capturedImages={favorites}
      />
    ),
    src: favorite,
    alt: "List of favorite images",
    activeBackgroundColor: ACTIVE_BACKGROUND_COLOR,
    inactiveBackgroundColor: INACTIVE_BACKGROUND_COLOR
  },
];

export default createTabsConfig;
