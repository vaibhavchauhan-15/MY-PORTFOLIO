'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Helper to generate random numbers within a range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Types for neural network
type NetworkNode = {
  x: number;
  y: number;
  id: string;
};

type Connection = {
  id: string;
  source: NetworkNode;
  target: NetworkNode;
  strength: number;
};

// Neural Network Animation Component
export const NeuralNetworkAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<{ x: number; y: number; radius: number; layer: number }[]>([]);
  const [connections, setConnections] = useState<{ start: number; end: number }[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    
    const handleResize = debounce(() => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    }, 200);
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted]);
  
  useEffect(() => {
    if (!isMounted || dimensions.width === 0) return;
    
    // Optimize for screen size
    const layerCount = dimensions.width < 768 ? 3 : 4;
    const nodesPerLayer = dimensions.width < 768 ? [3, 4, 2] : [4, 6, 5, 3];
    
    const newNodes: { x: number; y: number; radius: number; layer: number }[] = [];
    
    // Generate nodes
    for (let layer = 0; layer < layerCount; layer++) {
      const layerWidth = dimensions.width / (layerCount + 1);
      const x = layerWidth * (layer + 1);
      
      for (let i = 0; i < nodesPerLayer[layer]; i++) {
        const segmentHeight = dimensions.height / (nodesPerLayer[layer] + 1);
        const y = segmentHeight * (i + 1);
        const radius = Math.random() * 2 + 3; // Smaller nodes for better performance
        
        newNodes.push({ x, y, radius, layer });
      }
    }
    
    setNodes(newNodes);
    
    // Generate connections (with fewer connections for better performance)
    const newConnections: { start: number; end: number }[] = [];
    
    for (let i = 0; i < newNodes.length; i++) {
      const currentNode = newNodes[i];
      
      if (currentNode.layer < layerCount - 1) {
        // Connect to max 2-3 nodes in the next layer for performance
        const nextLayerNodes = newNodes.filter(node => node.layer === currentNode.layer + 1);
        
        // Randomly connect to 70% of nodes in the next layer
        for (let j = 0; j < nextLayerNodes.length; j++) {
          if (Math.random() < 0.7) {
            const endNodeIndex = newNodes.findIndex(node => 
              node.x === nextLayerNodes[j].x && node.y === nextLayerNodes[j].y
            );
            
            if (endNodeIndex !== -1) {
              newConnections.push({ start: i, end: endNodeIndex });
            }
          }
        }
      }
    }
    
    setConnections(newConnections);
  }, [dimensions, isMounted]);
  
  // Function to debounce the resize event
  function debounce(func: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.05 }}
      transition={{ duration: 1.5 }}
    >
      <svg width="100%" height="100%">
        {/* Draw connections */}
        {connections.map((connection, index) => {
          const startNode = nodes[connection.start];
          const endNode = nodes[connection.end];
          
          return (
            <motion.line
              key={`connection-${index}`}
              x1={startNode?.x}
              y1={startNode?.y}
              x2={endNode?.x}
              y2={endNode?.y}
              stroke="#8b5cf6"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0.1],
                pathLength: [0, 1]
              }}
              transition={{ 
                duration: 3, 
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          );
        })}
        
        {/* Draw nodes */}
        {nodes.map((node, index) => (
          <motion.circle
            key={`node-${index}`}
            cx={node.x}
            cy={node.y}
            r={node.radius}
            fill="#8b5cf6"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              r: [node.radius, node.radius * 1.3, node.radius]
            }}
            transition={{ 
              duration: Math.random() * 2 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

// Types for data scatter plot
type DataPoint = {
  id: number;
  x: number;
  y: number;
  size: number;
  category: number;
};

// Data Scatter Plot Animation Component
export const DataScatterPlotAnimation: React.FC = () => {
  const pointCount = 60;
  
  const points = useMemo<DataPoint[]>(() => {
    return Array.from({ length: pointCount }).map((_, i) => ({
      id: i,
      x: random(10, 90),
      y: random(10, 90),
      size: random(4, 10),
      category: Math.floor(random(0, 3))
    }));
  }, []);

  const categories = ['#3B82F6', '#8B5CF6', '#F472B6'];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Background grid */}
        {Array.from({ length: 10 }).map((_, i) => (
          <React.Fragment key={`grid-${i}`}>
            <line 
              x1="0%" 
              y1={`${i * 10}%`} 
              x2="100%" 
              y2={`${i * 10}%`} 
              stroke="rgba(255,255,255,0.1)" 
              strokeDasharray="5,5"
            />
            <line 
              x1={`${i * 10}%`} 
              y1="0%" 
              x2={`${i * 10}%`} 
              y2="100%" 
              stroke="rgba(255,255,255,0.1)" 
              strokeDasharray="5,5"
            />
          </React.Fragment>
        ))}
        
        {/* Axes */}
        <line x1="10%" y1="90%" x2="90%" y2="90%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <line x1="10%" y1="10%" x2="10%" y2="90%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        
        {/* Data points */}
        {points.map(point => (
          <motion.circle
            key={point.id}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r={point.size}
            fill={categories[point.category]}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1,
              opacity: 0.8,
              y: [0, -10, 0].map(y => `${point.y + y}%`),
              x: [0, point.category === 1 ? 5 : -5, 0].map(x => `${point.x + x}%`),
            }}
            transition={{ 
              scale: { duration: 0.5, delay: point.id * 0.01 },
              opacity: { duration: 0.5, delay: point.id * 0.01 },
              y: { 
                repeat: Infinity, 
                duration: 3 + Math.random() * 2,
                repeatType: "reverse"
              },
              x: { 
                repeat: Infinity, 
                duration: 5 + Math.random() * 3,
                repeatType: "reverse",
                delay: Math.random()
              }
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Types for algorithmic flowchart
type FlowchartStep = {
  id: string;
  x: number;
  y: number;
  type: 'terminal' | 'process' | 'decision';
  text: string;
};

type FlowchartConnection = {
  id: string;
  from: string;
  to: string;
  label?: string;
};

// Algorithmic Flowchart Animation Component
export const AlgorithmicFlowchartAnimation: React.FC = () => {
  const steps = useMemo<FlowchartStep[]>(() => [
    { id: 'input', x: 50, y: 10, type: 'terminal', text: 'Input' },
    { id: 'process1', x: 50, y: 25, type: 'process', text: 'Clean Data' },
    { id: 'process2', x: 50, y: 40, type: 'process', text: 'Feature Extraction' },
    { id: 'decision', x: 50, y: 55, type: 'decision', text: 'Valid?' },
    { id: 'process3', x: 30, y: 70, type: 'process', text: 'Normalize' },
    { id: 'process4', x: 70, y: 70, type: 'process', text: 'Transform' },
    { id: 'output', x: 50, y: 85, type: 'terminal', text: 'Output' },
  ], []);
  
  const connections = useMemo<FlowchartConnection[]>(() => [
    { id: 'c1', from: 'input', to: 'process1' },
    { id: 'c2', from: 'process1', to: 'process2' },
    { id: 'c3', from: 'process2', to: 'decision' },
    { id: 'c4', from: 'decision', to: 'process3', label: 'No' },
    { id: 'c5', from: 'decision', to: 'process4', label: 'Yes' },
    { id: 'c6', from: 'process3', to: 'output' },
    { id: 'c7', from: 'process4', to: 'output' },
  ], []);
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Connections between nodes */}
        {connections.map(connection => {
          const fromStep = steps.find(s => s.id === connection.from);
          const toStep = steps.find(s => s.id === connection.to);
          
          if (!fromStep || !toStep) return null;
          
          // Calculate connection path
          let path = '';
          
          if (connection.id === 'c4') {
            // Decision No branch (left)
            path = `M ${fromStep.x}% ${fromStep.y + 5}% L ${fromStep.x}% ${(fromStep.y + toStep.y) / 2}% L ${toStep.x}% ${(fromStep.y + toStep.y) / 2}% L ${toStep.x}% ${toStep.y}%`;
          } else if (connection.id === 'c5') {
            // Decision Yes branch (right)
            path = `M ${fromStep.x + 5}% ${fromStep.y}% L ${toStep.x}% ${(fromStep.y + toStep.y) / 2}% L ${toStep.x}% ${toStep.y}%`;
          } else if (connection.id === 'c6' || connection.id === 'c7') {
            // Connect back to output
            path = `M ${fromStep.x}% ${fromStep.y + 5}% L ${fromStep.x}% ${(fromStep.y + toStep.y) / 2}% L ${toStep.x}% ${(fromStep.y + toStep.y) / 2}% L ${toStep.x}% ${toStep.y}%`;
          } else {
            // Simple vertical connection
            path = `M ${fromStep.x}% ${fromStep.y + 5}% L ${fromStep.x}% ${toStep.y - 5}%`;
          }

          return (
            <motion.path
              key={connection.id}
              d={path}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.7,
                strokeWidth: [1.5, 2, 1.5]
              }}
              transition={{ 
                pathLength: { duration: 1.5, delay: 0.2 },
                opacity: { duration: 0.5 },
                strokeWidth: { 
                  repeat: Infinity, 
                  duration: 2,
                  repeatType: "reverse"
                }
              }}
            />
          );
        })}
        
        {/* Connection labels */}
        {connections.filter(c => c.label).map(connection => {
          const fromStep = steps.find(s => s.id === connection.from);
          const toStep = steps.find(s => s.id === connection.to);
          
          if (!fromStep || !toStep || !connection.label) return null;
          
          let x, y;
          
          if (connection.id === 'c4') {
            // No label
            x = fromStep.x - 8;
            y = (fromStep.y + toStep.y) / 2 - 2;
          } else if (connection.id === 'c5') {
            // Yes label
            x = fromStep.x + 8;
            y = (fromStep.y + toStep.y) / 2 - 2;
          } else {
            return null;
          }
          
          return (
            <motion.text
              key={`${connection.id}-label`}
              x={`${x}%`}
              y={`${y}%`}
              fontFamily="monospace"
              fontSize="10"
              fill="#8B5CF6"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {connection.label}
            </motion.text>
          );
        })}
        
        {/* Steps */}
        {steps.map(step => {
          let shape;
          
          if (step.type === 'terminal') {
            shape = (
              <motion.rect
                x={`${step.x - 10}%`}
                y={`${step.y - 5}%`}
                width="20%"
                height="10%"
                rx="5%"
                fill="rgba(59, 130, 246, 0.3)"
                stroke="#3B82F6"
                strokeWidth="1.5"
              />
            );
          } else if (step.type === 'process') {
            shape = (
              <motion.rect
                x={`${step.x - 10}%`}
                y={`${step.y - 5}%`}
                width="20%"
                height="10%"
                fill="rgba(139, 92, 246, 0.3)"
                stroke="#8B5CF6"
                strokeWidth="1.5"
              />
            );
          } else if (step.type === 'decision') {
            shape = (
              <motion.polygon
                points={`${step.x}% ${step.y - 5}%, ${step.x + 10}% ${step.y}%, ${step.x}% ${step.y + 5}%, ${step.x - 10}% ${step.y}%`}
                fill="rgba(244, 114, 182, 0.3)"
                stroke="#F472B6"
                strokeWidth="1.5"
              />
            );
          }
          
          return (
            <motion.g
              key={step.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { 
                  repeat: Infinity, 
                  duration: 3,
                  repeatType: "reverse"
                }
              }}
            >
              {shape}
              <motion.text
                x={`${step.x}%`}
                y={`${step.y}%`}
                fontFamily="monospace"
                fontSize="8"
                fill="#ffffff"
                textAnchor="middle"
                dominantBaseline="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {step.text}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

// Types for matrix animation
type MatrixCell = {
  value: number;
  delay: number;
  duration: number;
};

// Matrix Animation Component
export const MatrixAnimation: React.FC = () => {
  const gridSize = 16;
  const [matrix, setMatrix] = useState<MatrixCell[][]>([]);
  const [isClient, setIsClient] = useState(false);
  
  // Initialize matrix only on client-side to avoid hydration errors
  useEffect(() => {
    setIsClient(true);
    setMatrix(Array.from({ length: gridSize }).map(() => 
      Array.from({ length: gridSize }).map(() => ({
        value: Math.random() > 0.5 ? 1 : 0,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3
      }))
    ));
  }, [gridSize]);

  // Don't render anything on server to avoid hydration mismatch
  if (!isClient) {
    return <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none"></div>;
  }

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}>
        {matrix.map((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              className="flex items-center justify-center font-mono text-xs sm:text-sm"
              style={{ color: cell.value ? '#3B82F6' : '#8B5CF6' }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.8, 0.1],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{ 
                opacity: { 
                  repeat: Infinity, 
                  duration: cell.duration,
                  delay: cell.delay,
                  repeatType: "reverse"
                },
                scale: {
                  repeat: Infinity,
                  duration: cell.duration * 0.8,
                  delay: cell.delay,
                  repeatType: "reverse"
                }
              }}
            >
              {cell.value}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

// Binary Code Animation Component
export const CodeAnimation: React.FC = () => {
  const lines = 15;
  const charPerLine = 20;
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      <div className="absolute inset-0 flex flex-col font-mono text-xs opacity-50">
        {Array.from({ length: lines }).map((_, lineIndex) => (
          <motion.div
            key={lineIndex}
            className="flex whitespace-nowrap overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              x: 0
            }}
            transition={{ 
              opacity: { 
                repeat: Infinity, 
                duration: 3 + Math.random() * 2,
                delay: lineIndex * 0.2,
                repeatType: "reverse"
              },
              x: { 
                duration: 0.5,
                delay: lineIndex * 0.1
              }
            }}
          >
            {Array.from({ length: charPerLine }).map((_, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block mx-1"
                style={{ color: Math.random() > 0.7 ? '#3B82F6' : '#8B5CF6' }}
                animate={{ 
                  opacity: Math.random() > 0.8 ? [1, 0, 1] : 1,
                  scale: Math.random() > 0.8 ? [1, 1.2, 1] : 1
                }}
                transition={{ 
                  opacity: { 
                    repeat: Infinity, 
                    duration: 0.3,
                    repeatType: "reverse"
                  },
                  scale: {
                    repeat: Infinity,
                    duration: 0.2,
                    repeatType: "reverse"
                  }
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main component that exports all visualizations
const DataVisualization: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <NeuralNetworkAnimation />
    </div>
  );
};

export default DataVisualization; 