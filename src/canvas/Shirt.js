import React from 'react'
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

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.tshirt.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        scale={4}
      >

      </mesh>
    </group>
  )
}

export default Shirt