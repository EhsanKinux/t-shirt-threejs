import "./customizer.css";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Svg from "layouts/customizer/parts/svg/Svg";
import { slideAnimation } from "config/motion";
//
import ColorPicker from "./parts/colorPicker/ColorPicker";
import FilePicker from "./parts/filePicker/FilePicker";
import TextPicker from "./parts/textPicker/TextPicker";
import AIPicker from "./parts/aipPicker/AIPicker";
import CreateButton from "./parts/createButton/CreateButton";
//
import ColorPickerBtn from "./Buttons/colorPickerBtn/ColorPickerBtn";
import FilePickerBtn from "./Buttons/filePickerBtn/FilePickerBtn";
import ScreenshotBtn from "./Buttons/screenshotBtn/ScreenshotBtn";
import RecordingBtn from "./Buttons/recordingBtn/RecordingBtn";
import RotateAnimatBtn from "./Buttons/rotateAnimatBtn/RotateAnimatBtn";
import RotateFront from "./Buttons/RotateFrontBack/RotateFront";
import RotateBack from "./Buttons/RotateFrontBack/RotateBack";
// import AiPickerBtn from "./Buttons/aiPickerBtn/aiPickerBtn";
// import TextPickerBtn from "./Buttons/textPickerBtn/TextPickerBtn";

const Customizer = ({
  onButtonClick,
  canvasRef,
  startAnimation,
  angle,
  setShowFront,
  showFront,
  decalRef,
}) => {
  const [file, setFile] = useState("");
  //AI prompt
  const [prompt, setPrompt] = useState("");
  //are we currently showing the logo or fulltexture
  const [activeEditorTab, setActiveEditorTab] = useState("");
  // keep track of whether or not the logo decal exist
  const [decalExists, setDecalExists] = useState(true);

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
            showFront={showFront}
            setShowFront={setShowFront}
            decalRef={decalRef}
            setDecalExists={setDecalExists}
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
  }, [activeEditorTab, file, prompt, showFront, decalRef, setShowFront]);

  useEffect(() => {
    generateTabContent();
  }, [activeEditorTab, generateTabContent]);

  const ClickOnRotateToBack = () => {
    if (decalExists) {
      onButtonClick(Math.PI);
    } 
  }

  return (
    <div className="customizerWrapper">
      <AnimatePresence>
        <>
          <motion.header {...slideAnimation("left")}>
            <h1 className="headerText">
             <Svg/>
            </h1>
          </motion.header>

          {/* leftside Tabs */}
          <motion.div
            key="custom"
            className="sideBar"
            {...slideAnimation("left")}
          >
            <div className="sidebarIcons">
              <ColorPickerBtn 
                activeEditorTab={activeEditorTab}
                setActiveEditorTab={setActiveEditorTab}
              />
              <FilePickerBtn 
                activeEditorTab={activeEditorTab}
                setActiveEditorTab={setActiveEditorTab}
              />
              {/* <TextPickerBtn 
                activeEditorTab={activeEditorTab}
                setActiveEditorTab={setActiveEditorTab}
              /> */}
              {/* <AiPickerBtn 
                activeEditorTab={activeEditorTab}
                setActiveEditorTab={setActiveEditorTab}
              /> */}
            </div>

            <div className="sidebarContent">{generateTabContent()}</div>
          </motion.div>

          {/* buttons to export screenshot and recording and animation */}
          <motion.div className="exportWrapper" {...slideAnimation("right")}>
            {/* screenshot */}
            <ScreenshotBtn 
              canvasRef={canvasRef}
            />
            {/* recording */}
            <RecordingBtn 
              canvasRef={canvasRef}
              startAnimation={startAnimation}
            />

            {/* {recording && <div style={{color:snap.color.value},size:"2rem"}>Recording...</div>} */}
            {/* animation */}
            <RotateAnimatBtn 
              startAnimation={startAnimation}
            />

            {/* buttons to toggle between the front and back of the shirt */}
            <RotateFront 
              decalExists={decalExists}
              onButtonClick={onButtonClick}
            />
            <RotateBack 
              decalExists={decalExists}
              onButtonClick={onButtonClick}
            />

            {/* create api */}
            <CreateButton
              canvasRef={canvasRef}
              rotateToBack={ClickOnRotateToBack}
            />
          </motion.div>
        </>
      </AnimatePresence>
    </div>
  );
};

export default Customizer;
