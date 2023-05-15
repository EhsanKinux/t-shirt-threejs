import React from 'react';
import { CirclePicker } from 'react-color';
import { useSnapshot } from 'valtio';

//styles
import './colorpicker.css'
import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className='container'>
      <CirclePicker
        className='colorpicker'
        color={snap.color.value}
        // disableAlpha
        presetColors={[
          '#EDCBD2', '#80C4B7', '#E3856B', 
          '#3B5BA5', '#E87A5D', '#F3B941',
          '#B2456E', '#FBEAE7', '#552619',
          '#CADCFC', '#8AB6F9', '#00246B',
          '#D5CAE4', '#E1E5EB', '#E59462',
          '#81CAD6', '#EDCD44', '#DC3E26',
          '#3988A4', '#67C2D4', '#D0944D', 
          '#CB625F', '#3F3F3F', '#FAFAFA'
        ]}
        onChange={(color) => state.color.value = color.hex}
      />
    </div>
  )
}

export default ColorPicker