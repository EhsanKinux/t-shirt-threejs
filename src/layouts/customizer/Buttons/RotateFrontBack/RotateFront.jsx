import React from 'react'
import { IconContext } from 'react-icons';
import state from 'store';
import { useSnapshot } from 'valtio';
import { RiBringToFront } from "react-icons/ri";

const RotateFront = ({decalExists, onButtonClick}) => {
    const snap = useSnapshot(state);
  return (
    <IconContext.Provider
    value={{
      color: snap.color.value,
      size: "2rem",
      style: { cursor: "pointer" },
    }}
  >
    <RiBringToFront
      type="outline"
      title="Rotate to Front"
      onClick={() => {
        if (decalExists) {
          onButtonClick(0);
        } 
      }}
      style={{ color: snap.color.value }}
    />
  </IconContext.Provider>
  )
}

export default RotateFront