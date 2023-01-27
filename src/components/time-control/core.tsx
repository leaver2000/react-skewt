import React from "react";
import * as d3 from "d3";

import type { PointerCallback, ControlData } from "./util";
import { D3Area, D3Ticks } from "./d3-react-elements";
import { colorMap } from "./constants";
// import TimeSeriesLineElement from "./time-series/line-element";
import TimeSeriesLinePath from "./time-series/line-path";
import TimeSeriesAreaDifference from "./time-series/area-difference";

import { ResizeManager, SVGManager, WindBarbWindow } from "./management";
/** default dimensions for the meteogram, set on render */
const DEFAULT_DIMENSIONS = { width: null!, height: null! } as Dimensions;
/** height of the main window */
const MAIN_WINDOW_HEIGHT = 160;
/** height of the wind barb window */
const WIND_BARB_WINDOW_HEIGHT = 55;
/** plot time ticks every 6 hours */
const TIME_TICK_STEP = 6;
/** plot wind barbs every 3 hours */
const WIND_BARB_STEP = 3;
/** keep a buffer at the top and bottom of the temperature values */
const TEMPERATURE_BUFFER = 5;
// style constants
const PATH_STROKE_WIDTH = 5;
const PATH_STROKE_DASH_ARRAY = ".25,2";
const AREA_FILL_OPACITY = 0.2;
const TRANSPARENT = "rgba(0,0,0,0)";
const NONE = "none";

enum Color {
  RED = "red",
  BLUE = "steelblue",
  GREY = "grey",
}

interface EventHandlers {
  onClick: PointerCallback;
  onMouseMove: PointerCallback;
}

interface MeteogramScale {
  x: d3.ScaleTime<number, number>;
  y: d3.ScaleLinear<number, number>;
}
const getTickLineColor = (d: any) =>
  (d === 0 || d === -20 ? Color.BLUE : Color.GREY) as string;
function SecondaryDisplay({
  primaryField,
  secondaryField,
  primaryData,
  secondaryData,
  ...dimensions
}: Dimensions & SecondaryData) {
  let { width, height } = dimensions;
  // height = height - MARGIN.top - MARGIN.bottom;
  const data = primaryData.map((d, i) => [d, secondaryData[i]]);

  const yDomain = [
    Math.min(...primaryData, ...secondaryData),
    Math.max(...primaryData, ...secondaryData),
  ] as Domain;

  const lineGenerator = React.useMemo(() => {
    const x = d3.scaleTime().domain([0, data.length]).range([0, width]); // x scale for the time
    const y = d3.scaleLinear().domain(yDomain).range([height, 0]); // y scale for the data values
    // line generator for the temperature data
    return (
      //
      d3
        .line<number>()
        .x((_, d) => x(d))
        .y(y)
    );
  }, []);

  return (
    <>
      <TimeSeriesAreaDifference
        //
        primaryField={primaryField}
        primaryData={primaryData}
        secondaryField={secondaryField}
        secondaryData={secondaryData}
        width={width}
        height={height}
      />
      <TimeSeriesLinePath
        //
        data={primaryData}
        lineGenerator={lineGenerator}
        stroke={colorMap.primary.main}
        strokeWidth={5}
        strokeDasharray=".5,2"
      />
      <TimeSeriesLinePath
        //
        data={secondaryData}
        lineGenerator={lineGenerator}
        stroke={colorMap.alternate.main}
        strokeWidth={5}
        strokeDasharray=".5,2"
      />
    </>
  );
}

interface SecondaryData {
  primaryField: string;
  secondaryField: string;
  primaryData: number[];
  secondaryData: number[];
}
interface TemporalControlProps extends ControlData, EventHandlers {
  validTimes: string[];
  secondaryData?: SecondaryData;
  invertY?: boolean;
}

