import React, { useState } from 'react'
import CustomButton from './CustomButton'

//styles
import "./filepicker.css"
import { DecalTypes, FilterTabs } from '../config/constants';
import Tab from './Tab';
import { reader } from '../config/helpers';
import state from '../store';
import { useSnapshot } from 'valtio';

const FilePicker = ({file, setFile, readFile, setActiveEditorTab}) => {

  const snap = useSnapshot(state);

  const [activeFilterTab, setActivefilterTab] = useState({
    logoShirt:true,
    stylishShirt:false,
  });

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
    const handleActiveFilterTab = (tabName, readFile) => {
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

      //get file Data:
      readFile = (type) => {
        reader(file).then((result) => {
          handleDecals(type, result);
          setActiveEditorTab("");
        })
      }
    }
  return (
    <div className='filepicker-container'>
      <div className='fileWrapper'>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
          className='input'
        />
        <label htmlFor='file-upload' className='filepicker-lable' style={{backgroundColor: snap.color.value}}>
          Upload File
        </label>

        <p className='filepicker-paragraph'>
          {file ==='' ? "No file selected" : file.name }
        </p>
      </div>

      <div className='buttonWrapper'>
        <div className='logoOrTextureBtn'>
          <CustomButton
            type="outline"
            title="Logo"
            handleClick={() => handleActiveFilterTab('logoShirt', readFile)}
            className="logoBtn"
          />
          <CustomButton
            type="filled"
            title="Full"
            handleClick={() => handleActiveFilterTab('stylishShirt', readFile)}
            className="fullBtn"
          />

        </div>
        <div className='logoTextureShow'>
          {FilterTabs.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              isfilterTab
              isActiveTab={activeFilterTab[tab.name]}
              handleClick={() => handleActiveFilterTab(tab.name)}
            />
          ))}

        </div>

      </div>

    </div>
  )
}

export default FilePicker