//style
import "./customButton.css"

import state from "../store"
import { useSnapshot } from "valtio"
import {getContrastingColor} from '../config/helpers'

const CustomButton = ({type, title, customStyles, handleClick}) => {

  const snap = useSnapshot(state);
  const generateStyle = () => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color.value,
        color: getContrastingColor(snap.color.value)
      }
    } else if(type === "outline") {
      return {
        borderWith: '1px',
        borderColor: snap.color.value,
        color: snap.color.value,
        backgroundColor:'none'
      }
    }
  }
  return (
    <button className="custBtn"
            style={generateStyle(type)}
            onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton