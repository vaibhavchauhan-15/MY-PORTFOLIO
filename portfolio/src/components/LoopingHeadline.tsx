'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoopingHeadlineProps {
  titles: string[];
  typingSpeed?: number; // ms per character
  deletingSpeed?: number; // ms per character
  pauseDuration?: number; // ms to wait between phrases
  className?: string;
}

const LoopingHeadline: React.FC<LoopingHeadlineProps> = ({
  titles,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1000,
  className = ''
}) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentTitle = titles[currentTitleIndex];
    
    // If currently deleting text
    if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false);
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        timeout = setTimeout(() => {}, pauseDuration);
      } else {
        // Delete one character
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      }
    } 
    // If currently typing text
    else {
      if (currentText === currentTitle) {
        // Pause before starting to delete
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else {
        // Type one character
        timeout = setTimeout(() => {
          setCurrentText(currentTitle.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    // Blink cursor animation
    const cursorInterval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 500);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [currentText, currentTitleIndex, isDeleting, titles, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <motion.span
        animate={{ opacity: isBlinking ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="ml-1 border-r-4 h-7 border-primary dark:border-accent1"
      />
    </div>
  );
};

export default LoopingHeadline; 