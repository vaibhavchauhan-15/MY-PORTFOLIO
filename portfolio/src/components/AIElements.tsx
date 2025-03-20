'use client';

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaBrain, FaChartLine, FaDatabase, FaCode, FaNetworkWired } from 'react-icons/fa';

type AIBrainProps = {
  className?: string;
};

// AI Brain Component - Animated AI brain visualization
export const AIBrain: React.FC<AIBrainProps> = ({ className = '' }) => {
  // Precalculate node positions to avoid recalculations on each render
  const nodePositions = useMemo(() => {
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    const radius = 14;
    
    return angles.map((angle, index) => {
      const x = Math.cos(angle * Math.PI / 180) * radius;
      const y = Math.sin(angle * Math.PI / 180) * radius;
      
      return {
        x: `calc(50% + ${x}px - 1px)`,
        y: `calc(50% + ${y}px - 1px)`,
        delay: index * 0.2
      };
    });
  }, []);
  
  return (
    <div className={`relative ${className}`}>
      {/* Central brain node */}
      <motion.div 
        className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent1 flex items-center justify-center relative z-10 mx-auto"
        animate={{
          boxShadow: [
            '0 0 10px rgba(59, 130, 246, 0.5)',
            '0 0 25px rgba(59, 130, 246, 0.7)',
            '0 0 10px rgba(59, 130, 246, 0.5)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <FaBrain className="text-white text-2xl" />
      </motion.div>
      
      {/* Decorative circuit paths */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-28 h-28 -ml-14 -mt-14 rounded-full border-2 border-dashed border-primary/40 z-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Connection nodes */}
      {nodePositions.map((position, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 rounded-full bg-accent1"
          style={{
            left: position.x,
            top: position.y,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: position.delay
          }}
        />
      ))}
    </div>
  );
};

type AICardProps = {
  children: ReactNode;
  className?: string;
};

// AI Card Component - A card with AI-themed styling
export const AICard: React.FC<AICardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl backdrop-blur-sm overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Glowing border effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl opacity-40 pointer-events-none"
        style={{ zIndex: -1 }}
        animate={{
          boxShadow: [
            '0 0 0 2px rgba(59, 130, 246, 0.1), inset 0 0 0 1px rgba(59, 130, 246, 0.1)',
            '0 0 0 2px rgba(59, 130, 246, 0.3), inset 0 0 0 1px rgba(59, 130, 246, 0.3)',
            '0 0 0 2px rgba(59, 130, 246, 0.1), inset 0 0 0 1px rgba(59, 130, 246, 0.1)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5 z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

type AIButtonProps = {
  children: ReactNode;
  icon?: 'robot' | 'brain' | 'chart' | 'code';
  onClick?: () => void;
  className?: string;
};

// AI Button Component - A button with pulse effect and AI icons
export const AIButton: React.FC<AIButtonProps> = ({ children, onClick, icon = "brain", className = "" }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Determine which icon to use
  const iconMap: Record<string, JSX.Element> = {
    "brain": <FaBrain />,
    "robot": <FaRobot />,
    "chart": <FaChartLine />,
    "code": <FaCode />
  };
  
  const iconElement = iconMap[icon] || <FaBrain />;
  
  return (
    <motion.button
      className={`relative overflow-hidden group py-3 px-6 rounded-lg font-medium shadow-neural bg-gradient-to-br from-primary/90 to-accent1/90 text-white ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary to-accent1 opacity-80"
        animate={{
          background: isHovering 
            ? ["linear-gradient(to right, #2563eb, #8b5cf6)", "linear-gradient(to right, #8b5cf6, #2563eb)"] 
            : "linear-gradient(to right, #2563eb, #8b5cf6)"
        }}
        transition={{ duration: 2, repeat: isHovering ? Infinity : 0 }}
      />
      
      {/* Ripple effect on click */}
      {isPressed && (
        <motion.div
          className="absolute -inset-1 bg-white rounded-full"
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      )}
      
      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-10" />
      
      <div className="flex items-center justify-center space-x-2 relative z-10">
        <span className="text-lg">{iconElement}</span>
        <span>{children}</span>
      </div>
    </motion.button>
  );
};

type AISectionHeadingProps = {
  children: ReactNode;
  subtext?: string;
  className?: string;
};

// AI Section Heading Component - A section title with animated elements
export const AISectionHeading: React.FC<AISectionHeadingProps> = ({ children, subtext, className = '' }) => {
  return (
    <motion.div
      className={`relative z-10 mb-10 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center">
        {/* Decorative element */}
        <motion.div 
          className="w-10 h-1 bg-gradient-to-r from-primary to-accent1 rounded-full mb-3"
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        />
        
        <h2 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-data pb-2">
          {children}
        </h2>
        
        {subtext && (
          <motion.p
            className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {subtext}
          </motion.p>
        )}
        
        {/* Decorative underline */}
        <motion.div 
          className="w-20 h-1 bg-gradient-to-r from-accent1 to-primary rounded-full mt-3"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

type DataStatCardProps = {
  value: number;
  label: string;
  icon?: ReactNode;
  className?: string;
};

// Data Stat Card Component - Animated counter display for stats
export const DataStatCard: React.FC<DataStatCardProps> = ({ value, label, icon, className = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Optimize the counter animation with request animation frame
    if (count === value) return;
    
    const duration = 1000; // Animation duration in milliseconds
    const frameDuration = 1000 / 60; // Approx. 60 FPS
    const totalFrames = Math.round(duration / frameDuration);
    const countIncrement = value / totalFrames;
    
    let currentFrame = 0;
    let currentCount = 0;
    let animationFrameId: number | null = null;
    
    const updateCount = () => {
      currentFrame++;
      currentCount = Math.min(Math.round(countIncrement * currentFrame), value);
      setCount(currentCount);
      
      if (currentCount < value) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateCount);
    
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value]); // Remove 'count' from dependencies to prevent infinite loop
  
  return (
    <motion.div
      className={`relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5 rounded-lg" />
      
      <div className="flex flex-col items-center relative z-10">
        {icon && (
          <div className="mb-2">
            {icon}
          </div>
        )}
        <motion.span 
          className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent1 mb-1"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {count}
        </motion.span>
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium text-center">
          {label}
        </span>
      </div>
    </motion.div>
  );
};

export default {
  AIBrain,
  AICard,
  AIButton,
  AISectionHeading,
  DataStatCard
}; 