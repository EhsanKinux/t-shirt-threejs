import React from 'react'
import { IconContext } from 'react-icons';
import state from 'store';
import { useSnapshot } from 'valtio';
import { RiSendToBack } from "react-icons/ri";

const RotateBack = ({decalExists, onButtonClick}) => {
    const snap = useSnapshot(state);
  return (
    <IconContext.Provider
    value={{
      color: snap.color.value,
      size: "2rem",
      style: { cursor: "pointer" },
    }}
  >
    <RiSendToBack
      type="outline"
      title="Rotate to Back"
      onClick={() => {
        if (decalExists) {
          onButtonClick(Math.PI);
        } 
      }}
      style={{ color: snap.color.value }}
    />
  </IconContext.Provider>
  )
}

export default RotateBack