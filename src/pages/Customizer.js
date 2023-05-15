import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { slideAnimation } from "../config/motion";
import {
  AIPicker,
  ColorPicker,
  FilePicker,
} from "../components";
import RecordRTC from "recordrtc";
//styles
import "./customizer.css";
import TextPicker from "../components/TextPicker";
import { IconContext } from "react-icons";
import { BsCamera, BsCameraVideo } from "react-icons/bs";
// import { BsTextareaT } from "react-icons/bs";
import { BiRotateRight } from "react-icons/bi";
import { MdColorLens, MdFlipCameraAndroid } from "react-icons/md";
// import { BsRobot } from "react-icons/bs";
import { AiFillFileImage } from "react-icons/ai";

const Customizer = ({ onButtonClick, canvasRef, startAnimation, angle }) => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");

  //AI prompt
  const [prompt, setPrompt] = useState("");

  //are we currently generating the image or not
  // const [generatingImg, setGeneratingImg] = useState(false);

  //are we currently showing the logo or fulltexture
  const [activeEditorTab, setActiveEditorTab] = useState("");

  //keep track of whether or not the screenshot button has been clicked
  const [isScreenshotClicked, setIsScreenshotClicked] = useState(false);

  //show the app content depending on the activeTab
  const generateTabContent = useCallback(() => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "textpicker":
        return <TextPicker />;
      case "filepicker":
        return (
          <FilePicker
            file={file}
            setFile={setFile}
            setActiveEditorTab={setActiveEditorTab}
          />
        );
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            // generatingImg={generatingImg}
            handleSumbmit
          />
        );
      default:
        return null;
    }
  }, [activeEditorTab, file, prompt]);
  //ai submit
  // const handleSumbmit = async (type) => {
  //   if(!prompt) return alert("Please enter a prompt");

  //   try {
  //     //call our backend to generate an ai image:

  //   } catch (error) {
  //     alert(error)
  //   } finally {
  //     setGeneratingImg(false);
  //     setActiveEditorTab("");
  //   }
  // }

  //screenShot
  const handleScreenshotClick = () => {
    setIsScreenshotClicked(true);
  };

  useEffect(() => {
    generateTabContent();
  }, [activeEditorTab, generateTabContent]);

  useEffect(() => {
    if (isScreenshotClicked && canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL("image/png");
      const tempAnchor = document.createElement("a");
      tempAnchor.href = dataURL;
      tempAnchor.setAttribute("download", "screenshot.png");
      tempAnchor.click();
      setIsScreenshotClicked(false);
    }
  }, [isScreenshotClicked, canvasRef]);

  //create a new instance of RecordRTC by passing in the canvas stream, then starts recording and stops after 4 seconds. The resulting video is downloaded as a file using a temporary anchor element.
  // start recording the canvas stream

  const startRecording = () => {
    const stream = canvasRef.current.captureStream();
    const recorder = RecordRTC(stream, {
      type: "video",
      mimeType: "video/webm",
      bitsPerSecond: 128000,
      timeSlice: 4000,
    });
    recorder.startRecording();
    setTimeout(() => {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const tempAnchor = document.createElement("a");
        tempAnchor.href = URL.createObjectURL(blob);
        tempAnchor.download = "recording.webm";
        tempAnchor.click();
      });
    }, 4700);
  };

  return (
    <div className="customizerWrapper">
      <AnimatePresence>
        <>
          <motion.header {...slideAnimation("left")}>
            <h1 style={{ color: `${snap.color.value}` }} className="headerText">
              Droplinked
            </h1>
          </motion.header>

          {/* leftside Tabs */}
          <motion.div
            key="custom"
            className="sideBar"
            {...slideAnimation("left")}
          >
            <div className="sidebarIcons">
              <IconContext.Provider
                value={{
                  color: `${snap.color.value}`,
                  size: "2rem",
                  style: {
                    cursor: "pointer",
                    opacity: activeEditorTab === "colorpicker" ? "100%" : "60%",
                  },
                  className: "sidebarBtn",
                }}
              >
                <MdColorLens
                  onClick={() => setActiveEditorTab("colorpicker")}
                />
              </IconContext.Provider>
              {/* <IconContext.Provider
                value={{
                  color: "white",
                  size: "2rem",
                  style: {
                    cursor: "pointer",
                    opacity: activeEditorTab === "textpicker" ? "100%" : "60%",
                  },
                  className: "sidebarBtn",
                }}
              >
                <BsTextareaT onClick={() => setActiveEditorTab("textpicker")} />
              </IconContext.Provider> */}
              <IconContext.Provider
                value={{
                  color: `${snap.color.value}`,
                  size: "2rem",
                  style: {
                    cursor: "pointer",
                    opacity: activeEditorTab === "filepicker" ? "100%" : "60%",
                  },
                  className: "sidebarBtn",
                }}
              >
                <AiFillFileImage
                  onClick={() => setActiveEditorTab("filepicker")}
                />
              </IconContext.Provider>
              {/* <IconContext.Provider
                value={{
                  color: "white",
                  size: "2rem",
                  style: {
                    cursor: "pointer",
                    opacity: activeEditorTab === "aipicker" ? "100%" : "60%",
                  },
                }}
              >
                <BsRobot onClick={() => setActiveEditorTab("aipicker")} />
              </IconContext.Provider> */}
            </div>

            <div className="sidebarContent">{generateTabContent()}</div>
          </motion.div>


          {/* buttons to export screenshot and recording and animation */}
          <motion.div 
            className="exportWrapper"
            {...slideAnimation("right")}
          >
            {/* screenshot */}
            <IconContext.Provider
              value={{
                color: snap.color.value,
                size: "2rem",
                style: { cursor: "pointer" },
              }}
            >
              <BsCamera onClick={handleScreenshotClick} />
            </IconContext.Provider>

            {/* recording */}
            <IconContext.Provider
              value={{
                color: snap.color.value,
                size: "2rem",
                style: { cursor: "pointer" },
              }}
            >
              <BsCameraVideo
                onClick={() => {
                  startRecording();
                  startAnimation();
                }}
              />
            </IconContext.Provider>

            {/* {recording && <div style={{color:snap.color.value},size:"2rem"}>Recording...</div>} */}
            {/* animation */}
            <IconContext.Provider
              value={{
                color: snap.color.value,
                size: "2rem",
                style: { cursor: "pointer" },
              }}
            >
              <BiRotateRight
                type="outline"
                title="Animation"
                onClick={startAnimation}
                style={{ color: snap.color.value }}
              />
            </IconContext.Provider>
            
            {/* buttons to toggle between the front and back of the shirt */}
            <IconContext.Provider
              value={{
                color: snap.color.value,
                size: "2rem",
                style: { cursor: "pointer" },
              }}
            >
              <MdFlipCameraAndroid
                type="outline"
                title="Rotate"
                onClick={() => onButtonClick(angle ? 0 : Math.PI)}
                style={{ color: snap.color.value }}
              />
            </IconContext.Provider>
          </motion.div>
        </>
      </AnimatePresence>
    </div>
  );
};

export default Customizer;
