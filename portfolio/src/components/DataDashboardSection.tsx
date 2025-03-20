'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaDatabase, FaBrain, FaSearch } from 'react-icons/fa';
import { AICard, AISectionHeading } from '@/components/AIElements';
import { useScatterPlotData, useClusteredData, useTimeSeriesData, TimeSeriesDataPoint } from '@/hooks/useDataAnimation';

type MetricsState = {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
};

// Extract this into a separate component to avoid hooks inside loops
type TimeSeriesCategoryProps = {
  category: string;
  points: TimeSeriesDataPoint[];
  categoryIndex: number;
};

const TimeSeriesCategory: React.FC<TimeSeriesCategoryProps> = ({ category, points, categoryIndex }) => {
  const color = categoryIndex === 0 ? '#3B82F6' : '#F472B6';
  
  const sortedPoints = useMemo(() => {
    return [...points].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [points]);
  
  // Prepare paths
  const path = useMemo(() => {
    let pathString = '';
    sortedPoints.forEach((point, i) => {
      const x = (i / (sortedPoints.length - 1)) * 100;
      const y = 100 - (point.value / 100) * 100;
      if (i === 0) {
        pathString += `M ${x} ${y} `;
      } else {
        pathString += `L ${x} ${y} `;
      }
    });
    return pathString;
  }, [sortedPoints]);
  
  return (
    <React.Fragment>
      {/* Line */}
      <motion.svg 
        width="100%" 
        height="100%" 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: categoryIndex * 0.5 }}
      >
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: categoryIndex * 0.5 }}
        />
      </motion.svg>
      
      {/* Data points */}
      {sortedPoints.map((point, i) => {
        const x = (i / (sortedPoints.length - 1)) * 100;
        const y = 100 - (point.value / 100) * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              left: `${x}%`, 
              top: `${y}%`,
              backgroundColor: color,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2 + i * 0.1 }}
          />
        );
      })}
      
      {/* Legend item */}
      <div 
        className="absolute flex items-center"
        style={{ 
          right: categoryIndex === 0 ? '120px' : '10px',
          top: '10px'
        }}
      >
        <div 
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs text-gray-300">{category}</span>
      </div>
    </React.Fragment>
  );
};

// Extract cluster centers component
type ClusterCentersProps = {
  clusterData: ReturnType<typeof useClusteredData>;
};

