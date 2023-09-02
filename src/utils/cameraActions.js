export const startCameraStream = async (videoRef) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    videoRef.current.srcObject = stream;
    videoRef.current.play();
  } catch (error) {
    throw new Error("Could not start camera: " + error.message);
  }
};

export const stopCameraStream = (videoRef) => {
  const stream = videoRef.current.srcObject;

  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  videoRef.current.srcObject = null;
};

export const startAutomaticCapture = (interval, handleCapture) => {
  if (interval === null) {
    const newInterval = setInterval(() => handleCapture(), 5000);
    return newInterval;
  }
};

export const stopAutomaticCapture = (interval) => {
  clearInterval(interval);
};

export const handleCapture = (captureImage, setCapturedImages) => {
  const newImage = captureImage();

  if (newImage) {
    setCapturedImages((prevImages) => [...prevImages, newImage]);
  }
};

export const handleDeleteImage = (index, capturedImages, setCapturedImages) => {
  const newCapturedImages = [...capturedImages];
  newCapturedImages.splice(index, 1);
  setCapturedImages(newCapturedImages);
};

export const muteMicrophone = (videoRef) => {
  const stream = videoRef.current.srcObject;
  if (stream) {
    const audioTracks = stream.getAudioTracks();
    audioTracks.forEach((track) => {
      track.enabled = false;
    });
  }
};

export const unmuteMicrophone = (videoRef) => {
  const stream = videoRef.current.srcObject;
  if (stream) {
    const audioTracks = stream.getAudioTracks();
    audioTracks.forEach((track) => {
      track.enabled = true;
    });
  }
};