export default function TemporalControl({
  temperature,
  dewPoint,
  ...props
}: TemporalControlProps) {
  // react hook to manage the dimensions of the svg, the container will set the dimensions and the rest of the chart will use them
  let [dimensions, setDimensions] = React.useState(DEFAULT_DIMENSIONS);
  let invertY = !!props.invertY;
  // unpack the props
  const { secondaryData } = props;
  const validTimes = props.validTimes.map((d) => new Date(d));
  // react hook to manage the scales and line generator
  const [scale, lineGenerator] = React.useMemo(() => {
    // the domain of the x scale is the number of valid times
    const xDomain = [0, validTimes.length - 1];
    // the domain of the y scale is the min dew point and max temperature, with a buffer
    // the buffer prevents the lines from going off the chart
    let yDomain = [
      Math.min(...dewPoint) - TEMPERATURE_BUFFER,
      Math.max(...temperature) + TEMPERATURE_BUFFER,
    ];
    // the range of the y scale is the height of the chart
    let yRange = [0, dimensions.height];
    // inverting the y axis puts the higher values at the bottom
    // this is useful for the looking a the temperature difference between two fields
    // through the vertical axis, because the temperature values cool with height
    if (invertY) {
      yDomain = yDomain.reverse();
      yRange = yRange.reverse();
    }
    const scale = {
      // x scale for the time
      x: d3.scaleTime().domain(xDomain).range([0, dimensions.width]),
      // y scale for the temperature
      y: d3.scaleLinear().domain(yDomain).range(yRange),
      // y: d3.scaleLinear().domain(yDomain).range([dimensions.height, 0]),
    } as MeteogramScale;
    // line generator for the temperature data
    const lineGenerator = d3
      .line<Celsius>()
      .x((_, d) => scale.x(d))
      .y(scale.y);
    return [scale, lineGenerator];
  }, [temperature, dewPoint, validTimes.length, dimensions, invertY]);

  return (
    <div style={{ padding: 2, border: "solid grey" }}>
      <ResizeManager onResize={setDimensions}>
        <SVGManager //
          onClick={props.onClick}
          onMouseMove={props.onMouseMove}
          validTimes={validTimes}
          width={dimensions.width}
          height={MAIN_WINDOW_HEIGHT}
        >
          <path // call the line generator with the temperature data to get the path
            d={lineGenerator(temperature)!}
            stroke={Color.RED}
            fill={NONE}
            strokeWidth={PATH_STROKE_WIDTH}
            strokeDasharray={PATH_STROKE_DASH_ARRAY}
          />
          <D3Area // the area above the temperature line
            // fillAbove
            fillAbove={!invertY}
            data={temperature}
            x={scale.x}
            y={scale.y}
            fill={Color.RED}
            fillOpacity={AREA_FILL_OPACITY}
            {...dimensions}
          />
          <path // call the line generator with the dew point data to get the path
            d={lineGenerator(dewPoint)!}
            stroke={Color.BLUE}
            fill={NONE}
            strokeWidth={PATH_STROKE_WIDTH}
            strokeDasharray={PATH_STROKE_DASH_ARRAY}
          />
          <D3Area // the area below the dew point line
            fillAbove={invertY}
            data={dewPoint}
            x={scale.x}
            y={scale.y}
            fill={Color.BLUE}
            fillOpacity={AREA_FILL_OPACITY}
            {...dimensions}
          />
          {/* {!!secondaryData ? <SecondaryDisplay {...{ ...dimensions, ...secondaryData }} /> : null} */}
          <D3Ticks // the x axis ticks at 6 hour intervals plotted along the bottom of the chart spanning the height of the chart
            axis={d3
              .axisBottom(scale.x)
              .tickValues(d3.range(0, validTimes.length, TIME_TICK_STEP))
              .tickSize(dimensions.height)
              .tickFormat((d) => `${d}hr`)}
            hook={(g) =>
              g
                .selectAll(".tick text")
                .attr("y", dimensions.height - 10)
                .attr("dy", 1)
                .attr("dx", -15)
                .datum((_, i) => validTimes[i])
            }
            strokeDasharray={"2,2"}
            {...dimensions}
          />
          <D3Ticks // the y axis ticks at 5 degree intervals plotted along the left side of the chart spanning the width of the chart
            axis={d3
              .axisLeft(scale.y)
              .tickValues(scale.y.ticks())
              .tickSize(-dimensions.width)
              .tickFormat((d) => `${d}°C`)}
            hook={(g) => {
              // if the value is a multiple of 0 or -20 make the line blue otherwise make it grey
              g.selectAll(".tick line").attr("stroke", getTickLineColor);
              // move the text to the right of the line and move it up a bit
              g.selectAll(".tick text").attr("x", 30).attr("dy", -4);
            }}
            strokeDasharray={"3,2"}
            {...dimensions}
          />
        </SVGManager>
      </ResizeManager>
      {/* this is the lower display for the wind's */}
      <WindBarbWindow // the window will display the wind barbs
        data={props.wind}
        onClick={props.onClick}
        onMouseMove={props.onMouseMove}
        // domain
        validTimes={validTimes}
        step={WIND_BARB_STEP}
        // dimensions
        width={dimensions.width}
        height={WIND_BARB_WINDOW_HEIGHT}
        fill={TRANSPARENT}
        fillOpacity={AREA_FILL_OPACITY}
      >
        <D3Ticks // the x axis ticks at 6 hour intervals plotted along the bottom of the chart spanning the height of the chart
          axis={d3
            .axisBottom(scale.x)
            .tickValues(d3.range(0, validTimes.length, TIME_TICK_STEP))
            .tickSize(dimensions.height)}
          hook={(g) =>
            g
              .selectAll(".tick text")
              .attr("y", dimensions.height - 10)
              .attr("dy", 0)
              .datum((_, i) => validTimes[i])
          }
          strokeDasharray={"2,2"}
          {...dimensions}
        />
      </WindBarbWindow>
    </div>
  );
}
