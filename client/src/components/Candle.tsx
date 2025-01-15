import React from "react";
import classNames from "classnames";

interface CandleProps {
  data: any;
  x: number;
  candle_width: number;
  pixelFor: (dollar: number) => number;
}

const Candle = (props: CandleProps) => {
  const { data, x, candle_width, pixelFor } = props;

  const up = data.close > data.open;
  const bar_top = pixelFor(up ? data.close : data.open);
  const bar_bottom = pixelFor(up ? data.open : data.close);
  const bar_height = bar_bottom - bar_top;
  const wick_top = pixelFor(data.high);
  const wick_bottom = pixelFor(data.low);

  return (
    <>
      <rect
        x={x - candle_width / 2}
        y={bar_top}
        width={candle_width}
        height={bar_height}
        className={classNames({
          'stroke-[1] fill-[#81dfc4] stroke-[#81dfc4]': up,
          'stroke-[1] fill-[#d75b6d] stroke-[#d75b6d]': !up,
        })}
      />
      <line
        className={classNames({
          'stroke-[1.5]': true,
          'stroke-[#81dfc4]': up,
          'stroke-[#d75b6d]': !up,
        })}
        x1={x}
        y1={bar_top}
        x2={x}
        y2={wick_top}
      />
      <line
        className={classNames({
          'stroke-[1.5]': true,
          'stroke-[#81dfc4]': up,
          'stroke-[#d75b6d]': !up,
        })}
        x1={x}
        y1={bar_bottom}
        x2={x}
        y2={wick_bottom}
      />
    </>
  );
};

export default Candle;
