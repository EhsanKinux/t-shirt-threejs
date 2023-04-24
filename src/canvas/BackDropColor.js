import React, { useRef } from 'react'
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';


const BackDropColor = () => {
  const shadows = useRef();
  return (
    <AccumulativeShadows 
      position={[0, 0, -0.14]}
      ref={shadows}
      // smoth the edges overtime
      temporal
      frames={60}
      alphaTest={0.85}
      scae={10}
      rotation={[Math.PI /2 , 0, 0]}
    >
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={20}
        ambient={0.55}
        position={[5,5,-10]}
      />
      <RandomizedLight
        amount={4}
        radius={4}
        intensity={20}
        ambient={0.55}
        position={[-5, 5,-5]}
      />
      <RandomizedLight
        amount={4}
        radius={4}
        intensity={20}
        ambient={0.5}
        position={[-5, 5,-8]}
      />
    </AccumulativeShadows>
  )
}

export default BackDropColor