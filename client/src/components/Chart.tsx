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

  // find the high and low bounds of all the bars being displayed
  const dollar_high = (d3.max<number>(data.map((bar: BarData) => bar.high)) || 0) * 1.05;
  const dollar_low = (d3.min<number>(data.map((bar: BarData) => bar.low)) || 0) * 0.95;

  const chart_dims = {
    pixel_width: chart_width,
    pixel_height: chart_height,
    dollar_high,
    dollar_low,
    dollar_delta: dollar_high - dollar_low
  };

  const dollarAt = (pixel: number) => {
    const dollar =
      (Math.abs(pixel - chart_dims.pixel_height) / chart_dims.pixel_height) *
        chart_dims.dollar_delta +
      chart_dims.dollar_low;

    return pixel > 0 ? dollar.toFixed(2) : "-";
  };

  const pixelFor = (dollar: number) => {
    return Math.abs(
      ((dollar - chart_dims["dollar_low"]) / chart_dims["dollar_delta"]) *
        chart_dims["pixel_height"] -
        chart_dims["pixel_height"]
    );
  };

  // calculate the candle width
  const candle_width = Math.floor((chart_width / data.length) * 0.7);

  // Calculate coordinates for the connecting line
  const firstCandle = data[0];
  const lastCandle = data[data.length - 1];
  const firstX = (chart_width / (data.length + 1));
  const lastX = (chart_width / (data.length + 1)) * data.length;
  const firstY = pixelFor(firstCandle.close);
  const lastY = pixelFor(lastCandle.close);

  return (
    <svg
      width={chart_width}
      height={chart_height}
      className="bg-[#121212] text-white"
    >
      {/* Add connecting line */}
      <line
        x1={firstX}
        y1={firstY}
        x2={lastX}
        y2={lastY}
        className="stroke-[#FFFFFF] stroke-[1]"
      />
      
      {data.map((bar, i) => {
        const candle_x = (chart_width / (data.length + 1)) * (i + 1);
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
    </svg>
  );
};

export default Chart;
