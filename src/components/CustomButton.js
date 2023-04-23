//style
import "./customButton.css"

import state from "../store"
import { useSnapshot } from "valtio"

const CustomButton = ({type, title, customStyles, handleClick}) => {

  const snap = useSnapshot(state);
  const generateStyle = () => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: '#1e1e1e'
      }
    }
  }
  return (
    <button className='custBtn'
            style={generateStyle(type)}
            onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton