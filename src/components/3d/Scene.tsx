'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import IPhoneModel from './IPhoneModel';

interface SceneProps {
  scrollProgress: number;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 8, 6]} intensity={3} color="#ffffff" castShadow />
      <directionalLight position={[-4, 2, -4]} intensity={1.2} color="#aaccff" />
      <pointLight position={[0, 4, 4]} intensity={2} color="#ffffff" />
      <pointLight position={[0, -2, 2]} intensity={0.8} color="#cccccc" />
    </>
  );
}

function LoadingBox() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#333" wireframe />
    </mesh>
  );
}

export default function Scene({ scrollProgress }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
        outputColorSpace: THREE.SRGBColorSpace,
        alpha: true,
      }}
      shadows
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0, background: 'transparent' }}
    >
      <Lights />
      <Suspense fallback={<LoadingBox />}>
        <IPhoneModel scrollProgress={scrollProgress} />
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.3}
          scale={6}
          blur={2}
          far={3}
          color="#000000"
        />
      </Suspense>
    </Canvas>
  );
}
