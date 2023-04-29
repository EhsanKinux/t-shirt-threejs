import React, { useRef} from 'react'
;
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import state from '../store';



const Shirt = ({angle, setIsAnimating, isAnimating }) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/tshirt.glb');
  const shirtRef = useRef();

  //textur to apply to tshirt
  const logoTexture = useTexture(snap.logoDecal);
  const fullTextur = useTexture(snap.fullDecal);
  
  // to apply the color smoothly
  useFrame((state, delta) => easing.dampC(materials['FABRIC_1_FRONT_4193.001'].color, snap.color.value, 0.25, delta));


  // to fix updating 
  const stateSring = JSON.stringify(snap); 
  



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
});




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
              />
            )}
        </mesh>
      </group>
  )
}

export default Shirt;