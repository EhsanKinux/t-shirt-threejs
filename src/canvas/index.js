import { Canvas } from "@react-three/fiber"
import { Center, Environment } from "@react-three/drei"
// import BackDropColor from "./BackDropColor";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import { Suspense, useEffect, useRef, useState } from "react";
import Customizer from "../pages/Customizer";

//styles
import "./index.css"
import Loading from "../components/Loading";
import { getContrastingColor } from "../config/helpers";
import { useSnapshot } from "valtio";
import state from "../store";
// import Server from "../server/Server";


const CanvasModel = () => {

  const snap = useSnapshot(state)

  //state to keep track of logo decal position
  const [showFront, setShowFront] = useState(true);

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
  
  const decalRef = useRef(null);

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
        {/* <BackDropColor/> */}
        <CameraRig>

          <Center>
            <Suspense fallback={Loading}>
              <Shirt angle={angle} setIsAnimating={setIsAnimating} isAnimating={isAnimating} canvasRef={canvasRef} showFront={showFront} setLogoPosition decalRef={decalRef}/>
            </Suspense>
          </Center>

        </CameraRig>
      </Canvas>
      {/* Only show the customizer after the canvas has loaded */}
      {isCanvasLoaded && <Customizer onButtonClick={handleButtonClick} canvasRef={canvasRef} startAnimation={startAnimation} angle={angle} setShowFront={setShowFront} showFront={showFront} decalRef={decalRef} />}
      {/* {isCanvasLoaded && <Server canvasRef={canvasRef}/>} */}
    </div>
  )
}

export default CanvasModel