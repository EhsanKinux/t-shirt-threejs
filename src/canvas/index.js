import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"

import BackDropColor from "./BackDropColor";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import { useState } from "react";

//styles
import "./index.css"
import Customizer from "../pages/Customizer";

const CanvasModel = () => {

  const [angle, setAngle] = useState(0);
  function handleButtonClick(newAngle) {
    setAngle(newAngle);
  }
  return (
    <div className="canvasWrapper">

      <Canvas 
        className="canvas"
        shadows
        camera={{position: [0,0,4.2], fov:66}}
        // preserve the buffers
        gl={{preserveDrawingBuffer:true}}
      >
        <ambientLight intensity={0.35}/>
        <Environment preset="city"/>
        <BackDropColor/>
        <CameraRig>

            <Shirt angle={angle}/>

        </CameraRig>
      </Canvas>
      <Customizer onButtonClick={handleButtonClick} />
    </div>
  )
}

export default CanvasModel