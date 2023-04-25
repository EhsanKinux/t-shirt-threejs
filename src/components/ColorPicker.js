import React from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';

//styles
import './colorpicker.css'
import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className='container'>
      <SketchPicker
        className='colorpicker'
        color={snap.color}
        disableAlpha
        onChange={(color) => state.color.hex}
      />
    </div>
  )
}

export default ColorPicker