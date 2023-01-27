import React from "react";
import * as d3 from "d3";

import { useD3 } from "../../../hooks";

type Scale =
  | d3.ScaleLinear<number, number, never>
  | d3.ScaleTime<number, number, never>
  | number;

interface D3ScaleProps {
  x1: Scale;
  x2: Scale;
  y1: Scale;
  y2: Scale;
}
// Define Props
interface LineElementProps
  extends PipeProps<React.SVGProps<SVGGElement>, D3ScaleProps> {
  data: number[];
  hidden?: boolean;
}

export default function LineElement({
  data,
  x1,
  x2,
  y1,
  y2,
  hidden,
  ...props
}: LineElementProps) {
  if (hidden) return null;

  const ref = useD3<SVGGElement>(
    (g) => {
      // clear the svg
      g.selectAll("*").remove();
      // plot the lines
      g.selectAll("line")
        .data(data)
        .join("line")
        .attr("x1", x1)
        .attr("x2", x2)
        .attr("y1", y1)
        .attr("y2", y2);
    },
    [data, x1, x2, y1, y2]
  );
  return <g ref={ref} {...props} />;
}
