import React, { useEffect, useRef, useState} from 'react'
;
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame, useThree } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import state from '../store';

const Shirt = ({angle, setIsAnimating, isAnimating, canvasRef }) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/tshirt.glb');
  const shirtRef = useRef();
  const decalRef = useRef();

  //textur to apply to tshirt
  const logoTexture = useTexture(snap.logoDecal);
  const fullTextur = useTexture(snap.fullDecal);
  
  // to apply the color smoothly
  useFrame((state, delta) => easing.dampC(materials['FABRIC_1_FRONT_4193.001'].color, snap.color.value, 0.25, delta));


  // to fix updating 
  const stateSring = JSON.stringify(snap); 

  // use state to keep track of front/back placement
  const [showText, setShowText] = useState(snap.isFront);



  ////////////////////////show back and front/////////////////////////////
    // Convert the angle to a Quaternion
    const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0, 'XYZ'));

    // Set the object's rotation to the quaternion
    if (shirtRef.current) {
      shirtRef.current.rotation.setFromQuaternion(quaternion);
    }

  ///////////////////////////rotation//////////////////////////////
  //the shirt should rotate by Math.PI/2 degrees per second until it has completed a full rotation (2*Math.PI radians)

  useFrame((state, delta) => {
    if (isAnimating) {
      // calculate the new rotation angle based on the time elapsed since the animation started
      const newAngle = shirtRef.current.rotation.y + delta * Math.PI / 2;
      // check if we have completed a full rotation yet
      if (newAngle >= Math.PI * 2) {
        // stop the animation when complete
        setIsAnimating(false);
        return;
      }
      // update the rotation of the t-shirt mesh
      shirtRef.current.rotation.y = newAngle;
    }

    // adjust decal position based on front/back placement
    const positionZ = showText ? -0.15 : 0.15;
    const positionY = showText ? 0.04 : -0.04;

    // check if user has entered any text, if yes then show decal otherwise hide it
    if (snap.textValue !== ' ') {
      setShowText(true);
    } else {
      setShowText(false);
    }
    // update position and visibility of the decal based on above conditions
    shirtRef.current.children.forEach(child => {
      if (child.type === Decal) {
        child.visible = showText && snap.textValue !== ' ';
        child.position.set(0, positionY, positionZ);
      }
    });
  });

  /////////////////////text control/////////////////////////

  const createTextCanvas = (text, textColor) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    // Set canvas dimensions based on text length and desired font size
    const fontSize = 100;
    const textWidth = context.measureText(text).width;
    const lineHeight = fontSize * 4;
    const lines = splitIntoLines(context, text, canvas.width - (fontSize * 4));
  
    canvas.width = textWidth + (fontSize * 4);
    canvas.height = lineHeight * lines.length;
  
    // Erase background color
    context.fillStyle = snap.color.value;
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    // Set text color and font
    context.fillStyle = textColor;
    context.font = `${fontSize}px Arial`;
  
    // Draw text in center of canvas
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    for (let i = 0; i < lines.length; i++) {
      context.fillText(lines[i], fontSize * 2, (i * lineHeight) + (lineHeight / 2));
    }
  
    // Add border to check for color bleeding
    context.strokeStyle = 'red';
    context.strokeRect(0, 0, canvas.width, canvas.height);
  
    return canvas;
  }
  
  // helper function to split text into multiple lines
  function splitIntoLines(context, text, maxWidth) {
    let words = text.split(' ');
    let lines = [];
    let currentLine = words[0];
  
    for (let i = 1; i < words.length && lines.length < 2; i++) {
      let word = words[i];
      let width = context.measureText(currentLine + '' + word).width;
  
      if (width < maxWidth) {
        currentLine += '' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
  
    lines.push(currentLine);
    // limit to 2 lines
    return lines.slice(0, 2);
  }
  

  ////////////////////////////drag controle////////////////////
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({x: 0, y: 0});

  const { camera } = useThree();

  useEffect(() => {
    const canvas = canvasRef.current;
    const onMouseDown = (event) => {
      // calculate normalized device coordinates (-1 to 1) based on mouse position
      const x = (event.clientX / canvas.clientWidth) * 2 - 1;
      const y = -(event.clientY / canvas.clientHeight) * 2 + 1;
  
      // create a new mouse vector based on normalized device coordinates
      const mouseVector = new THREE.Vector2(x, y);
  
      // create a new raycaster and set it to use the camera's perspective projection matrix
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouseVector, camera);
  
      // intersect the ray with the decal to check if the cursor is hovering over the logo
      const intersection = raycaster.intersectObject(decalRef.current);
      if (intersection.length > 0) {
        setIsDraggingLogo(true);
        // store the current mouse position as the previous position
        setPreviousMousePosition({ x: event.clientX, y: event.clientY });
      }
    }
  
    canvas.addEventListener('mousedown', onMouseDown);
  
    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
    };
  }, [canvasRef, camera]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const onMouseMove = (event) => {
      if (isDraggingLogo) {
        // calculate the change in mouse position since the last mousemove event
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
  
        // update the position of the decal based on the change in mouse position
        decalRef.current.position.x += deltaX / canvas.clientWidth * 2;
        decalRef.current.position.y -= deltaY / canvas.clientHeight * 2;
  
        // store the current mouse position as the previous position for the next mousemove event
        setPreviousMousePosition({ x: event.clientX, y: event.clientY });
      }
    };
  
    canvas.addEventListener('mousemove', onMouseMove);
  
    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [canvasRef, decalRef, isDraggingLogo, previousMousePosition]);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const onMouseUp = () => {
      setIsDraggingLogo(false);
    };
  
    canvas.addEventListener('mouseup', onMouseUp);
  
    return () => {
      canvas.removeEventListener('mouseup', onMouseUp);
    };
  }, [canvasRef]);
  

  return (

      <group key={stateSring}>

        <mesh
          ref={shirtRef}
          castShadow
          geometry={ nodes.tshirt.geometry }
          material={materials['FABRIC_1_FRONT_4193.001']}
          material-roughness={1}
          dispose={null}
          scale={1.45}
  
        >
          {/* showing the logo or texture */}
          {snap.isFullTexture && (
            <Decal
              position={[0,0,0]}
              rotation={[0,0,0]}
              scale={1}
              // render texture
              map={fullTextur}
            />

            )}
            {/* showing the logo */}
            {snap.isLogoTexture && (
              <Decal
                position={[0,0.04,0.15]}
                rotation={[0,0,0]}
                scale={0.15}
                // render logo
                map={logoTexture}
                // change the quality of texture
                map-anisotropy={16}
                // insure to render on top of the other objects in the scene
                // depthTest={false}
                depthWrite={true}
                ref={decalRef}
              />
            )}
            {!snap.isLogoTexture && showText && snap.textValue !== ' ' && (
              <Decal
                position={[0,0,0.17]}
                rotation={[0, 0, 0]}
                scale={0.3}
                // render user-entered text as texture
                material-roughness={1}
              >
                <meshBasicMaterial
                  map={new THREE.CanvasTexture(
                    createTextCanvas(snap.textValue, '#000000')
                  )}
                />
              </Decal>
            )}
        </mesh>
      </group>
  )
}

export default Shirt;