import React, { useState } from 'react'
import CustomButton from './CustomButton'

//styles
import "./filepicker.css"
import { DecalTypes, FilterPosition, FilterTabs } from '../config/constants';
import Tab from './Tab';
import { reader } from '../config/helpers';
import state from '../store';
import { useSnapshot } from 'valtio';
import SwitchLogo from './SwitchLogo';

const FilePicker = ({file, setFile, setActiveEditorTab}) => {

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
    const handleActiveFilterTab = (tabName) => {
      switch (tabName) {
        case "logoShirt":
            state.isLogoTexture = !activeFilterTab[tabName];
          break;
        // case "stylishShirt" :
        //     state.isFullTexture = !activeFilterTab[tabName];
        //     break;
        default:
          state.isLogoTexture = true;
          // state.isFullTexture = false;
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
          Upload Your File
        </label>

        <span className='filepicker-paragraph'>
          {file ==='' ? "No file selected" : file.name }
        </span>
      </div>

      <div className='buttonWrapper'>
        <div className='logoOrTextureBtn'>
          <CustomButton
            type="outline"
            title="Click to set logo"
            handleClick={() => readFile('logo')}
            className="logoBtn"
          />
          {/* <CustomButton
            type="filled"
            title="Full"
            handleClick={() => readFile('full')}
            className="fullBtn"
          /> */}

        </div>
        <div className='logoPositionWrapper'>
          {FilterPosition.map((pos) => (
            <SwitchLogo
              key={pos.name}
              pos={pos}
            />
          ))}
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