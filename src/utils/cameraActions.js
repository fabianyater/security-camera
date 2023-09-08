import JSZip from "jszip";
import { saveAs } from "file-saver";
import { formattedDate } from "./formatDate";
export const getAvailableCameras = async (setCameras, setSelectedCamera) => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === 'videoinput');

    setCameras(videoDevices);
    setSelectedCamera(videoDevices[1]?.deviceId || null);
  } catch (error) {
    console.error("Error fetching devices: ", error);
  }
};

export const startCameraStream = async (videoRef, deviceId) => {
  try {
    const constraints = {
      video: {
        ...(deviceId && { deviceId: { exact: deviceId } }),
      },
      audio: true,
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

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

export const startAutomaticCapture = (interval, handleCapture, time) => {
  if (interval === null) {
    const newInterval = setInterval(() => handleCapture(), time);
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
  const isConfirmed = window.confirm("¿Seguro que quieres continuar?");

  if (isConfirmed) {
    const newCapturedImages = [...capturedImages];
    newCapturedImages.splice(index, 1);
    setCapturedImages(newCapturedImages);
  }
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

export const muteVideoVolume = (videoRef) => {
  if (videoRef.current) {
    videoRef.current.muted = true;
  }
};

export const unmuteVideoVolume = (videoRef) => {
  if (videoRef.current) {
    videoRef.current.muted = false;
  }
};

export const downloadAllFiles = async (files, fileType) => {
  if (files.length === 0) {
    return;
  }

  const zip = new JSZip();

  if (fileType === "images") {
    files.forEach((image, index) => {
      const imgData = image.src.split(",")[1];
      const fileName = `${formattedDate(image.timestamp)}.png`;

      zip.file(fileName, imgData, { base64: true });
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
  } else if (fileType === "videos") {
    await Promise.all(files.map(async (video, index) => {
      const response = await fetch(video.videoUrl);
      const videoBlob = await response.blob();

      const fileName = `${formattedDate(video.videoStartTime)}.mp4`;

      zip.file(fileName, videoBlob);
    }));

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "videos.zip");
    });
  } else {
    throw new Error("File typet not supported.");
  }
};
