import React from 'react'
import './switchlogo.css'

const SwitchLogo = ({pos}) => {
  return (
    <div 
        key={pos.name}
        className='iconWrapper'
    >
        <img src={pos.icon} alt={pos.name} className='iconImg' />
    </div>
  )
}

export default SwitchLogo