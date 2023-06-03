import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import state from 'store'
import { useSnapshot } from 'valtio'
import { BsCamera } from "react-icons/bs";

const ScreenshotBtn = ({canvasRef}) => {
    const snap = useSnapshot(state);
    //keep track of whether or not the screenshot button has been clicked
    const [isScreenshotClicked, setIsScreenshotClicked] = useState(false);

    const handleScreenshotClick = () => {
      setIsScreenshotClicked(true);
    };

    useEffect(() => {
      if (isScreenshotClicked && canvasRef.current) {
        const dataURL = canvasRef.current.toDataURL("image/png");
        const tempAnchor = document.createElement("a");
        tempAnchor.href = dataURL;
        tempAnchor.setAttribute("download", "screenshot.png");
        tempAnchor.click();
        setIsScreenshotClicked(false);
      }
    }, [isScreenshotClicked, canvasRef]);
  return (
    <IconContext.Provider
    value={{
      color: snap.color.value,
      size: "2rem",
      style: { cursor: "pointer" },
    }}
  >
    <BsCamera onClick={handleScreenshotClick} title="ScreenShot" />
  </IconContext.Provider>
  )
}

export default ScreenshotBtn