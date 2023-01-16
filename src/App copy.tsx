import { styled } from '@linaria/react';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';



const Wrapper = styled.div`
  display: block;
`;



function Box({ ...props }) {
  // This reference gives us direct access to the THREE.Mesh object
  const meshRef = useRef<Mesh | null>(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame

  useFrame((state, delta) => {
    if (meshRef.current !== null) {
      const mesElement = meshRef.current;
      return mesElement.rotation.x += delta;
    }
  });

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      {...props}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}



function App() {
  return (
    <Wrapper>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </Wrapper>
  );
}

export default App;
