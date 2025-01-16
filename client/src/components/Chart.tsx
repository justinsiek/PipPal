import React, { useState } from "react";
import * as d3 from "d3";

import Candle from "./Candle";

interface BarData {
  high: number;
  low: number;
  open: number;
  close: number;
  time: number;
  volume: number;
}

interface ChartProps {
  data: BarData[];
  width: number;
  height: number;
}

const Chart = (props: ChartProps) => {
  const { data, width: chart_width, height: chart_height } = props;
  const margin = { top: 20, right: 30, bottom: 30, left: 60 };
  const width = chart_width - margin.left - margin.right;
  const height = chart_height - margin.top - margin.bottom;

  // find the high and low bounds of all the bars being displayed
  const dollar_high = (d3.max<number>(data.map((bar: BarData) => bar.high)) || 0) * 1.05;
  const dollar_low = (d3.min<number>(data.map((bar: BarData) => bar.low)) || 0) * 0.95;

  const chart_dims = {
    pixel_width: width,
    pixel_height: height,
    dollar_high,
    dollar_low,
    dollar_delta: dollar_high - dollar_low
  };

  // Create scales
  const xScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);

  const prices = data.flatMap(d => [d.high, d.low]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const padding = priceRange * 0.1; // change this for padding

  const yScale = d3.scaleLinear()
    .domain([minPrice - padding, maxPrice + padding])
    .range([height, 0]);

  const pixelFor = (dollar: number) => {
    return margin.top + yScale(dollar);
  };

  // calculate the candle width
  const candle_width = Math.floor((width / data.length) * 0.7);

  // Get first and last candle positions
  const firstCandleX = (width / (data.length + 1));
  const lastCandleX = (width / (data.length + 1)) * data.length;
  
  // Get opening price for first candle and closing price for last candle
  const firstCandleOpen = pixelFor(data[0].open);
  const lastCandleClose = pixelFor(data[data.length - 1].close);

  return (
    <svg
      width={chart_width}
      height={chart_height}
      className="bg-[#121212] text-white"
    >
      <g transform={`translate(${margin.left},0)`}>
        {/* Add the connecting line */}
        <line
          x1={firstCandleX}
          y1={firstCandleOpen}
          x2={lastCandleX}
          y2={lastCandleClose}
          stroke="white"
          strokeWidth={2}
          strokeOpacity={1}
        />

        {/* Y Axis */}
        {yScale.ticks(10).map((tick) => (
          <g key={tick} transform={`translate(0,${pixelFor(tick)})`}>
            <line
              x1={-6}
              x2={width}
              stroke="#333"
              strokeWidth={0.5}
            />
            <text
              x={-10}
              y={4}
              textAnchor="end"
              className="text-xs fill-gray-400"
            >
              {tick.toFixed(2)}
            </text>
          </g>
        ))}

        {/* X Axis */}
        {xScale.ticks(10).map((tick) => (
          <g key={tick} transform={`translate(${xScale(tick)},${height + margin.top})`}>
            <line
              y1={0}
              y2={6}
              stroke="#333"
              strokeWidth={0.5}
            />
            <text
              y={20}
              textAnchor="middle"
              className="text-xs fill-gray-400"
            >
              {tick}
            </text>
          </g>
        ))}

        {/* Candles */}
        {data.map((bar, i) => {
          const candle_x = (width / (data.length + 1)) * (i + 1);
          return (
            <Candle
              key={i}
              data={bar}
              x={candle_x}
              candle_width={candle_width}
              pixelFor={pixelFor}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default Chart;
