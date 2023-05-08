import { Canvas } from "@react-three/fiber"
import { Center, Environment } from "@react-three/drei"
import BackDropColor from "./BackDropColor";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import { useEffect, useRef, useState } from "react";
import Customizer from "../pages/Customizer";

//styles
import "./index.css"


const CanvasModel = () => {



  // rotation of front and back of the product
  const [angle, setAngle] = useState(0);
  function handleButtonClick(newAngle) {
    setAngle(newAngle);
  }

  const [isAnimating, setIsAnimating] = useState(false);

  
  // the useRef hook creates a reference to the canvas element and then use the onCreated property of the Canvas component to wait for the canvas to be created before setting the reference to it
  const canvasRef = useRef();
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  useEffect(() => {
    if (canvasRef.current) setIsCanvasLoaded(true);
  }, [canvasRef]);
  
  function startAnimation() {
    setIsAnimating(true);
  }

  

  return (
    <div className="canvasWrapper">

      <Canvas 
        className="canvas"
        shadows
        camera={{position: [0,0,4.2], fov:66}}
        // preserve the buffers
        gl={{preserveDrawingBuffer:true}}
        raycaster={{ far: 3.5 }}
        // to keep track of whether the canvas has loaded or not
        onCreated={(state) => {
          canvasRef.current = state.gl.domElement;
          setIsCanvasLoaded(true);
        }}
      >
        <ambientLight intensity={0.35}/>
        <Environment preset="city"/>
        {/* <BackDropColor/> */}
        <CameraRig>
          <Center>

            <Shirt angle={angle} setIsAnimating={setIsAnimating} isAnimating={isAnimating} canvasRef={canvasRef} />
          </Center>

        </CameraRig>
      </Canvas>
      {/* Only show the customizer after the canvas has loaded */}
      {isCanvasLoaded && <Customizer onButtonClick={handleButtonClick} canvasRef={canvasRef} startAnimation={startAnimation}/>}
    </div>
  )
}

export default CanvasModel