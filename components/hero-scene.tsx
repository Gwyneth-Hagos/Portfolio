'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { MotionConfig } from 'framer-motion'

function Model({ position = [0, 0, 0], ...props }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  
  useEffect(() => {
    if (camera) {
      camera.position.set(0, 0, 5)
    }
  }, [camera])

  useFrame((state) => {
    if (!meshRef.current) return
    
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} {...props}>
        <dodecahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial 
          color="#ec4899" 
          emissive="#ec4899"
          emissiveIntensity={0.5}
          roughness={0.1} 
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const { viewport, camera } = useThree()
  
  useEffect(() => {
    if (!mesh.current) return
    
    const dummy = new THREE.Object3D()
    const particles = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      particles[i3] = (Math.random() - 0.5) * 10
      particles[i3 + 1] = (Math.random() - 0.5) * 10
      particles[i3 + 2] = (Math.random() - 0.5) * 10
      
      dummy.position.set(particles[i3], particles[i3 + 1], particles[i3 + 2])
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    
    mesh.current.instanceMatrix.needsUpdate = true
  }, [count])
  
  useFrame((state) => {
    if (!mesh.current) return
    
    const time = state.clock.getElapsedTime() * 0.1
    const dummy = new THREE.Object3D()
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      dummy.position.set(
        Math.sin(i + time) * 5,
        Math.cos(i + time) * 5,
        Math.sin(i * 0.5 + time) * 5
      )
      dummy.scale.setScalar(Math.sin(i * 0.2 + time * 2) * 0.2 + 0.3)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    
    mesh.current.instanceMatrix.needsUpdate = true
  })
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={1} />
    </instancedMesh>
  )
}

export function HeroScene() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model position={[0, 0, 0]} />
        <Particles count={100} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}