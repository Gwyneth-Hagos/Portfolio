'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypewriterEffect } from './typewriter-effect';

interface TerminalIntroProps {
  onComplete: () => void;
}

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [step, setStep] = useState(0);
  const lines = [
    '[System: CodeWithGwy]',
    'Status: ONLINE',
    'User Authenticated ✔️',
    'Launching interface...'
  ];

  useEffect(() => {
    // Skip intro if already seen in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      onComplete();
    }
  }, [onComplete]);

  const handleLineComplete = () => {
    if (step < lines.length - 1) {
      setStep(step + 1);
    } else {
      // Add a small delay after the last line before completing
      setTimeout(() => {
        sessionStorage.setItem('hasSeenIntro', 'true');
        onComplete();
      }, 800);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md p-4 font-mono text-primary">
        {lines.slice(0, step + 1).map((line, index) => (
          <div key={index} className="mb-2">
            {index === step ? (
              <TypewriterEffect 
                text={line} 
                delay={index === 0 ? 100 : 50}
                glitchIntensity={0.1}
                onComplete={index === step ? handleLineComplete : undefined}
              />
            ) : (
              <div className="flex">
                <span>{line}</span>
                {index === lines.length - 1 && <span className="ml-2 animate-pulse">■</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}