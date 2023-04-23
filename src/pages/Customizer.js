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

  return (
    <AnimatePresence>
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
                    handleClick={() => {}}
                  />
                ))}
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
  )
}

export default Customizer