import React from 'react'

const ShirtButton = (props) => {
  return (
    <div>
    <button onClick={() => props.onClick(0)}>Front</button>
    <button onClick={() => props.onClick(Math.PI)}>Back</button>
  </div>
  )
}

export default ShirtButton