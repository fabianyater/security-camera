import { useState, useCallback, useEffect } from 'react';

export function useRecording(isCameraOn, videoRef) {
  const [isRecording, setIsRecording] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [videoChunks, setVideoChunks] = useState([]);
  const [videoList, setVideoList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  const RECORDING_TIME = 5000;

  const startRecording = useCallback(() => {
    if (!videoRef.current) {
      console.error("Video ref is not available");
      return;
    }

    if (isCameraOn && !isRecording) {

      // Initialize video chunks
      setVideoChunks([]);
      const stream = videoRef.current.srcObject;

      try {
        const newMediaRecorder = new MediaRecorder(stream);

        const currentRecordingStartTime = Date.now();
        setRecordingStartTime(currentRecordingStartTime);

        newMediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setVideoChunks((prevChunks) => [...prevChunks, event.data]);
          }
        };

        newMediaRecorder.onstop = () => {
          setVideoChunks((chunks) => {
            const blob = new Blob(chunks, { type: "video/webm" });
            const videoUrl = URL.createObjectURL(blob);

            setVideoList((prevList) => [
              ...prevList,
              {
                videoUrl,
                videoStartTime: currentRecordingStartTime,
              },
            ]);
            return [];
          });
        };


        newMediaRecorder.onerror = (e) => {
          console.error("MediaRecorder error", e);
        };

        newMediaRecorder.start();
        setIsRecording(true);
        setRecordingStartTime(Date.now());

        setTimeout(() => {
          newMediaRecorder.stop();
          setIsRecording(false);
          startRecording();
        }, 50000);
      } catch (e) {
        console.error("Failed to start recording", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCameraOn, videoRef]);

  useEffect(() => {
    if (isCameraOn) {
      startRecording();
    }
  }, [isCameraOn, startRecording]);

  return { startRecording, isRecording, videoList };
}
