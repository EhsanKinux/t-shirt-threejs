import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/tshirt.glb');

  //textur to apply to tshirt
  const logoTexture = useTexture(snap.logoDecal);
  const fullTextur = useTexture(snap.fullDecal);
  
  // to apply the color smoothly
  // useFrame((state, delta) => easing.dampC(materials.color, snap.color, 0.25, delta));

  // to fix updating 
  const stateSring = JSON.stringify(snap);

  ////////////////////////rotation/////////////////////////////
      // Create a reference to the 3D object
  const shirtRef = useRef();

  // Define a variable to store the current rotation value
  let angle = 0;

  // Define the key codes for up and down arrow keys
  const UP_ARROW_KEYCODE = 38;
  const DOWN_ARROW_KEYCODE = 40;

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the up or down arrow key is pressed
      if (event.keyCode === UP_ARROW_KEYCODE) {
        // Increase the rotation angle
        angle += Math.PI / 8; // Change this value to adjust the rotation speed
      } else if (event.keyCode === DOWN_ARROW_KEYCODE) {
        // Decrease the rotation angle
        angle -= Math.PI / 8; // Change this value to adjust the rotation speed
      }

      // Convert the angle to a Quaternion
      const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0, 'XYZ'));

      // Set the object's rotation to the quaternion
      if (shirtRef.current) {
        shirtRef.current.rotation.setFromQuaternion(quaternion);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <group key={stateSring}>
      <mesh
        ref={shirtRef}
        castShadow
        geometry={nodes.tshirt.geometry}
        material={materials['FABRIC_1_FRONT_4193.001']}
        material-color={snap.color}
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
              depthTest={false}
              depthWrite={true}
            />
          )}
      </mesh>
    </group>
  )
}

export default Shirt