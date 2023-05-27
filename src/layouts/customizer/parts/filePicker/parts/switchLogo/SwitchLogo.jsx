import React from 'react'
import './switchlogo.css'

const SwitchLogo = ({pos, handleClick}) => {
  return (
    <div 
        key={pos.name}
        className='iconWrapper'
        onClick={handleClick}
    >
        <img src={pos.icon} alt={pos.name} className='iconImg' />
    </div>
  )
}

export default SwitchLogo