import { useState, useEffect, useRef, useCallback } from 'react';

export type DataPoint = {
  x: number;
  y: number;
  category?: number;
  radius?: number;
  color?: string;
};

export type TimeSeriesDataPoint = {
  value: number;
  timestamp: string;
  category?: string;
};

/**
 * Custom hook to generate scatter plot data points
 * @param count Number of data points to generate
 * @param categories Number of categories (for color grouping)
 * @param updateInterval How often the data should update (in ms)
 * @param shouldAnimate Whether the data should animate
 * @returns Array of data points
 */
export const useScatterPlotData = (
  count: number = 50,
  categories: number = 3,
  updateInterval: number = 5000,
  shouldAnimate: boolean = true
): DataPoint[] => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  
  // Create a reusable function to generate random data points
  const createRandomDataPoint = useCallback((id: number): DataPoint => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      category: Math.floor(Math.random() * categories),
      radius: 3 + Math.random() * 5
    };
  }, [categories]);
  
  // Generate data function, memoized with useCallback
  const generateData = useCallback((partialUpdate: boolean = false) => {
    if (partialUpdate) {
      // Update ~20% of the points for smoother animation
      setDataPoints(prevPoints => {
        const newPoints = [...prevPoints];
        const pointsToUpdate = Math.max(1, Math.floor(count * 0.2));
        
        for (let i = 0; i < pointsToUpdate; i++) {
          const idx = Math.floor(Math.random() * count);
          newPoints[idx] = createRandomDataPoint(idx);
        }
        
        return newPoints;
      });
    } else {
      // Generate all points from scratch
      setDataPoints(Array.from({ length: count }, (_, i) => createRandomDataPoint(i)));
    }
  }, [count, createRandomDataPoint]);
  
  useEffect(() => {
    // Generate initial data
    generateData();
    
    // Set up interval for data updates if animation is enabled
    let intervalId: NodeJS.Timeout | null = null;
    if (shouldAnimate && updateInterval > 0) {
      intervalId = setInterval(() => {
        generateData(true); // true means partial update
      }, updateInterval);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [generateData, shouldAnimate, updateInterval]);
  
  return dataPoints;
};

/**
 * Custom hook to generate clustered data points (for machine learning visualization)
 * @param clusterCount Number of clusters to generate
 * @param pointsPerCluster Points in each cluster
 * @returns Array of data points with cluster assignments
 */
export const useClusteredData = (
  clusterCount: number = 3,
  pointsPerCluster: number = 15
): DataPoint[] => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  
  useEffect(() => {
    const clusters = Array.from({ length: clusterCount }, (_, i) => {
      // Generate random cluster centers
      const centerX = 20 + Math.random() * 60; // Keep centers within middle 60% of the space
      const centerY = 20 + Math.random() * 60;
      
      return Array.from({ length: pointsPerCluster }, (_, j) => {
        // Generate points around the cluster center with some random spread
        const spread = 10;
        return {
          x: centerX + (Math.random() * spread * 2 - spread),
          y: centerY + (Math.random() * spread * 2 - spread),
          category: i, // Use cluster index as category
          radius: 3 + Math.random() * 3
        };
      });
    }).flat();
    
    setDataPoints(clusters);
  }, [clusterCount, pointsPerCluster]);
  
  return dataPoints;
};

/**
 * Custom hook to generate time series data
 * @param days Number of days of data to generate
 * @param categories Array of category names
 * @returns Array of time series data points
 */
export const useTimeSeriesData = (
  days: number = 30,
  categories: string[] = ['Category A', 'Category B']
): TimeSeriesDataPoint[] => {
  const [data, setData] = useState<TimeSeriesDataPoint[]>([]);
  
  useEffect(() => {
    // Generate time series data
    const seriesData: TimeSeriesDataPoint[] = [];
    const now = new Date();
    
    // Create data for each day
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (days - i - 1));
      const dateStr = date.toISOString().split('T')[0];
      
      // Add data point for each category
      categories.forEach(category => {
        // Generate somewhat realistic timeseries with upward trend and some randomness
        const baseValue = 50 + (i / days) * 30; // Upward trend
        const noise = Math.random() * 20 - 10; // Random noise
        const seasonality = Math.sin((i / days) * Math.PI * 2) * 10; // Seasonal component
        
        seriesData.push({
          timestamp: dateStr,
          value: Math.max(0, baseValue + noise + seasonality),
          category
        });
      });
    }
    
    setData(seriesData);
  }, [days, categories]);
  
  return data;
};

/**
 * Custom hook for counting up animation
 * @param endValue The final value to count to
 * @param duration Duration of animation in milliseconds
 * @returns The current count value
 */
export const useCountUp = (
  endValue: number, 
  duration: number = 2000
): number => {
  const [count, setCount] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const endValueRef = useRef(endValue);
  const initializedRef = useRef(false);
  
  // Update the ref when endValue changes
  useEffect(() => {
    endValueRef.current = endValue;
  }, [endValue]);
  
  useEffect(() => {
    // Only reset animation on mount or when duration/endValue actually changes
    if (initializedRef.current) {
      return;
    }
    
    initializedRef.current = true;
    
    // Reset count and start new animation
    setCount(0);
    startTimeRef.current = null;
    
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * endValueRef.current);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []); // Empty dependency array to run only on mount
  
  return count;
};

export default {
  useScatterPlotData,
  useClusteredData,
  useTimeSeriesData,
  useCountUp
}; 