import {useState, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';

import {downloadCanvasToImage, reader} from '../config/helpers';
import { EditorTabs, FilterTabs, DeaclTypes} from '../config/constants';

import { fadeAnimation, slideAnimation } from '../config/motion';

import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

//styles
import './customizer.css'


const Customizer = () => {
  //Are we in hompage or customizer
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  //AI prompt
  const [prompt, setPrompt] = useState('');

  //are we currently generating the image or not
  const [generatingImg, setGeneratingImg] = useState(false);

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
        return <FilePicker/>
      case "aipicker":
        return <AIPicker/>
      default:
        return null;
    }
  }

  return (
    <div>
      <AnimatePresence >
        {!snap.intro && (
          <>

            {/* leftside Tabs */}
            <motion.div
              key="custom"
              className='sideBar'
              {...slideAnimation('left')}
            >
              <div className='tabWrapper'>
                <div className='editorTabs-container tabs'>
                  {EditorTabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name) }
                    />
                  ))}
                  {generateTabContent()}
                </div>
              </div>
            </motion.div>

            {/* Back Button */}
            <motion.div
              className='backBtn'
              {...fadeAnimation}
            >
              <CustomButton
                type="filled"
                title="Go Back"
                handleClick={() => state.intro = true}
                className="backbutton"
              />
            </motion.div>

            <motion.div
              className='filtertabs-container'
              {...slideAnimation('up')}
            >
              {FilterTabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      isfilterTab
                      isActiveTab=""
                      handleClick={() => {}}
                    />
                  ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Customizer