'use client';

import { useState, useEffect } from 'react';

export function MainContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Listen for storage event to sync with loading screen
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'loadingComplete' && e.newValue === 'true') {
        setIsLoading(false);
        setIsVisible(true);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Fallback timer in case storage event doesn't work
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 5500);
    
    // Check if loading is already complete (for page refreshes)
    if (localStorage.getItem('loadingComplete') === 'true') {
      setIsLoading(false);
      setIsVisible(true);
    }
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(timer);
    };
  }, []);
  
  if (isLoading) return null;
  
  return (
    <div 
      className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  );
}