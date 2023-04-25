import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';
import { Tween } from '@tweenjs/tween.js';
import ShirtButton from './ShirtButton';


const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/tshirt.glb');

  //textur to apply to tshirt
  const logoTexture = useTexture(snap.logoDecal);
  const fullTextur = useTexture(snap.fullDecal);
  
  // to apply the color smoothly
  useFrame((state, delta) => easing.dampC(materials['FABRIC_1_FRONT_4193.001'].color, snap.color, 0.25, delta));

  

  // to fix updating 
  const stateSring = JSON.stringify(snap);

  ////////////////////////rotation/////////////////////////////


  return (

      <group key={stateSring}>
        <mesh
          // ref={shirtRef}
          castShadow
          geometry={nodes.tshirt.geometry}
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
                depthTest={false}
                depthWrite={true}
              />
            )}
        </mesh>
      </group>
  )
}

export default Shirt