const ClusterCenters: React.FC<ClusterCentersProps> = ({ clusterData }) => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => {
        const clusterPoints = clusterData.filter(p => p.category === i);
        if (clusterPoints.length === 0) return null;
        
        // Calculate cluster center
        const centerX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
        const centerY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
        
        // Different colors for each cluster
        const colors = ['#3B82F6', '#8B5CF6', '#F472B6'];
        const color = colors[i % colors.length];
        
        return (
          <React.Fragment key={`cluster-${i}`}>
            {/* Cluster highlight area */}
            <motion.div
              className="absolute rounded-full mix-blend-lighten"
              style={{
                left: `${centerX}%`,
                top: `${centerY}%`,
                backgroundColor: `${color}20`,
                border: `1px solid ${color}40`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ width: 0, height: 0 }}
              animate={{ 
                width: '40%', 
                height: '40%',
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
            
            {/* Cluster center */}
            <motion.div
              className="absolute z-10 rounded-full"
              style={{
                left: `${centerX}%`,
                top: `${centerY}%`,
                backgroundColor: color,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ width: 0, height: 0 }}
              animate={{ 
                width: '12px', 
                height: '12px',
                boxShadow: [
                  `0 0 0px ${color}80`,
                  `0 0 15px ${color}80`,
                  `0 0 0px ${color}80`
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

const DataDashboardSection: React.FC = () => {
  // Generate data for visualizations
  const scatterData = useScatterPlotData(50, 3, 8000);
  const clusterData = useClusteredData(3, 20);
  const timeSeriesData = useTimeSeriesData(14, ['Model Accuracy', 'Training Loss']);

  // Accuracy metrics for AI models (simulated)
  const [metrics, setMetrics] = useState<MetricsState>({
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1Score: 0
  });

  // Format percentage numbers - memoized to prevent rerendering
  const formatPercent = useMemo(() => {
    return (value: number) => `${(value * 100).toFixed(1)}%`;
  }, []);

  // Simulate real-time metrics updates
  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        accuracy: 0.85 + Math.random() * 0.1,
        precision: 0.82 + Math.random() * 0.1,
        recall: 0.78 + Math.random() * 0.12,
        f1Score: 0.80 + Math.random() * 0.11
      });
    };

    // Initial update
    updateMetrics();
    
    // Set interval for periodic updates
    const interval = setInterval(updateMetrics, 10000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Group time series data by category - memoized to prevent recalculation on each render
  const timeSeriesByCategory = useMemo(() => {
    return timeSeriesData.reduce((acc, point) => {
      if (!point.category) return acc;
      if (!acc[point.category]) acc[point.category] = [];
      acc[point.category].push(point);
      return acc;
    }, {} as Record<string, typeof timeSeriesData>);
  }, [timeSeriesData]);

  return (
    <section id="data-dashboard" className="section-container py-20 bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent1/5 rounded-full filter blur-[150px] animate-pulse-slow opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-accent2/5 to-accent3/5 rounded-full filter blur-[120px] animate-float opacity-30"></div>

      <AISectionHeading
        subtext="Visualizing machine learning model performance metrics and data patterns"
      >
        AI Performance Dashboard
      </AISectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Model metrics card */}
        <AICard className="col-span-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-data">
            Model Performance
          </h3>
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            <MetricCard 
              title="Accuracy" 
              value={metrics.accuracy} 
              formatFunc={formatPercent}
              icon={<FaChartLine className="mr-2 text-primary" />}
              colorClass="from-primary to-accent1"
            />
            
            <MetricCard 
              title="Precision" 
              value={metrics.precision} 
              formatFunc={formatPercent}
              icon={<FaBrain className="mr-2 text-accent1" />}
              colorClass="from-accent1 to-accent2"
            />
            
            <MetricCard 
              title="Recall" 
              value={metrics.recall} 
              formatFunc={formatPercent}
              icon={<FaSearch className="mr-2 text-accent2" />}
              colorClass="from-accent2 to-accent3"
            />
            
            <MetricCard 
              title="F1 Score" 
              value={metrics.f1Score} 
              formatFunc={formatPercent}
              icon={<FaDatabase className="mr-2 text-accent3" />}
              colorClass="from-accent3 to-primary"
            />
          </div>
        </AICard>

        {/* Time series visualization */}
        <AICard className="col-span-1 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-data">
            Training Metrics Over Time
          </h3>
          
          <div className="h-64 relative">
            <div className="absolute inset-0">
              {/* Y-axis */}
              <div className="absolute top-0 left-0 h-full w-12 flex flex-col justify-between items-end pr-2 text-xs text-gray-400">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
              
              {/* X-axis */}
              <div className="absolute bottom-0 left-12 right-0 h-6 flex justify-between items-start pl-2 text-xs text-gray-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>Day {Math.round(i * 14 / 4)}</span>
                ))}
              </div>
              
              {/* Grid lines */}
              <div className="absolute left-12 top-0 right-0 bottom-6 border-l border-b border-gray-700">
                {[0.25, 0.5, 0.75].map((pos) => (
                  <div 
                    key={pos}
                    className="absolute left-0 right-0 border-t border-gray-700/50"
                    style={{ top: `${pos * 100}%` }}
                  />
                ))}
              </div>
              
              {/* Chart area */}
              <div className="absolute left-12 top-0 right-0 bottom-6">
                {/* Draw each category as a line - using separate component */}
                {Object.entries(timeSeriesByCategory).map(([category, points], categoryIndex) => (
                  <TimeSeriesCategory 
                    key={category}
                    category={category}
                    points={points}
                    categoryIndex={categoryIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </AICard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scatter plot - Data distribution */}
        <AICard>
          <h3 className="text-xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-data">
            Data Distribution
          </h3>
          
          <div className="h-64 relative">
            <div className="absolute inset-2">
              {/* Scatter plot visualization */}
              <div className="relative h-full w-full border border-gray-700 bg-gray-800/50 rounded-lg overflow-hidden">
                {/* Scatter points */}
                {scatterData.map((point, i) => {
                  // Different colors based on category
                  const colors = ['#3B82F6', '#8B5CF6', '#F472B6'];
                  const color = colors[point.category || 0];
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        backgroundColor: color,
                        width: `${point.radius || 4}px`,
                        height: `${point.radius || 4}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.2, 1],
                        opacity: 1
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: i * 0.01,
                      }}
                    />
                  );
                })}
                
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="border-t border-gray-700/30" />
                  ))}
                </div>
                <div className="absolute inset-0 flex justify-between pointer-events-none">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="border-l border-gray-700/30" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AICard>

        {/* Cluster visualization - ML output */}
        <AICard>
          <h3 className="text-xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-data">
            Cluster Analysis
          </h3>
          
          <div className="h-64 relative">
            <div className="absolute inset-2">
              {/* Cluster visualization */}
              <div className="relative h-full w-full border border-gray-700 bg-gray-800/50 rounded-lg overflow-hidden">
                {/* Cluster centers - now using a separate component */}
                <ClusterCenters clusterData={clusterData} />
                
                {/* Data points */}
                {clusterData.map((point, i) => {
                  // Different colors based on category (cluster)
                  const colors = ['#3B82F6', '#8B5CF6', '#F472B6'];
                  const color = colors[point.category || 0];
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        backgroundColor: color,
                        width: `${point.radius || 4}px`,
                        height: `${point.radius || 4}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1,
                        opacity: 0.8
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: i * 0.02
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </AICard>
      </div>
    </section>
  );
};

// Extracted metric card component for better reusability
type MetricCardProps = {
  title: string;
  value: number;
  formatFunc: (value: number) => string;
  icon: React.ReactNode;
  colorClass: string;
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, formatFunc, icon, colorClass }) => {
  const [isClient, setIsClient] = useState(false);
  const [randomIncrease, setRandomIncrease] = useState("0.0");
  
  // Generate random values only on the client side to avoid hydration errors
  useEffect(() => {
    setIsClient(true);
    setRandomIncrease((Math.random() * 2).toFixed(1));
  }, []);
  
  return (
    <div className="p-4 bg-gray-800/50 rounded-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
      <div className="relative z-10">
        <div className="flex items-center mb-2">
          {icon}
          <span className="text-sm text-gray-300">{title}</span>
        </div>
        <div className="flex items-end">
          <span className="text-2xl font-bold text-primary">{formatFunc(value)}</span>
          {isClient && (
            <motion.span 
              className="ml-2 text-sm text-green-400"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              +{randomIncrease}%
            </motion.span>
          )}
        </div>
        <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full bg-gradient-to-r ${colorClass}`}
            animate={{ width: `${value * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default DataDashboardSection; 