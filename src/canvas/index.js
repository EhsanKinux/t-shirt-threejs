import { Canvas } from "@react-three/fiber"
import { Environment, Center, SpotLight } from "@react-three/drei"

import BackDropColor from "./BackDropColor";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";

//styles
import "./index.css"

const CanvasModel = () => {
  return (
    <div className="canvasWrapper">

      <Canvas 
        className="canvas"
        shadows
        camera={{position: [0,0,4.2], fov:50}}
        // preserve the buffers
        gl={{preserveDrawingBuffer:true}}
      >
        <ambientLight intensity={0.35}/>
        <Environment preset="city"/>
        {/* <BackDropColor/> */}
        <CameraRig>
          <Center>
            <Shirt/>
          </Center>
        </CameraRig>
      </Canvas>
    </div>
  )
}

export default CanvasModel