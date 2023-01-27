import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks";

interface LinePathProps<T> extends React.SVGProps<SVGGElement> {
  data: T[];
  lineGenerator: d3.Line<T>;
}
export default function LinePath({
  data,
  lineGenerator,
  ...props
}: LinePathProps<number>) {
  const ref = useD3<SVGGElement>(
    (g) => {
      // clear the svg
      g.selectAll("*").remove();
      // add the temperature data
      g.append("path").datum(data).attr("d", lineGenerator);
    },
    [data, lineGenerator]
  );
  return <g ref={ref} strokeWidth={1} fill="none" {...props} />;
}
