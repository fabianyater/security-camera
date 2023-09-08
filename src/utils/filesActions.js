import JSZip from "jszip";
import { formattedDate } from "./formatDate";
import { saveAs } from "file-saver";

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

export const handleDeleteImage = (index, capturedImages, setCapturedImages) => {
  const isConfirmed = window.confirm("¿Seguro que quieres continuar?");

  if (isConfirmed) {
    const newCapturedImages = [...capturedImages];
    newCapturedImages.splice(index, 1);
    setCapturedImages(newCapturedImages);
  }
};

const base64ToBlob = (base64, mimeType = 'image/png') => {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeType });
};

export const downloadImage = (image) => {
  const fileName = `${formattedDate(image.timestamp)}.png`;
  const blob = base64ToBlob(image.src);
  saveAs(blob, fileName);
};