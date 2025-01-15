"use client";

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import Chart from "./Chart";

const CandlestickChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Create ResizeObserver
    const resizeObserver = new ResizeObserver(updateDimensions);
    
    // Start observing the container
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Initial update
    updateDimensions();

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const randomOne = (weight = 1) => {
    return (Math.random() + Math.random() - 1) * weight;
  };

  const generateData = () => {
    const length = 120;
    const seed_close = Math.random() * 150 + 50;
    let previous_close = seed_close;
    let previous_volume = Math.random() * 300 + 10;
    let trend = Math.floor(Math.random() * 2) * 2 - 1;

    return d3.range(length).map((item, i) => {
      const open = previous_close * (1 + randomOne(0.1));
      const close = open * (1 + randomOne(0.2) * trend);
      const high = Math.max(open, close) * (1 + randomOne(0.1));
      const low = Math.min(open, close) * (1 - randomOne(0.1));
      const volume = previous_volume * (1 + randomOne(0.5));

      previous_close = close;
      trend = Math.floor(Math.random() * 2) * 2 - 1;

      return {
        time: i,
        open,
        high,
        low,
        close,
        volume
      };
    });
  };

  const [data] = React.useState(generateData());

  return (
    <div ref={containerRef} className="h-full w-full">
      <div className="h-full w-full">
        {dimensions.width > 0 && dimensions.height > 0 && (
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

export default CandlestickChart