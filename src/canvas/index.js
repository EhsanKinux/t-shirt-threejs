import "./index.css"
//
import { Canvas } from "@react-three/fiber"
import { Center, Environment } from "@react-three/drei"
import { Suspense, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
//
import { getContrastingColor } from "../config/helpers";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import Loading from "components/loading/Loading";
import Customizer from "../layouts/customizer/Customizer";
import state from "../store";



const CanvasModel = () => {

  const snap = useSnapshot(state)
  const canvasRef = useRef();
  const decalRef = useRef(null);

  //state to keep track of logo decal position
  const [showFront, setShowFront] = useState(true);
  // rotation of front and back of the product
  const [angle, setAngle] = useState(0);
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleButtonClick(newAngle) {
    setAngle(newAngle);
  }

  function startAnimation() {
    setIsAnimating(true);
  }

  // the useRef hook creates a reference to the canvas element and then use the onCreated property of the Canvas component to wait for the canvas to be created before setting the reference to it


  return (
    <div className="canvasWrapper" style={{backgroundColor: getContrastingColor(snap.color.value)}}>

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
        <CameraRig>

          <Center>
            <Suspense fallback={Loading}>
              <Shirt angle={angle} setIsAnimating={setIsAnimating} isAnimating={isAnimating} canvasRef={canvasRef} showFront={showFront} setLogoPosition decalRef={decalRef}/>
            </Suspense>
          </Center>

        </CameraRig>
      </Canvas>
      {/* Only show the customizer after the canvas has loaded */}
      {(isCanvasLoaded && canvasRef.current) && <Customizer onButtonClick={handleButtonClick} canvasRef={canvasRef} startAnimation={startAnimation} angle={angle} setShowFront={setShowFront} showFront={showFront} decalRef={decalRef} />}
    </div>
  )
}

export default CanvasModel