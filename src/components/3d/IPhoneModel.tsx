'use client';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function IPhoneModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/IP12PRO1.glb?v=2');
  const initialized = useRef(false);

  useEffect(() => {
    if (!scene || !groupRef.current || initialized.current) return;
    initialized.current = true;

    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false;

        const fixMat = (mat: THREE.Material) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.envMapIntensity = 2.0;
            mat.needsUpdate = true;
          }
          if (mat.name === 'Glass') {
            const m = mat as THREE.MeshStandardMaterial;
            m.transparent = true;
            m.opacity = 0.3;
            m.needsUpdate = true;
          }
        };

        if (Array.isArray(child.material)) {
          child.material.forEach(fixMat);
        } else {
          fixMat(child.material);
        }
      }
    });

    // Create an inner group to act as the centered pivot container
    const innerGroup = new THREE.Group();
    innerGroup.name = 'centered-pivot';
    innerGroup.add(clone);

    // Compute bounding box of clone to find its geometric center
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    
    // Shift clone position inside innerGroup so its geometric center is at [0, 0, 0]
    clone.position.sub(center);

    // Stand the phone upright on the innerGroup (tilt back 90 degrees)
    innerGroup.rotation.x = -Math.PI / 2;
    // Default Y rotation to Math.PI so the screen faces the camera
    innerGroup.rotation.y = Math.PI;
    // Flip the phone 180 degrees so the camera notches/lenses are at the top
    innerGroup.rotation.z = Math.PI;

    // Normalize scale based on maximum dimension
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    innerGroup.scale.setScalar(2.2 / maxDim); // Shrink from 3.2 to 2.2 to fit comfortably

    // Add the centered pivot group to the main ref group
    groupRef.current.add(innerGroup);
  }, [scene]);

  // Gentle idle auto-rotation around the vertical (Y) axis
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25; // slow turntable spin
  });

  return <group ref={groupRef} />;
}

useGLTF.preload('/models/IP12PRO1.glb?v=2');
