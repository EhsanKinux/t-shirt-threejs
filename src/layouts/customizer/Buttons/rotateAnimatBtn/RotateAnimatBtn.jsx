import React from 'react'
import { IconContext } from 'react-icons';
import state from 'store'
import { useSnapshot } from 'valtio'
import { TbRotateDot } from "react-icons/tb";

const RotateAnimatBtn = ({startAnimation}) => {
    const snap = useSnapshot(state);
  return (
    <IconContext.Provider
    value={{
      color: snap.color.value,
      size: "2rem",
      style: { cursor: "pointer" },
    }}
  >
    <TbRotateDot
      type="outline"
      title="Animation"
      onClick={startAnimation}
      style={{ color: snap.color.value }}
    />
  </IconContext.Provider>
  )
}

export default RotateAnimatBtn