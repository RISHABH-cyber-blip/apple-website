'use client';
import { useEffect, useRef } from 'react';

let globalLenis: any = null;
export function getLenis() {
  return globalLenis;
}

export function useLenis() {
  const lenisRef = useRef<any>(null);
  return lenisRef;
}
