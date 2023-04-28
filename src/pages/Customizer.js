import {useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';


import state from '../store';

import { EditorTabs} from '../config/constants';

import { slideAnimation } from '../config/motion';

import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

//styles
import './customizer.css'



const Customizer = ({onButtonClick}) => {
  
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  //AI prompt
  const [prompt, setPrompt] = useState('');

  //are we currently generating the image or not
  // const [generatingImg, setGeneratingImg] = useState(false);

  //are we currently showing the logo or fulltexture
  const [activeEditorTab, setActiveEditorTab] = useState("");



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
                className='positionBtn'
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
            
          </>

      </AnimatePresence>
    </div>
  )
}

export default Customizer