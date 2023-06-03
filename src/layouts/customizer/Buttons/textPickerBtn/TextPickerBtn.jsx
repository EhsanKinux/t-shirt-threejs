import React from 'react'
import { IconContext } from 'react-icons'
import { BsTextareaT } from 'react-icons/bs'

const TextPickerBtn = ({activeEditorTab, setActiveEditorTab}) => {
  return (
    <IconContext.Provider
    value={{
      color: "white",
      size: "2rem",
      style: {
        cursor: "pointer",
        opacity: activeEditorTab === "textpicker" ? "100%" : "60%",
      },
      className: "sidebarBtn",
    }}
  >
    <BsTextareaT onClick={() => setActiveEditorTab("textpicker")} />
  </IconContext.Provider>
  )
}

export default TextPickerBtn