"use client";

import React, { useRef, useEffect, useState } from "react";
import Chart from "./Chart";

interface CandlestickChartProps {
  data: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
}

export default function CandlestickChart({ data }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
}