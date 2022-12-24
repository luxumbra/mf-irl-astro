/* eslint-disable react/no-unknown-property */
import { useThree, extend, useFrame } from '@react-three/fiber'
import { Sparkles, Center, OrbitControls, TransformControls } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh } from "three";
import * as THREE from 'three';


function Experience() {
  const mesh = useRef<Mesh>(null)
  const sphereRef = useRef<Mesh>(null)
  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const sparkleColor = new THREE.Color(0x1f8975)
  // useFrame(() => {
  //   if (mesh.current) {
  //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  //   }
  // })

  return (
    <>
      {/* <OrbitControls /> */}

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Center>
        <Sparkles
          size={10}
          count={100}
          scale={[10, 20, 40]}
          position-y={1}
          speed={0.2}
          color={sparkleColor}
        />
        {/* <mesh ref={sphereRef} position-x={ - 2 }>
    <sphereGeometry />
    <meshBasicMaterial color="orange" />
</mesh> */}
      </Center>
    </>
  )
}

export default Experience;