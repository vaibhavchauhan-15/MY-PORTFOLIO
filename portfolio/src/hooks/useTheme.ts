'use client';

import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Initialize theme on component mount
  useEffect(() => {
    // Check local storage
    const savedTheme = localStorage.getItem('theme');
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      
      // Update DOM
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Save preference
      localStorage.setItem('theme', newTheme);
      
      return newTheme;
    });
  };
  
  return { theme, toggleTheme };
};

export default useTheme; 