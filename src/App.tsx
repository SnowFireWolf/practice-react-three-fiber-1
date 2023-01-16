import { styled } from '@linaria/react';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointLight } from 'three';
import { useGLTF, Stage, Grid, OrbitControls, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import cyclistGLB from '@/assets/cyclist.glb';
import islandGLB from '@/assets/island.glb';



const Wrapper = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
`;



const IslandModel = ({ ...props }) => {
  const lightRef = useRef<PointLight | null>(null);

  // const { nodes, materials } = useGLTF(islandGLB);
  const island = useGLTF(islandGLB);
  // const cyclist = useGLTF(cyclistGLB);
  
  // console.log('island', island);

  useFrame((state, data) => {
    if(lightRef.current !== null) {
      const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2;
      lightRef.current.intensity = 1 + t * 2;
    }
  });

  return (
    <group {...props}>
      <primitive object={island.scene} receiveShadow castShadow />
      {/* <primitive object={cyclist.scene} /> */}
      {/* <pointLight ref={lightRef} intensity={1} color={[10, 2, 5]} distance={2.5} /> */}

      <OrbitControls
        enableZoom={false}
        makeDefault
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.1}
      />
    </group>
  )
}

const CyclistModel = ({ ...props }) => {
  const cyclist = useGLTF(cyclistGLB);

  console.log('cyclist', cyclist);

  return (
    <group {...props}>
      <primitive object={cyclist.scene} scale={[0.5, 0.5, 0.5]} rotation={[0,21,0]} />
      {/* <primitive object={cyclist.scene} /> */}

      {/* <OrbitControls
        enableZoom={false}
        makeDefault
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.1}
      /> */}
    </group>
  );
}



function App() {
  return (
    <Wrapper>
      <Canvas camera={{ position: [10, 3, 10], fov: 100 }}>
        {/* <pointLight intensity={1} color={[10, 2, 5]} distance={2.5} /> */}
        <ambientLight intensity={0.5} />
        {/* <pointLight position={[10, 3, 10]} /> */}
        <pointLight position={[-10, 10, -20]} color="white" intensity={1} />
        <pointLight position={[0, -10, 0]} intensity={1} />
        <directionalLight castShadow position={[2.5, 8, 5]} intensity={1.5} shadow-mapSize={1024}>
          <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
        </directionalLight>

        <IslandModel />
        <CyclistModel position={[9, 0, -7.4]}/>
      </Canvas>
    </Wrapper>
  );
}

export default App;
