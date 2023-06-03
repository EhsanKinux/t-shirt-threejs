import React from 'react'
import { IconContext } from 'react-icons'
import state from 'store'
import { useSnapshot } from 'valtio'
import { AiFillFileImage } from "react-icons/ai";

const FilePickerBtn = ({activeEditorTab, setActiveEditorTab}) => {
    const snap = useSnapshot(state);
  return (
    <IconContext.Provider
    value={{
      color: `${snap.color.value}`,
      size: "2rem",
      style: {
        cursor: "pointer",
        opacity: activeEditorTab === "filepicker" ? "100%" : "60%",
      },
      className: "sidebarBtn",
    }}
  >
    <AiFillFileImage
      onClick={() => setActiveEditorTab("filepicker")}
    />
  </IconContext.Provider>
  )
}

export default FilePickerBtn