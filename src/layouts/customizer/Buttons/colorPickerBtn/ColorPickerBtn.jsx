import React from 'react'
import { IconContext } from 'react-icons';
import { MdColorLens } from "react-icons/md";
import state from 'store';
import { useSnapshot } from 'valtio';

const ColorPickerBtn = ({activeEditorTab, setActiveEditorTab}) => {
    const snap = useSnapshot(state);
  return (
    <IconContext.Provider
    value={{
      color: `${snap.color.value}`,
      size: "2rem",
      style: {
        cursor: "pointer",
        opacity: activeEditorTab === "colorpicker" ? "100%" : "60%",
      },
      className: "sidebarBtn",
    }}
  >
    <MdColorLens
      onClick={() => setActiveEditorTab("colorpicker")}
    />
  </IconContext.Provider>
  )
}

export default ColorPickerBtn