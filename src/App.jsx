import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Camera(props) {
  const ref = useRef();
  const set = useThree((state) => state.set)
  useEffect(() => void set({ camera: ref.current }), [])
  useFrame(() => ref.current.updateMatrixWorld());

  const [active, setActive]=useState(false)

  const { rotation, position } = useSpring({ rotation: active ? [0,0,0] : [0,Math.PI/2,0], position: active ?[0,0,0] : [-0.05,0,-0.07], config: { duration: 3000 } })

  return (
    
      <perspectiveCamera ref={ref} {...props} />
    
  )
}

export default function App() {

  const myMesh = useRef();
  const [active, setActive]=useState(false)

  const { rotation, position } = useSpring({ rotation: active ? [0,0,0] : [0,Math.PI/2,0], position: active ?[5,0,0] : [0,0,0], config: { duration: 3000 } })
  useEffect(() => setActive(true))
  return (
    <Canvas>
       <animated.mesh  position={position}  ref={myMesh}>
      <Camera />
      </animated.mesh>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <ScrollControls pages={3} damping={0.1} horizontal={true}> */}
      {/* <Scroll> */}
      <Box position={[0, -1, -10]} />
      {/* </Scroll> */}
      {/* <Scroll> */}
      <Box position={[0, 1, -10]} />
      {/* </Scroll> */}
      {/* </ScrollControls> */}
    </Canvas>
  )
}


