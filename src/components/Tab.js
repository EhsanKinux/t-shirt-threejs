import React from 'react'
import { useSnapshot } from 'valtio'

//styles
import './tab.css'
import state from '../store'

const Tab = ({tab, isFillterTab, isActiveTab, handleClick}) => {
  const snap = useSnapshot(state);

  const activeStyles = isFillterTab && isActiveTab 
      ? {backgroundColor: snap.color, opacity: 0.5} 
      : {backgroundColor: "transparent", opacity: 1}


  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFillterTab ? 'isfillter' : 'notfillter' }`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img src={tab.icon} alt={tab.name} className={`${isFillterTab ? 'isfillterimg' : 'notfillterimg'}`}/>
    </div>
  )
}

export default Tab