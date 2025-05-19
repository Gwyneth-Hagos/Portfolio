'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text3D, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Define letter widths for proper spacing
const letterWidths = {
  'C': 0.5, 'o': 0.4, 'd': 0.4, 'e': 0.4, 'W': 0.6, 
  'i': 0.2, 't': 0.3, 'h': 0.4, 'G': 0.5, 'w': 0.5, 'y': 0.4
};

const letters = "CodeWithGwy".split("");

// Define entry directions for letters (outside viewport)
const entryDirections = [
  [-20, 5, 0],   // C from left
  [20, -8, 0],   // o from right
  [-15, -10, 0], // d from left bottom
  [18, 12, 0],   // e from right top
  [-20, 0, 0],   // W from left
  [20, 5, 0],    // i from right
  [-18, -5, 0],  // t from left
  [15, 10, 0],   // h from right top
  [-12, 8, 0],   // G from left top
  [20, -5, 0],   // w from right
  [-15, -8, 0]   // y from left bottom
];

// Define burst directions for each letter
const burstDirections = [
  [-15, 10, 5],   // C burst direction
  [12, -15, 5],   // o burst direction
  [-10, -12, 5],  // d burst direction
  [15, 10, 5],    // e burst direction
  [-12, 5, 5],    // W burst direction
  [10, 8, 5],     // i burst direction
  [-8, -10, 5],   // t burst direction
  [12, 15, 5],    // h burst direction
  [-15, 12, 5],   // G burst direction
  [10, -8, 5],    // w burst direction
  [-10, -15, 5]   // y burst direction
];

interface FlashEffectProps {
  isFlashing: boolean;
}

function FlashEffect({ isFlashing }: FlashEffectProps) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const raysRef = useRef<THREE.Group>(null);
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    if (isFlashing) {
      setOpacity(1);
    }
  }, [isFlashing]);
  
  useFrame(() => {
    if (isFlashing) {
      if (opacity > 0) {
        setOpacity(opacity - 0.03);
      }
      
      // Outer sphere expands rapidly
      if (outerRef.current) {
        outerRef.current.scale.x += 0.3;
        outerRef.current.scale.y += 0.3;
        outerRef.current.scale.z += 0.3;
        outerRef.current.rotation.y += 0.01;
        outerRef.current.rotation.z += 0.01;
      }
      
      // Inner sphere expands at different rate
      if (innerRef.current) {
        innerRef.current.scale.x += 0.25;
        innerRef.current.scale.y += 0.25;
        innerRef.current.scale.z += 0.25;
        innerRef.current.rotation.x -= 0.02;
        innerRef.current.rotation.z -= 0.02;
      }
      
      // Light rays rotate
      if (raysRef.current) {
        raysRef.current.rotation.x += 0.05;
        raysRef.current.rotation.y += 0.07;
        raysRef.current.rotation.z += 0.03;
      }
    }
  });
  
  if (!isFlashing) return null;
  
  return (
    <group>
      {/* Outer sphere */}
      <mesh ref={outerRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color="#ec4899" 
          emissive="#ec4899"
          emissiveIntensity={3}
          transparent={true}
          opacity={opacity * 0.7}
          wireframe={true}
        />
      </mesh>
      
      {/* Inner sphere */}
      <mesh ref={innerRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshStandardMaterial 
          color="#ff9dce" 
          emissive="#ff9dce"
          emissiveIntensity={4}
          transparent={true}
          opacity={opacity}
        />
      </mesh>
      
      {/* Light rays */}
      <group ref={raysRef}>
        {[...Array(8)].map((_, i) => (
          <mesh 
            key={i} 
            position={[0, 0, 0]} 
            rotation={[
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2
            ]}
          >
            <boxGeometry args={[0.2, 0.2, 10]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#ffffff"
              emissiveIntensity={5}
              transparent={true}
              opacity={opacity * 0.6}
            />
          </mesh>
        ))}
      </group>
      
      {/* Add point light for extra glow */}
      <pointLight 
        color="#ec4899" 
        intensity={50 * opacity} 
        distance={20} 
        decay={2} 
      />
    </group>
  );
}

interface LetterProps {
  letter: string;
  index: number;
  isAssembling: boolean;
  isBursting: boolean;
  isGlitching: boolean;
}

function Letter({ letter, index, isAssembling, isBursting, isGlitching }: LetterProps) {
  const ref = useRef<THREE.Mesh>(null);
  const startPosition = useRef(entryDirections[index]);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  // Calculate proper horizontal position based on letter widths
  let xOffset = -2.5; // Start position (centered)
  for (let i = 0; i < index; i++) {
    xOffset += letterWidths[letters[i]] || 0.4;
  }
  
  const finalPosition = [xOffset, 0, 0];
  const burstPosition = burstDirections[index];
  const [bounced, setBounced] = useState(false);
  const [inFinalPosition, setInFinalPosition] = useState(false);
  const [midPosition] = useState([
    finalPosition[0] + (Math.random() - 0.5) * 3,
    finalPosition[1] + (Math.random() - 0.5) * 3,
    finalPosition[2]
  ]);
  
  // For glitch effect
  const glitchTimer = useRef(0);
  const originalColor = "#ec4899";
  const glitchColor = "#00ffff";
  
  useFrame((state) => {
    if (!ref.current || !materialRef.current) return;
    
    if (isBursting) {
      // Burst animation - fly away quickly
      ref.current.position.x += burstPosition[0] * 0.05;
      ref.current.position.y += burstPosition[1] * 0.05;
      ref.current.position.z += burstPosition[2] * 0.05;
      
      // Add rotation for more dynamic effect
      ref.current.rotation.x += 0.1;
      ref.current.rotation.y += 0.15;
      ref.current.rotation.z += 0.12;
      
      // Scale down as they fly away
      ref.current.scale.x = Math.max(0, ref.current.scale.x - 0.03);
      ref.current.scale.y = Math.max(0, ref.current.scale.y - 0.03);
      ref.current.scale.z = Math.max(0, ref.current.scale.z - 0.03);
    } else if (isAssembling) {
      if (!bounced) {
        // First bounce to a random mid-position
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, midPosition[0], 0.05);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, midPosition[1], 0.05);
        ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, midPosition[2], 0.05);
        
        // Check if we're close enough to the mid position
        const dist = Math.sqrt(
          Math.pow(ref.current.position.x - midPosition[0], 2) +
          Math.pow(ref.current.position.y - midPosition[1], 2)
        );
        
        if (dist < 0.1) {
          setBounced(true);
        }
      } else {
        // Then bounce to final position
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, finalPosition[0], 0.1);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, finalPosition[1], 0.1);
        ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, finalPosition[2], 0.1);
        
        // Check if we're close enough to the final position
        const dist = Math.sqrt(
          Math.pow(ref.current.position.x - finalPosition[0], 2) +
          Math.pow(ref.current.position.y - finalPosition[1], 2)
        );
        
        if (dist < 0.05 && !inFinalPosition) {
          setInFinalPosition(true);
        }
      }
      
      // Apply glitch effect when in final position and glitching is enabled
      if (inFinalPosition && isGlitching) {
        glitchTimer.current += state.clock.getDelta();
        
        // Random glitch effects
        if (Math.random() > 0.7) {
          // Random position jitter
          ref.current.position.x = finalPosition[0] + (Math.random() - 0.5) * 0.05;
          ref.current.position.y = finalPosition[1] + (Math.random() - 0.5) * 0.05;
          
          // Random color flicker
          materialRef.current.color.set(Math.random() > 0.5 ? originalColor : glitchColor);
          materialRef.current.emissive.set(Math.random() > 0.5 ? originalColor : glitchColor);
          materialRef.current.emissiveIntensity = Math.random() * 0.5 + 0.5;
        } else {
          // Return to original position and color
          ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, finalPosition[0], 0.2);
          ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, finalPosition[1], 0.2);
          materialRef.current.color.set(originalColor);
          materialRef.current.emissive.set(originalColor);
          materialRef.current.emissiveIntensity = 0.5;
        }
      }
    }
  });

  return (
    <mesh
      ref={ref}
      position={new THREE.Vector3(startPosition.current[0], startPosition.current[1], startPosition.current[2])}
    >
      <Text3D
        font="/fonts/Roboto_Bold.json"
        size={0.5}
        height={0.2}
        curveSegments={12}
      >
        {letter}
        <meshStandardMaterial 
          ref={materialRef}
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </mesh>
  );
}

