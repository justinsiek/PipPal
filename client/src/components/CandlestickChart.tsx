"use client";

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import Chart from "./Chart";

// Add prop interface
interface CandlestickChartProps {
  ticker: string;
}

const CandlestickChart = ({ ticker }: CandlestickChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [data, setData] = useState<any[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/candlestick-data?ticker=${ticker}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching candlestick data:', error);
      }
    };

    fetchData();
  }, [ticker]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    updateDimensions();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <div className="h-full w-full">
        {dimensions.width > 0 && dimensions.height > 0 && data.length > 0 && (
          <Chart 
            data={data}
            width={dimensions.width}
            height={dimensions.height}
          />
        )}
      </div>
    </div>
  );
};

export default CandlestickChart;