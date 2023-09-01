import { useState, useCallback, useEffect } from 'react';

export function useRecording(isCameraOn, videoRef) {
  const [isRecording, setIsRecording] = useState(false);
  const [videoChunks, setVideoChunks] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [recordingStartTime, setRecordingStartTime] = useState(null);

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

        // Start recording
        newMediaRecorder.start();
        setIsRecording(true);
        setRecordingStartTime(Date.now());

        // Stop recording after 30 seconds
        setTimeout(() => {
          newMediaRecorder.stop();
          setIsRecording(false);
          startRecording();
        }, 30000);
      } catch (e) {
        console.error("Failed to start recording", e);
      }
    }
  }, [isCameraOn, videoRef]);

  useEffect(() => {
    console.log("Video list updated:", videoList);
  }, [videoList]);

  return { startRecording, isRecording, videoList };
}
