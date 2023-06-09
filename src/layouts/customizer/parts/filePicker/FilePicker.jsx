import "./filepicker.css";
import React, { useState } from "react";
import { useSnapshot } from "valtio";
//
import CustomButton from "components/customButton/CustomButton";
import { DecalTypes, FilterPosition } from "config/constants";
import { getContrastingColor, reader } from "config/helpers";
import state from "../../../../store";
import SwitchLogo from "./parts/switchLogo/SwitchLogo";
import SetBackFront from "./parts/setBackFront/SetBackFront";

const FilePicker = ({
  file,
  setFile,
  setActiveEditorTab,
  showFront,
  decalRef,
  setDecalExists,
  setShowFront,
}) => {
  const snap = useSnapshot(state);

  const [activeFilterTab, setActivefilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    // Update state with the new logo texture
    state[decalType.stateProperty] = result;

    //that decal is currently active
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

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
        [tabName]: !prevState[tabName],
      };
    });
  };
  //get file Data:
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  // delete logo decal
  const deleteDecal = () => {
    const parent = decalRef.current.parent;
    parent && parent.remove(decalRef.current);
    setDecalExists(false);
  };

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
    <div className="filepicker-container">
      <div className="fileWrapper">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="input"
        />
        <label
          htmlFor="file-upload"
          className="filepicker-lable"
          style={{
            backgroundColor: snap.color.value,
            color: getContrastingColor(snap.color.value),
          }}
        >
          Upload Your File
        </label>
        <span
          className="filepicker-paragraph"
          style={{
            color:
              getContrastingColor(snap.color.value) === "#1e1e1e"
                ? "#fafbf4"
                : "#1e1e1e",
          }}
        >
          {file === "" ? "No file selected" : file.name}
        </span>
      </div>
      <div className="buttonWrapper">
        {showFront ? (
          <div
            className="logoPositionWrapper"
            style={{
              backgroundColor:
                getContrastingColor(snap.color.value) === "#FAFBF4"
                  ? snap.color.value
                  : "none",
            }}
          >
            {FilterPosition.map((pos) => (
              <SwitchLogo
                key={pos.name}
                pos={pos}
                handleClick={() => {
                  handleLogoPosition(pos.name);
                  readFile("logo");
                }}
              />
            ))}
          </div>
        ) : (
          <span style={{ color: snap.color.value }}>
            The logo is set to back
          </span>
        )}

        <div>
          <CustomButton
            type="outline"
            title="Delete Logo"
            handleClick={() => deleteDecal()}
            className="logoBtn"
          />
        </div>
        <SetBackFront setShowFront={setShowFront} />
      </div>
    </div>
  );
};

export default FilePicker;
