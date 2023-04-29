import {useEffect, useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { EditorTabs} from '../config/constants';
import { slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import RecordRTC from 'recordrtc';
//styles
import './customizer.css'


const Customizer = ({onButtonClick, canvasRef, startAnimation }) => {
  
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  //AI prompt
  const [prompt, setPrompt] = useState('');

  //are we currently generating the image or not
  // const [generatingImg, setGeneratingImg] = useState(false);

  //are we currently showing the logo or fulltexture
  const [activeEditorTab, setActiveEditorTab] = useState("");

  //keep track of whether or not the screenshot button has been clicked
  const [isScreenshotClicked, setIsScreenshotClicked] = useState(false);

  //show the app content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker 
                  file={file}
                  setFile={setFile}
                  readFile
                  setActiveEditorTab={setActiveEditorTab}
              />
      case "aipicker":
        return <AIPicker
                prompt={prompt}
                setPrompt={setPrompt}
                // generatingImg={generatingImg}
                handleSumbmit
              />
      default:
        return null;
    }
  }
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
    if (isScreenshotClicked && canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL('image/png');
      const tempAnchor = document.createElement('a');
      tempAnchor.href = dataURL;
      tempAnchor.setAttribute('download', 'screenshot.png');
      tempAnchor.click();
      setIsScreenshotClicked(false);
    }
  }, [isScreenshotClicked, canvasRef]);
  

  //create a new instance of RecordRTC by passing in the canvas stream, then starts recording and stops after 4 seconds. The resulting video is downloaded as a file using a temporary anchor element.
  // start recording the canvas stream

  const startRecording = () => {
    const stream = canvasRef.current.captureStream();
    const recorder = RecordRTC(stream, {
      type: 'video',
      mimeType: 'video/webm',
      bitsPerSecond: 128000,
      timeSlice: 4000,
    });
    recorder.startRecording();
    setTimeout(() => {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const tempAnchor = document.createElement('a');
        tempAnchor.href = URL.createObjectURL(blob);
        tempAnchor.download = 'recording.webm';
        tempAnchor.click();
      });
    }, 4000);
  };
  

  return (
    <div>
      <AnimatePresence >

          <>
            <motion.header {...slideAnimation("down")}>
              {/* <img src="./threejs.png" alt="logo" className="image" /> */}
              <h1 style={{color:`${snap.color.value}`}} className='headerText' >Droplinked</h1>
            </motion.header>

            {/* leftside Tabs */}
            <motion.div
              key="custom"
              className='sideBar'
              {...slideAnimation('left')}
            >


                  {EditorTabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name) }
                    />
                  ))}
                  {generateTabContent()}


            </motion.div>

            {/* buttons to toggle between the front and back of the shirt */}
            <motion.div
              className='toggleWrapper'
              {...slideAnimation('up')}
            >

              <CustomButton
                type="filled"
                title="Show Front"
                handleClick={() => onButtonClick(0)}
              />
              <CustomButton
                type="filled"
                title="Show Back"
                handleClick={() => onButtonClick(Math.PI)}
              />
            </motion.div>

            {/* buttons to export screenshot and recording and animation */}
            <motion.div
              className='exportWrapper'
            >
              {/* screenshot */}
              <CustomButton 
                type="outline"
                title="ScreenShot"
                handleClick={handleScreenshotClick}
              />
              {/* recording */}
              <CustomButton
                type="outline"
                title="Recording"
                
                handleClick={startRecording}
              />
              {/* {recording && <div style={{color:snap.color.value}}>Recording...</div>} */}
              {/* animation */}
              <CustomButton
                type="outline"
                title="Animation"
                handleClick={startAnimation }
              />
            </motion.div>
            
          </>

      </AnimatePresence>
    </div>
  )
}

export default Customizer