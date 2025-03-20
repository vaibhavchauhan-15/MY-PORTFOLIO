'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useRef, useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  demoUrl,
  githubUrl,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  
  // Calculate card rotation based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (max 10 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Invert and reduce rotation amount
    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseEnter = () => {
    setScale(1.03);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-borderLight dark:border-borderDark relative group transform-gpu"
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: 'transform 0.2s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      
      {/* Glowing effect on hover */}
      <motion.div 
        className="absolute -inset-0.5 bg-gradient-to-r from-primary/25 to-accent1/25 rounded-xl opacity-0 group-hover:opacity-100 blur-sm"
        animate={{
          background: [
            'linear-gradient(to right, rgba(37, 99, 235, 0.25), rgba(139, 92, 246, 0.25))',
            'linear-gradient(to right, rgba(139, 92, 246, 0.25), rgba(244, 114, 182, 0.25))',
            'linear-gradient(to right, rgba(37, 99, 235, 0.25), rgba(139, 92, 246, 0.25))'
          ]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="relative z-10 h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6 relative z-10">
        <h3 className="heading-md mb-2 text-textDark dark:text-textLight group-hover:text-primary dark:group-hover:text-accent1 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        <div className="flex gap-4">
          <motion.a 
            href={demoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-primary hover:text-accent1 dark:text-accent1 dark:hover:text-accent2 font-medium transition-all duration-300"
            whileHover={{ scale: 1.05, x: 3 }}
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
          >
            <FaExternalLinkAlt /> View Demo
          </motion.a>
          <motion.a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-primary hover:text-accent1 dark:text-accent1 dark:hover:text-accent2 font-medium transition-all duration-300"
            whileHover={{ scale: 1.05, x: 3 }}
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
          >
            <FaGithub /> GitHub
          </motion.a>
        </div>
      </div>
      
      {/* 3D lighting effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at ${rotateY > 0 ? '70%' : '30%'} ${rotateX > 0 ? '70%' : '30%'}, rgba(255, 255, 255, 0.15), transparent)`,
          transform: 'translateZ(5px)'
        }}
      ></div>
    </motion.div>
  );
} 