interface ScatteringTextProps {
  isBursting: boolean;
}

function ScatteringText({ isBursting }: ScatteringTextProps) {
  const [isAssembling, setIsAssembling] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    // Start assembly animation immediately
    const timer = setTimeout(() => {
      setIsAssembling(true);
    }, 300);
    
    // Start glitching effect after letters have had time to assemble
    const glitchTimer = setTimeout(() => {
      setIsGlitching(true);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(glitchTimer);
    };
  }, []);
  
  return (
    <>
      {letters.map((letter, index) => (
        <Letter 
          key={index} 
          letter={letter} 
          index={index} 
          isAssembling={isAssembling}
          isBursting={isBursting}
          isGlitching={isGlitching}
        />
      ))}
    </>
  );
}

function Background() {
  return (
    <mesh>
      <boxGeometry args={[100, 100, 100]} />
      <meshStandardMaterial color="black" side={THREE.BackSide} />
    </mesh>
  );
}

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isBursting, setIsBursting] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [showingFlash, setShowingFlash] = useState(false);

  useEffect(() => {
    // Set up progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => {
        // Increment progress
        const newProgress = Math.min(prev + 3, 100);
        
        // If we just reached 100%, wait a moment then start the burst
        if (newProgress === 100 && prev !== 100) {
          setTimeout(() => {
            setShowingFlash(true);
            setIsBursting(true);
            setIsFlashing(true);
            
            // End loading after a shorter burst animation
            setTimeout(() => {
              // Signal to main content that loading is complete
              localStorage.setItem('loadingComplete', 'true');
              // Dispatch storage event for other components to detect
              window.dispatchEvent(new Event('storage'));
              setLoading(false);
            }, 600);
          }, 500); // Wait 500ms after reaching 100% before starting burst
        }
        
        return newProgress;
      });
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div className="relative h-screen w-full">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Background />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <ScatteringText isBursting={isBursting} />
          {showingFlash && <FlashEffect isFlashing={isFlashing} />}
          <Environment preset="city" />
        </Canvas>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showingFlash ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-2 w-48 overflow-hidden rounded-full bg-primary/20">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-center text-sm text-primary">
          Loading... {progress}%
        </div>
      </motion.div>
    </motion.div>
  );
}