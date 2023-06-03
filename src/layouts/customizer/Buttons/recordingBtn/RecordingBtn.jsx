import React from 'react'
import { IconContext } from 'react-icons';
import state from 'store';
import { useSnapshot } from 'valtio';
import { BsCameraVideo } from "react-icons/bs";
import RecordRTC from "recordrtc";

const RecordingBtn = ({startAnimation , canvasRef}) => {
    const snap = useSnapshot(state);

    //create a new instance of RecordRTC by passing in the canvas stream, then starts recording and stops after 5 seconds. The resulting video is downloaded as a file using a temporary anchor element.

    // start recording the canvas stream
  const startRecording = () => {
    const stream = canvasRef.current.captureStream();
    const recorder = RecordRTC(stream, {
      type: "video",
      mimeType: "video/mp4",
      bitsPerSecond: 40000000, // 10 Mbps
      timeSlice: 6000,
    });
    recorder.startRecording();
    setTimeout(() => {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const tempAnchor = document.createElement("a");
        tempAnchor.href = URL.createObjectURL(blob);
        tempAnchor.download = "recording.mp4";
        tempAnchor.click();
      });
    }, 5000);
  };

  return (
    <IconContext.Provider
    value={{
      color: snap.color.value,
      size: "2rem",
      style: { cursor: "pointer" },
    }}
  >
    <BsCameraVideo
      title="Recording"
      onClick={() => {
        startRecording();
        startAnimation();
      }}
    />
  </IconContext.Provider>
  )
}

export default RecordingBtn