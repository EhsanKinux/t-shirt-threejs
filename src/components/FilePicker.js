import React, { useState } from 'react'
// import CustomButton from './CustomButton'

//styles
import "./filepicker.css"
import { DecalTypes, FilterPosition} from '../config/constants';
// import Tab from './Tab';
import { getContrastingColor, reader } from '../config/helpers';
import state from '../store';
import { useSnapshot } from 'valtio';
import SwitchLogo from './SwitchLogo';

const FilePicker = ({file, setFile, setActiveEditorTab, showFront}) => {

  const snap = useSnapshot(state);
  
  const [activeFilterTab, setActivefilterTab] = useState({
    logoShirt:true,
    stylishShirt:false,
  });
  
  const [checked, setChecked] = React.useState(true);
  
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

    const handleLogoPosition = (posName) => {
      // create a copy of the current position object
      const newPosition = { ...snap.position };
    
      // toggle the appropriate position flag
      switch (posName) {
        case "leftPosition":
          newPosition.left = true;
          newPosition.middle = false;
          newPosition.right = false;
          break;
        case "middlePosition":
          newPosition.left = false;
          newPosition.middle = true;
          newPosition.right = false;
          break;
        case "rightPosition":
          newPosition.left = false;
          newPosition.middle = false;
          newPosition.right = true;
          break;
        default:
          break;
      }
    
      // update the state with the new position
      state.position = newPosition;
    };
    

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
        <label htmlFor='file-upload' className='filepicker-lable' style={{backgroundColor: snap.color.value, color: getContrastingColor(snap.color.value)}}>
          Upload Your File
        </label>

        <span className='filepicker-paragraph'>
          {file ==='' ? "No file selected" : file.name }
        </span>
      </div>

      <div className='buttonWrapper'>
        {/* <div className='logoOrTextureBtn'>
          <CustomButton
            type="outline"
            title="Click to set logo"
            handleClick={() => readFile('logo')}
            className="logoBtn"
          />
          <CustomButton
            type="filled"
            title="Full"
            handleClick={() => readFile('full')}
            className="fullBtn"
          />

        </div> */}
        {showFront ? <div className='logoPositionWrapper'>
          {FilterPosition.map((pos) => (
            <SwitchLogo
              key={pos.name}
              pos={pos}
              handleClick={() => {handleLogoPosition(pos.name); readFile('logo')}}
            />
          ))}
        </div> : <span style={{color: snap.color.value}}>The logo is set to the back</span> }
        <label className='switch'>
          <input 
            type="checkbox" 
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
            onClick={() => {handleActiveFilterTab("logoShirt")}}
          />
          <span className="slider"></span>
          {/* {FilterTabs.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              isfilterTab
              isActiveTab={activeFilterTab[tab.name]}
              handleClick={() => handleActiveFilterTab(tab.name)}
            />
          ))} */}

        </label>

      </div>

    </div>
  )
}

export default FilePicker