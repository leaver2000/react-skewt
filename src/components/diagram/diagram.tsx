
import React from "react"
import * as d3 from "d3"

import { useSkewT } from "../../hooks"

import {
  MARGINS,
  TEMPERATURE,
  PRESSURE,
  ALTITUDE_TICKS
} from "./constants"

function dimensions2Scales({ width, height }: SkewT.Dimensions): SkewT.Scales {
  return {
    xLinear: d3.scaleLinear()
      .range([-width / 2, width + width / 2])
      .domain([TEMPERATURE.MID - TEMPERATURE.MAX * 2, TEMPERATURE.MID + TEMPERATURE.MAX * 2]),
    //
    yLogarithmic: d3.scaleLog().range([0, height]).domain([PRESSURE.TOP, PRESSURE.BASE]),
  }
}
/** */
function scales2Axes({ xLinear: x, yLogarithmic: y }: SkewT.Scales): SkewT.Axes {
  // the bottom tick marks
  const x0 = d3.axisBottom(x).tickSize(0).ticks(40); //.orient("bottom");
  //
  const y0 = d3.axisLeft(y)
    .tickSize(0)
    .tickValues(PRESSURE.RANGE.filter((mBar) => mBar % 100 === 0 || mBar === 50 as Millibar || mBar === 150 as Millibar));
  // y1 is the ....
  const y1 = d3.axisRight(y).tickSize(5).tickValues(PRESSURE.TICKS);
  const y2 = d3.axisLeft(y).tickSize(2).tickValues(ALTITUDE_TICKS);
  return { x0, y0, y1, y2 };
};


function SVGraphic({ children }: React.PropsWithChildren): JSX.Element {
  const { dimensions } = useSkewT()
  return (
    <svg transform={`translate(0,${MARGINS.TOP})`} width={dimensions.width + MARGINS.LEFT} height={dimensions.height + MARGINS.BOTTOM}>
      <rect width={dimensions.width + MARGINS.LEFT} height={dimensions.height + MARGINS.BOTTOM} fill="grey" />
      {children}
    </svg>
  )
}

const DARK_GREY = "rgb(50,50,50)"

const OUTER_DIV_STYLE = {
  backgroundColor: DARK_GREY,
  border: "solid black",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "75vh",
  width: "50vw"
} as React.CSSProperties

const INNER_DIV_STYLE = {
  // paddingTop: "5%",
  paddingBottom: "2.5%",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
} as React.CSSProperties

export default function ({ children }: React.PropsWithChildren): JSX.Element {
  const { setPartialState } = useSkewT()
  const [isSized, setIsSized] = React.useState(false);


  // a ref to the div element, needed to resize the the container
  const ref = React.useRef<HTMLDivElement>(null);
  // this effect watches for the state of the ref and the isSized flag to trigger a resize on the svg components
  React.useEffect(() => {
    if (!isSized && !!ref && !!ref.current) {
      let { width, height } = ref.current.getBoundingClientRect();
      if (width >= height * .75) {
        height -= (MARGINS.TOP + MARGINS.BOTTOM)
        width = height * .75;
      } else {
        width -= (MARGINS.LEFT + MARGINS.RIGHT)
        height = width / .75;
      }

      const dimensions = { height, width };
      const scales = dimensions2Scales(dimensions);
      const axes = scales2Axes(scales);
      setPartialState({ dimensions, axes, scales })
      setIsSized(true)
    }
  }, [isSized, ref]);
  // add an event listener to the window to resize the chart
  React.useEffect(() => {
    const handleResize = () => {
      setIsSized(false)
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div style={OUTER_DIV_STYLE} ref={ref}>
      <div style={INNER_DIV_STYLE}  >
        {isSized ? <SVGraphic children={children} /> : <>rendering...</>}
      </div>
    </div>
  )
}