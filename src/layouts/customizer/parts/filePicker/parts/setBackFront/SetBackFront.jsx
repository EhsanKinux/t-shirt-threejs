import './setbackfront.css'
// 
import CustomButton from 'components/customButton/CustomButton'
import React from 'react'

const SetBackFront = ({setShowFront}) => {
  return (
    <div className='backFrontWrapper'>
    <CustomButton
      type="filled"
      title="Front"
      handleClick={() => setShowFront(true)}
      className="logoBtn"
    />
      <CustomButton
      type="filled"
      title="Back"
      handleClick={() => setShowFront(false)}
      className="logoBtn"
    />
  </div>
  )
}

export default SetBackFront