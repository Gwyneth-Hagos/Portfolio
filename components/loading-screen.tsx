'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center, Loader } from '@react-three/drei';

function LoadingText() {
  return (
    <Float
      speed={4} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
    >
      <Center>
        <Text3D
          font="/fonts/Roboto_Bold.json"
          size={0.5}
          height={0.2}
          curveSegments={12}
        >
          CodeWithGwy
          <meshNormalMaterial />
        </Text3D>
      </Center>
    </Float>
  );
}

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="h-[50vh] w-full">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <LoadingText />
        </Canvas>
      </div>
      <Loader />
    </motion.div>
  );
}