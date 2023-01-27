import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../../../hooks";
import { useSkewT } from "../../hooks";

import { MARGINS, TEMPERATURE, PRESSURE, ALTITUDE_TICKS } from "./constants";
type SVGPointerEvent = D3PointerEvent<SVGSVGElement>;

type EventCallback = (
  interpolation: { pressureLevel: number },
  e: SVGPointerEvent
) => void;
interface CallbackProps {
  onClick?: EventCallback;
  onMouseMove?: EventCallback;
}
type DiagramProps = React.PropsWithChildren<
  PipeProps<React.SVGProps<SVGRectElement>, CallbackProps>
>;

function dimensions2Scales({ width, height }: SkewT.Dimensions): SkewT.Scales {
  return {
    x: d3
      .scaleLinear()
      .range([-width / 2, width * 1.5])
      .domain([
        TEMPERATURE.MID - TEMPERATURE.MAX * 2,
        TEMPERATURE.MID + TEMPERATURE.MAX * 2,
      ]),
    //
    y: d3.scaleLog().range([0, height]).domain([PRESSURE.TOP, PRESSURE.BASE]),
  };
}
/** */
function scales2Axes({ x, y }: SkewT.Scales): SkewT.Axes {
  // the bottom tick marks
  const x0 = d3.axisBottom(x).tickSize(0).ticks(40); //.orient("bottom");
  //
  const y0 = d3
    .axisLeft(y)
    .tickSize(0)
    .tickValues(
      PRESSURE.RANGE.filter(
        (mBar) =>
          mBar % 100 === 0 ||
          mBar === (PRESSURE.TOP as Millibar) ||
          mBar === (150 as Millibar)
      )
    );

  const y1 = d3.axisRight(y).tickSize(5).tickValues(PRESSURE.TICKS);
  const y2 = d3.axisLeft(y).tickSize(2).tickValues(ALTITUDE_TICKS);
  return { x0, y0, y1, y2 };
}

function Graphic({
  onClick = () => void 0,
  onMouseMove = () => void 0,
  children,
  ...props
}: DiagramProps): JSX.Element {
  const skewt = useSkewT();
  const { width, height } = skewt.dimensions;

  const interpolateLevel = React.useCallback(
    (e: SVGPointerEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const y = d3
        .scaleLog()
        .range([0, rect.height])
        .domain([PRESSURE.TOP, PRESSURE.BASE]);

      const level = y.invert(e.clientY - rect.top);
      // round the level to the nearest 25
      return Math.round(level / PRESSURE.INTERVAL) * PRESSURE.INTERVAL;
      // another options may be to floor the level to the nearest 25
      // return Math.floor(level / PRESSURE.INTERVAL) * PRESSURE.INTERVAL;
    },
    [skewt.pressureLevels]
  );
  const eventCallback = React.useCallback(
    (callback: EventCallback) => (e: SVGPointerEvent) =>
      callback({ pressureLevel: interpolateLevel(e) }, e),
    [interpolateLevel]
  );

  const ref = useD3<SVGSVGElement>(
    (svg) => {
      svg
        .selectAll("*")
        .on("click", eventCallback(onClick))
        .on("mousemove", eventCallback(onMouseMove));
    },
    [onClick, onMouseMove]
  );

  return (
    <svg
      ref={ref}
      transform={`translate(0,${MARGINS.TOP})`}
      width={width + MARGINS.LEFT}
      height={height + MARGINS.BOTTOM}
    >
      {/* a background rect for color */}
      <rect
        width={width + MARGINS.LEFT}
        height={height + MARGINS.BOTTOM}
        {...props}
      />
      {children}
      {/* need a transparent rect after the children in order for the mouse events to register correctly */}
      <rect
        width={width + MARGINS.LEFT}
        height={height + MARGINS.BOTTOM}
        fill="transparent"
      />
    </svg>
  );
}

const DARK_GREY = "rgb(50,50,50)";

const OUTER_DIV_STYLE = {
  backgroundColor: DARK_GREY,
  border: "solid black",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "75vh",
  width: "50vw",
} as React.CSSProperties;

export default function ({
  onClick,
  onMouseMove,
  ...props
}: DiagramProps): JSX.Element {
  const { setPartialState } = useSkewT();
  const [isSized, setIsSized] = React.useState(false);

  // a ref to the div element, needed to resize the the container
  const ref = React.useRef<HTMLDivElement>(null);
  // this effect watches for the state of the ref and the isSized flag to trigger a resize on the svg components
  React.useEffect(() => {
    if (!isSized && !!ref && !!ref.current) {
      let { width, height } = ref.current.getBoundingClientRect();
      if (width >= height * 0.75) {
        height -= MARGINS.TOP + MARGINS.BOTTOM;
        width = height * 0.75;
      } else {
        width -= MARGINS.LEFT + MARGINS.RIGHT;
        height = width / 0.75;
      }

      const dimensions = { height, width };
      const scales = dimensions2Scales(dimensions);
      const axes = scales2Axes(scales);
      setPartialState({ dimensions, axes, scales });
      setIsSized(true);
    }
  }, [isSized, ref]);
  // add an event listener to the window to resize the chart
  const handleResize = () => setIsSized(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={OUTER_DIV_STYLE} ref={ref}>
      {isSized ? (
        <Graphic onClick={onClick} onMouseMove={onMouseMove} {...props} />
      ) : (
        <>rendering...</>
      )}
    </div>
  );
}
