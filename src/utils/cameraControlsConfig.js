import { cameraOff, cameraOn, captureImage, microphoneOff, microphoneOn, mute, unmute } from "../images/icons";


const createCameraControlsConfig = ({
  isCameraOn,
  isMicrophoneOn,
  isUnmute,
  toggleCamera,
  toggleMicrophone,
  toggleVideoVolume,
  captureUtility,
}) => [
    {
      onClick: toggleCamera,
      title: isCameraOn ? "Turn off the camera" : "Turn on the camera",
      isActive: isCameraOn,
      iconActive: cameraOn,
      iconInactive: cameraOff,
    },
    {
      onClick: toggleMicrophone,
      title: isMicrophoneOn
        ? "Turn off the microphone"
        : "Turn on the microphone",
      isActive: isMicrophoneOn,
      iconActive: microphoneOn,
      iconInactive: microphoneOff,
    },
    {
      onClick: toggleVideoVolume,
      title: isUnmute ? "Mute" : "Enable sound",
      isActive: isUnmute,
      iconActive: unmute,
      iconInactive: mute,
    },
    {
      onClick: captureUtility,
      title: "Capture snapshot",
      iconActive: captureImage,
      iconInactive: captureImage,
    },
  ]

export default createCameraControlsConfig;