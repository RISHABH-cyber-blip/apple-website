'use client';
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/utils';

interface IPhoneModelProps {
  scrollProgress: number;
}

const PANELS = [
  [0.00, 0.12,  0,              0,              0,     0,    0,   1.0],
  [0.12, 0.22,  0,              0.25,           0,     0.8,  0,   1.05],
  [0.22, 0.36,  0,              0.15,           0,    -0.8,  0,   1.05],
  [0.36, 0.50,  0.05,           Math.PI,        0,     0.8,  0,   1.1],
  [0.50, 0.64,  0.15,           Math.PI + 0.3,  0,     0.8,  0.3, 1.05],
  [0.64, 0.78,  0.10,           Math.PI + 0.5,  0.05, -0.3,  0.5, 1.4],
  [0.78, 0.90,  0,              Math.PI * 1.5,  0,     1.2,  0,   1.0],
  [0.90, 1.00,  0,              Math.PI * 2,    0,     0,    0,   1.05],
];

export default function IPhoneModel({ scrollProgress }: IPhoneModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/IP12PRO1.glb');
  const initialized = useRef(false);
  const { camera } = useThree();

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

    // Auto-center and normalize scale
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    clone.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    clone.scale.setScalar(3.5 / maxDim);

    groupRef.current.add(clone);
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const sp = scrollProgress;

    let tRX = 0, tRY = 0, tRZ = 0, tPX = 0, tPY = 0, tSC = 1.0;

    for (const [start, end, rx, ry, rz, px, py, sc] of PANELS) {
      if (sp >= (start as number) && sp <= (end as number)) {
        tRX = rx as number; tRY = ry as number; tRZ = rz as number;
        tPX = px as number; tPY = py as number; tSC = sc as number;
        break;
      }
    }

    const s = 1 - Math.pow(0.001, delta);
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, tRX, s * 3);
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, tRY, s * 3);
    groupRef.current.rotation.z = lerp(groupRef.current.rotation.z, tRZ, s * 3);
    groupRef.current.position.x = lerp(groupRef.current.position.x, tPX, s * 2);
    groupRef.current.position.y = lerp(groupRef.current.position.y, tPY, s * 2);
    groupRef.current.scale.setScalar(lerp(groupRef.current.scale.x, tSC, s * 2));

    const camTarget = (sp > 0.64 && sp < 0.78) ? 3.5 : 6;
    camera.position.z = lerp(camera.position.z, camTarget, s);
  });

  return <group ref={groupRef} />;
}

useGLTF.preload('/models/IP12PRO1.glb');
