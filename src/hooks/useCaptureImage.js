import { formatDate } from "../utils/formatDate";

// useCaptureImage.js
export const useCaptureImage = (videoRef) => {
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const currentVideoStartTime = new Date().getTime();
      const formattedTimestamp = new Date(currentVideoStartTime).toLocaleString();

      context.font = '16px Arial';
      context.fillStyle = 'white';
      context.fillText(formattedTimestamp, 10, canvas.height - 10);

      const imgData = canvas.toDataURL('image/png');
      const newImage = {
        src: imgData,
        timestamp: currentVideoStartTime
      };

      return newImage; // Devuelve la imagen capturada y su información
    }
    
    return null; // Si no se puede capturar la imagen, devuelve null
  };

  return { captureImage };
};
