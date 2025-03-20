'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speed: number;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  type: 'circle' | 'square' | 'triangle';
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  delay: number;
}

interface AnimatedGridProps {
  columns?: number;
  rows?: number;
  cellSize?: number;
  lineColor?: string;
  animationDuration?: number;
  perspective?: number;
}

export const ParticleBackground: React.FC<{
  particleCount?: number;
  maxDepth?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  className?: string;
}> = ({
  particleCount = 50,
  maxDepth = 100,
  colors = ['#2563eb', '#8b5cf6', '#ec4899'],
  minSize = 2,
  maxSize = 5,
  minSpeed = 0.05,
  maxSpeed = 0.2,
  className = '',
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  useEffect(() => {
    setIsClient(true);
    
    // Initialize particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * maxDepth,
        size: minSize + Math.random() * (maxSize - minSize),
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
      });
    }
    setParticles(initialParticles);
    
    // Animation loop
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        setParticles(prevParticles => {
          return prevParticles.map(particle => {
            // Move particle along z-axis
            let newZ = particle.z - particle.speed;
            
            // Reset particle if it goes beyond screen
            if (newZ <= 0) {
              return {
                ...particle,
                x: Math.random() * 100,
                y: Math.random() * 100,
                z: maxDepth,
                size: minSize + Math.random() * (maxSize - minSize),
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
              };
            }
            
            return {
              ...particle,
              z: newZ,
            };
          });
        });
      }
      
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [particleCount, maxDepth, colors, minSize, maxSize, minSpeed, maxSpeed]);
  
  if (!isClient) {
    // Return placeholder during server-side rendering
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />;
  }
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => {
        // Calculate scale based on z position (perspective)
        const scale = 1 - (particle.z / maxDepth) * 0.8;
        const opacity = 1 - (particle.z / maxDepth) * 0.7;
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: opacity,
              transform: `scale(${scale})`,
            }}
            initial={false}
          />
        );
      })}
    </div>
  );
};

