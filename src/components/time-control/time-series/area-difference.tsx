import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks";
import { MARGIN, colorMap } from "../constants";
// the area difference is a special case of the area path
// there is an upper and lower area path
enum LEVEL {
  UPPER = "upper",
  LOWER = "lower",
}

const getUrl = (id: string) => `url(${new URL(`#${id}`, location.toString())})`;

function getClipPathAndIDs(upperFieldName: string, lowerFieldName: string) {
  console.log("getClipPathAndIDs", upperFieldName, lowerFieldName);
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const [upperId, lowerId] = [LEVEL.UPPER, LEVEL.LOWER].map(
    (p) => `${p}-area-difference-${id}`
  );
  return [
    { id: upperId, clipPath: getUrl(upperId), fieldName: upperFieldName },
    { id: lowerId, clipPath: getUrl(lowerId), fieldName: lowerFieldName },
  ] as const;
}

function getScales(
  xDomain: Domain,
  yDomain: Domain,
  { width, height }: Dimensions
) {
  // [left, right]
  const xRange = [MARGIN.left, width - MARGIN.right];
  const x = d3.scaleTime(xDomain, xRange);
  // [bottom, top]
  const yRange = [height - MARGIN.bottom, MARGIN.top];
  const y = d3.scaleLinear(yDomain, yRange).range(yRange);
  return { x, y };
}

interface AreaDifferenceProps
  extends PipeProps<React.SVGProps<SVGGElement>, Dimensions> {
  primaryField: string;
  secondaryField: string;
  primaryData: number[];
  secondaryData: number[];
  hidden?: boolean;
}

export default function TimeSeriesAreaDifference({
  primaryField,
  secondaryField,
  primaryData,
  secondaryData,
  width,
  height,
  hidden,
  ...props
}: AreaDifferenceProps) {
  if (hidden) return null;
  const dimensions = { width, height };
  // the time range should be the same as the data length for both primary and secondary data
  const timeRange = d3.range(primaryData.length);
  // need to create unique ids for the upper and lower paths so that they can be referenced by the clipPath
  // memoize the ids so that they don't change on every render otherwise the clipPath will not work
  const [[upper, lower], setClipPathAndIDs] = React.useState(() =>
    getClipPathAndIDs(primaryField, secondaryField)
  );
  // create the scales
  const scale = React.useMemo(() => {
    const xDomain = [0, timeRange.length] as Domain;
    const yDomain = [
      Math.min(...primaryData, ...secondaryData),
      Math.max(...primaryData, ...secondaryData),
      //
    ] as Domain;
    return getScales(xDomain, yDomain, dimensions);
    // return [xDomain, yDomain, scale];
  }, [primaryData, secondaryData, dimensions]);
  // create the area functions for the upper and lower areas to unpack into the d3 attributes
  const areaFactory = (level: LEVEL.UPPER | LEVEL.LOWER, y0 = height) => {
    const data = level === LEVEL.UPPER ? primaryData : secondaryData;

    const area = d3
      .area<number>()
      .curve(d3.curveLinear)
      .x((i) => scale.x(timeRange[i]))
      .y0(y0)
      .y1((i) => scale.y(data[i]))(timeRange);

    return ["d", area] as const;
  };
  // [primaryData, secondaryData, height, scale.y, timeRange]
  // );

  React.useEffect(() => {
    setClipPathAndIDs(getClipPathAndIDs(primaryField, secondaryField));
  }, [primaryField, secondaryField, upper.fieldName, lower.fieldName]);

  function draw(g: d3.Selection<SVGGElement, any, any, any>) {
    console.log("draw", upper, lower);
    const marginLeft = 40;
    const marginRight = 10;
    const xAxis = d3
      .axisBottom(scale.x)
      .ticks(width / 80)
      .tickSizeOuter(0);

    const yFormat = d3.format(".2~s");
    const yAxis = d3.axisLeft(scale.y).ticks(height / 60, yFormat);

    g.selectAll("*").remove();
    g.append("path")
      .attr("clip-path", upper.clipPath)
      .attr("fill", colorMap.primary.area)
      .attr("fill-opacity", 0.5)
      .attr(...areaFactory(LEVEL.UPPER, 0));

    g.append("clipPath")
      .attr("id", upper.id)
      .append("path")
      .attr(...areaFactory(LEVEL.UPPER, 0));

    // the lower area
    g.append("path")
      .attr("clip-path", lower.clipPath)
      .attr("fill", colorMap.secondary.area)
      .attr("fill-opacity", 0.5)
      .attr(...areaFactory(LEVEL.LOWER, height));

    g.append("clipPath")
      .attr("id", lower.id)
      .append("path")
      .attr(...areaFactory(LEVEL.LOWER, height));

    // the difference area
    g.append("path")
      .attr("fill", "red")
      .attr("fill-opacity", 0.1)
      .attr(...areaFactory(LEVEL.LOWER, height))
      .attr(...areaFactory(LEVEL.UPPER, height));

    g.append("g")
      .attr("transform", `translate(${width - marginRight},0)`)
      .call(yAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", width)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("difference")
      );
  }

  const ref = useD3<SVGGElement>(draw, [upper, lower]);

  return (
    <svg>
      {/* <rect width={width - 8} height={height} fill={colorMap.alternate.area} /> */}
      <g ref={ref} {...props} />
    </svg>
  );
}
