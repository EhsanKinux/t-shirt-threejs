import {useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';


import state from '../store';


import { reader} from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes} from '../config/constants';

import { fadeAnimation, slideAnimation } from '../config/motion';

import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

//styles
import './customizer.css'



const Customizer = ({onButtonClick}) => {
  //Are we in hompage or customizer
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  //AI prompt
  const [prompt, setPrompt] = useState('');

  //are we currently generating the image or not
  // const [generatingImg, setGeneratingImg] = useState(false);

  //are we currently showing the logo or fulltexture
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActivefilterTab] = useState({
    logoShirt:true,
    stylishShirt:false,
  });


  //show the app content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker 
                  file={file}
                  setFile={setFile}
                  readFile={readFile}
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


  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    //update state
    state[decalType.stateProperty] = result;

    //that decal is currently active
    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  //to keep in mind are we currently showing the logo or texture or both
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt" :
          state.isFullTexture = !activeFilterTab[tabName];
          break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }
    //after setting the state, activeFilterTab is updated
    setActivefilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }
  

  //get file Data:
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    })
  }

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

            {/* Back Button and changing front and back */}
            <motion.div
              className='backBtn'
              {...fadeAnimation}
            >
              {/* <CustomButton
                type="filled"
                title="Go Back"
                handleClick={() => state.intro = true}
                className="backbutton"
              /> */}
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
            
            {/* buttons to toggle between the front and back of the shirt */}



            <motion.div
              className='filtertabs-container'
              {...slideAnimation('up')}
            >
              {FilterTabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      isfilterTab
                      isActiveTab={activeFilterTab[tab.name]}
                      handleClick={() => handleActiveFilterTab(tab.name)}
                    />
                  ))}

            </motion.div>
          </>

      </AnimatePresence>
    </div>
  )
}

export default Customizer