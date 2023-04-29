import {useEffect, useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';


import state from '../store';

import { EditorTabs} from '../config/constants';

import { slideAnimation } from '../config/motion';

import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';


//styles
import './customizer.css'


const Customizer = ({onButtonClick, canvasRef}) => {
  
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

  //recoding
  // const [isStoppingRecording, setIsStoppingRecording] = useState(false);
  const [recording, setRecording] = useState(false);
  // const [mediaStream, setMediaStream] = useState(null);
  // const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);


  // Ref for saving the recorded video
  // const recordedVideoRef = useRef(null);



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
  

  //This function first requests access to the user's camera using the getUserMedia method of the navigator.mediaDevices API. Then, it creates a new MediaRecorder instance and starts recording. While recording, data chunks are accumulated in the chunks state variable. Once the recording is stopped (either after 6 seconds or when the user clicks a stop button), the chunks are concatenated into a single blob and downloaded as a file using a temporary anchor element. Finally, the chunks state is reset.
  // start recording the canvas stream

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(async (stream) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm'
        });
        mediaRecorder.start();
  
        setRecording(true);
  
        const canvasStream = canvasRef.current.captureStream(30);
        mediaRecorder.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0) {
            setChunks((prevChunks) => prevChunks.concat(event.data));
          }
        });
  
        mediaRecorder.addEventListener("stop", () => {
          setRecording(false);
  
          const blob = new Blob(chunks, { type: 'video/webm' });
      
          // Display save dialog to allow user to choose location to save file
          const tempAnchor = document.createElement('a');
          tempAnchor.href = URL.createObjectURL(blob);
          tempAnchor.setAttribute('download', 'recording.webm');
          tempAnchor.click();
          setTimeout(() => {
            URL.revokeObjectURL(URL.createObjectURL(blob));
          }, 1000);
          setChunks([]);
        });
  
        setTimeout(() => {
          mediaRecorder.stop();
          canvasStream.getTracks().forEach(track => track.stop());
          setRecording(false);
        }, 4000);
      })
      .catch((error) => {
        console.error("Error starting recording", error);
      });
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
                disabled={recording}
                handleClick={startRecording}
              />
              {recording && <div style={{color:snap.color.value}}>Recording...</div>}
              {/* animation */}
              <CustomButton
                type="outline"
                title="Animation"
              />
            </motion.div>
            
          </>

      </AnimatePresence>
    </div>
  )
}

export default Customizer