export const FloatingShapes: React.FC<{
  shapeCount?: number;
  className?: string;
}> = ({ shapeCount = 12, className = '' }) => {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // Colors for shapes
    const colors = [
      'rgba(37, 99, 235, 0.2)', // Primary blue
      'rgba(139, 92, 246, 0.2)', // Purple
      'rgba(244, 114, 182, 0.2)', // Pink
      'rgba(34, 211, 238, 0.2)', // Cyan
    ];
    
    // Initialize shapes
    const initialShapes: FloatingShape[] = [];
    for (let i = 0; i < shapeCount; i++) {
      initialShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
        size: 20 + Math.random() * 60,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.1 + Math.random() * 0.3,
        delay: Math.random() * 5,
      });
    }
    setShapes(initialShapes);
  }, [shapeCount]);
  
  if (!isClient) {
    // Return placeholder during server-side rendering
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />;
  }
  
  const renderShape = (shape: FloatingShape) => {
    if (shape.type === 'circle') {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: shape.color,
            opacity: shape.opacity,
          }}
        />
      );
    } else if (shape.type === 'square') {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: shape.color,
            opacity: shape.opacity,
          }}
        />
      );
    } else if (shape.type === 'triangle') {
      return (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${shape.size / 2}px solid transparent`,
            borderRight: `${shape.size / 2}px solid transparent`,
            borderBottom: `${shape.size}px solid ${shape.color}`,
            opacity: shape.opacity,
          }}
        />
      );
    }
    return null;
  };
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape) => {
        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              width: shape.type === 'triangle' ? 0 : `${shape.size}px`,
              height: shape.type === 'triangle' ? 0 : `${shape.size}px`,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
            }}
            initial={{ opacity: 0, rotate: shape.rotation }}
            animate={{
              opacity: shape.opacity,
              y: [0, -20, 0],
              rotate: [shape.rotation, shape.rotation + (shape.rotationSpeed * 20), shape.rotation],
            }}
            transition={{
              duration: 12,
              delay: shape.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            {renderShape(shape)}
          </motion.div>
        );
      })}
    </div>
  );
};

export const GradientOrbs: React.FC<{
  orbCount?: number;
  className?: string;
}> = ({ orbCount = 3, className = '' }) => {
  const [orbs, setOrbs] = useState<Array<{
    id: number;
    size: number;
    posX: number;
    posY: number;
    gradient: string;
    duration: number;
    delay: number;
  }>>([]);
  const [isClient, setIsClient] = useState(false);
  
  // Initialize orbs on client-side only to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    
    const gradients = [
      'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0) 70%)',
      'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)',
      'radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, rgba(244, 114, 182, 0) 70%)',
      'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0) 70%)',
    ];
    
    const initialOrbs = [];
    for (let i = 0; i < orbCount; i++) {
      initialOrbs.push({
        id: i,
        size: 40 + Math.random() * 60, // Size between 40-100% of viewport
        posX: Math.random() * 100,
        posY: Math.random() * 100,
        gradient: gradients[i % gradients.length],
        duration: 10 + Math.random() * 5,
        delay: Math.random() * 5,
      });
    }
    
    setOrbs(initialOrbs);
  }, [orbCount]);
  
  if (!isClient) {
    // Return placeholder with fixed positioning to avoid hydration mismatch
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />
    );
  }
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute blur-2xl"
          style={{
            width: `${orb.size}%`,
            height: `${orb.size}%`,
            background: orb.gradient,
            left: `${orb.posX}%`,
            top: `${orb.posY}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedGrid: React.FC<AnimatedGridProps & {
  className?: string;
}> = ({
  columns = 20,
  rows = 20,
  cellSize = 40,
  lineColor = 'rgba(255, 255, 255, 0.05)',
  animationDuration = 15,
  perspective = 1000,
  className = '',
}) => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          rotateX: [0, 10, 0],
          rotateY: [0, 5, 0],
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Horizontal lines */}
        {[...Array(rows + 1)].map((_, index) => (
          <div
            key={`h-${index}`}
            className="absolute left-0 right-0"
            style={{
              height: '1px',
              backgroundColor: lineColor,
              top: `${index * cellSize}px`,
            }}
          />
        ))}
        
        {/* Vertical lines */}
        {[...Array(columns + 1)].map((_, index) => (
          <div
            key={`v-${index}`}
            className="absolute top-0 bottom-0"
            style={{
              width: '1px',
              backgroundColor: lineColor,
              left: `${index * cellSize}px`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export const CircuitPattern: React.FC<{
  className?: string;
  color?: string;
  density?: number;
}> = ({ className = '', color = 'rgba(37, 99, 235, 0.1)', density = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawCircuitPattern();
    };
    
    interface Node {
      x: number;
      y: number;
      connections: number;
    }
    
    function drawCircuitPattern() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      
      const nodeSize = 4;
      const nodePadding = 80 / density;
      const cols = Math.ceil(canvas.width / nodePadding);
      const rows = Math.ceil(canvas.height / nodePadding);
      
      // Create nodes grid
      const nodes: Node[] = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > 0.7) {
            nodes.push({
              x: i * nodePadding + (Math.random() * 20 - 10),
              y: j * nodePadding + (Math.random() * 20 - 10),
              connections: Math.floor(Math.random() * 3),
            });
          }
        }
      }
      
      // Draw connections
      nodes.forEach(node => {
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI);
        ctx!.fillStyle = color;
        ctx!.fill();
        
        // Find closest nodes to connect
        const sortedNodes = [...nodes]
          .filter(n => n !== node)
          .sort((a, b) => {
            const distA = Math.sqrt(Math.pow(a.x - node.x, 2) + Math.pow(a.y - node.y, 2));
            const distB = Math.sqrt(Math.pow(b.x - node.x, 2) + Math.pow(b.y - node.y, 2));
            return distA - distB;
          });
        
        // Connect to nearest nodes
        for (let i = 0; i < Math.min(node.connections, sortedNodes.length); i++) {
          const target = sortedNodes[i];
          
          // Only connect if within reasonable distance
          const distance = Math.sqrt(Math.pow(target.x - node.x, 2) + Math.pow(target.y - node.y, 2));
          if (distance < nodePadding * 2) {
            ctx!.beginPath();
            ctx!.moveTo(node.x, node.y);
            
            // Add some curve to the lines
            const midX = (node.x + target.x) / 2;
            const midY = (node.y + target.y) / 2;
            const offset = (Math.random() * 20 - 10) * (distance / 100);
            
            if (Math.random() > 0.5) {
              // Right angle connection
              if (Math.random() > 0.5) {
                ctx!.lineTo(node.x, target.y);
                ctx!.lineTo(target.x, target.y);
              } else {
                ctx!.lineTo(target.x, node.y);
                ctx!.lineTo(target.x, target.y);
              }
            } else {
              // Curved connection
              ctx!.quadraticCurveTo(midX + offset, midY + offset, target.x, target.y);
            }
            
            ctx!.stroke();
          }
        }
      });
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [color, density]);
  
  if (!isClient) {
    // Return placeholder during server-side rendering
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />;
  }
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

const ThreeDBackground: React.FC<{
  variant?: 'particles' | 'shapes' | 'grid' | 'orbs' | 'circuit' | 'combined';
  className?: string;
}> = ({ variant = 'combined', className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {(variant === 'particles' || variant === 'combined') && (
        <ParticleBackground particleCount={50} className="opacity-30" />
      )}
      
      {(variant === 'shapes' || variant === 'combined') && (
        <FloatingShapes shapeCount={8} className="opacity-20" />
      )}
      
      {(variant === 'grid' || variant === 'combined') && (
        <AnimatedGrid className="opacity-20" />
      )}
      
      {(variant === 'orbs' || variant === 'combined') && (
        <GradientOrbs orbCount={4} className="opacity-40" />
      )}
      
      {(variant === 'circuit' || variant === 'combined') && (
        <CircuitPattern className="opacity-30" />
      )}
    </div>
  );
};

export default ThreeDBackground; 