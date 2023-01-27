import React from "react";
import * as d3 from "d3";

type OmittedLineProps = Omit<
  React.SVGProps<SVGLineElement>,
  "x1" | "x2" | "y1" | "y2" | "stroke"
>;
export interface LineProps extends OmittedLineProps {
  stroke?: string;
}
type ValueFunction<T> = T | ((d: number, index: number) => T);
interface LineGeneratorProps extends OmittedLineProps {
  data: number[];
  x1: ValueFunction<number>;
  x2: ValueFunction<number>;
  y1: ValueFunction<number>;
  y2: ValueFunction<number>;
  stroke?: ValueFunction<string>;
}
const isFunction = (f: any): f is Function => typeof f === "function";
function valueFn<T>(valueFn: T, d: number, i: number) {
  // if f is callable
  if (isFunction(valueFn)) {
    return valueFn(d, i);
  }
  return valueFn;
}

export const LineElementGenerator = ({
  data,
  x1,
  y1,
  x2,
  y2,
  stroke,
  ...props
}: LineGeneratorProps): JSX.Element => (
  <>
    {data.map((d, i) => (
      <line //
        key={`line-element-${i}`}
        x1={valueFn(x1, d, i)}
        x2={valueFn(x2, d, i)}
        y1={valueFn(y1, d, i)}
        y2={valueFn(y2, d, i)}
        stroke={valueFn(stroke, d, i)}
        {...props}
      />
    ))}
  </>
);

interface PathGeneratorProps extends React.SVGProps<SVGPathElement> {
  lineGenerator: d3.Line<number>;
  data: number[][];
}

export const PathElementGenerator = ({
  data,
  lineGenerator,
  ...props
}: PathGeneratorProps): JSX.Element => (
  <>
    {data.map((d, i) => (
      <path //
        key={`path-element-${i}`}
        d={lineGenerator(d)!}
        {...props}
      />
    ))}
  </>
);
