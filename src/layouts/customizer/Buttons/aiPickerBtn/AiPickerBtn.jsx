import React from 'react'
import { IconContext } from 'react-icons'
import { BsRobot } from 'react-icons/bs'

const AiPickerBtn = ({activeEditorTab, setActiveEditorTab}) => {
  return (
    <IconContext.Provider
        value={{
            color: "white",
            size: "2rem",
            style: {
                cursor: "pointer",
                opacity: activeEditorTab === "aipicker" ? "100%" : "60%",
                  },
            }}
    >
        <BsRobot onClick={() => setActiveEditorTab("aipicker")} />
    </IconContext.Provider>
  )
}

export default AiPickerBtn