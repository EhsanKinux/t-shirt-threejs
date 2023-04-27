import React from 'react'
import CustomButton from './CustomButton'

//styles
import "./filepicker.css"

const FilePicker = ({file, setFile, readFile}) => {
  return (
    <div className='filepicker-container'>
      <div className='fileWrapper'>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
          className='input'
        />
        <label htmlFor='file-upload' className='filepicker-lable'>
          Upload File
        </label>

        <p className='filepicker-paragraph'>
          {file ==='' ? "No file selected" : file.name }
        </p>
      </div>

      <div className='buttonWrapper'>
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile('logo')}
          className="logoBtn"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile('full')}
          className="fullBtn"
        />

      </div>

    </div>
  )
}

export default FilePicker