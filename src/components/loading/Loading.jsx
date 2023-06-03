import { getContrastingColor } from "config/helpers"
import "./loading.css"
import { useSnapshot } from "valtio"
import state from "store"

const Loading = () => {
  const snap = useSnapshot(state);
  return (
    <>
      <div class="loader">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <div className="bar4"></div>
          <div className="bar5"></div>
          <div className="bar6"></div>
          <div className="bar7"></div>
          <div className="bar8"></div>
          <div className="bar9"></div>
          <div className="bar10"></div>
          <div className="bar11"></div>
          <div className="bar12"></div>
      </div>
      <span className="laodingText" style={{color: getContrastingColor(snap.bgColor.value)}} >Please wait</span>
    </>
  )
}

export default Loading