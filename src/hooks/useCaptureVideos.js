import { useState, useRef } from "react";

const useRecording = (isCameraOn, video, videoList) => {
  const [isRecording, setIsRecording] = useState(false);
  const videoChunks = useRef([]);
  const mediaRecorder = useRef(null);
  const recordingTimeout = useRef(null);
  const recordingStartTime = useRef(0);

  const startRecording = () => {
    if (isCameraOn && !isRecording) {
      videoChunks.current = [];
      const stream = video.srcObject;
      mediaRecorder.current = new MediaRecorder(stream);
      const currentVideoStartTime = new Date().getTime();

      const listItem = document.createElement('li'); // Crear el elemento de la lista antes de usarlo

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(videoChunks.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);

        const videoElement = document.createElement('video');
        videoElement.controls = true;
        videoElement.src = videoUrl;
        videoElement.setAttribute('data-video-start-time', currentVideoStartTime);

        listItem.appendChild(videoElement); // Agregar el video después del timestamp

        videoList.appendChild(listItem);

        const recordingDuration = Date.now() - recordingStartTime.current;
        if (recordingDuration < 30000) {
          // Iniciar la grabación nuevamente después del tiempo restante
          recordingTimeout.current = setTimeout(startRecording, 30000 - recordingDuration);
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      recordingStartTime.current = Date.now();
      recordingTimeout.current = setTimeout(stopRecording, 30000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      clearTimeout(recordingTimeout.current);
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};

export default useRecording;
