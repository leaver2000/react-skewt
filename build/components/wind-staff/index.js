import React from "../../_snowpack/pkg/react.js";
import Box from "../../_snowpack/pkg/@mui/material/Box.js";
import {select} from "../../_snowpack/pkg/d3.js";
import {LOG_P, margin} from "../../lib/index.js";
import {D3WindBarb, ConversionFactors} from "../../lib/wind-barb/index.js";
import useD3 from "../../hooks/use-d3.js";
import useCTX from "../../hooks/use-ctx.js";
const BARB_HEIGHT = 40;
export default function WindStaff() {
  const {dims, datums, scales} = useCTX();
  const ref = useD3((svg) => {
    svg.selectAll("*").data(LOG_P).enter().append("svg").attr("y", scales.y).attr("width", 60).attr("height", 60).append("g").attr("border", "solid red").attr("transform", `translate(${margin.left / 2},${BARB_HEIGHT / 4})`).attr("id", (d) => `windstaff-log-${d}mb`);
  }, [scales.y]);
  React.useEffect(() => {
    if (!!datums) {
      datums.forEach(({wdir: wspd, wspd: wdir, press}) => {
        select(new D3WindBarb(wspd, wdir, makeTemplate(wdir)).draw(`#windstaff-log-${press}mb`)).attr("width", "25").attr("height", BARB_HEIGHT).append("line").attr("x1", 60).attr("stroke", "black").attr("transform", `translate(0,${BARB_HEIGHT / 2})`);
      });
    }
  }, []);
  return /* @__PURE__ */ React.createElement(Box, {
    sx: {border: "1px solid red", pl: 1}
  }, /* @__PURE__ */ React.createElement("svg", {
    ref,
    transform: `translate(5,${-BARB_HEIGHT + margin.bottom})`,
    height: dims.height + margin.bottom
  }));
}
const barbTemplate = {
  bar: {
    angle: 10,
    fullBarClassName: "",
    padding: 1.8,
    shortBarClassName: "",
    stroke: "#000",
    width: 1
  },
  circle: {
    fill: "#FFFFFF00",
    stroke: "#000",
    radius: 10,
    strokeWidth: 2,
    className: "wind-barb-zero-knots-circle"
  },
  conversionFactor: ConversionFactors.None,
  rootBarClassName: "",
  size: {
    width: 30,
    height: 20
  },
  svgId: "",
  triangle: {
    fill: "#000",
    stroke: "#000",
    padding: 7,
    className: "wind-barb-triangle"
  },
  baseCircle: {
    className: "wind-barb-base-circle",
    fill: "#000",
    radius: 2,
    stroke: "#000",
    strokeWidth: 2
  }
};
function makeTemplate(direction) {
  if (direction > 180)
    barbTemplate.bar.angle = barbTemplate.bar.angle - 180;
  return barbTemplate;
}
