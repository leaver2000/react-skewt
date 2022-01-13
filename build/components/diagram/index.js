import React from "../../_snowpack/pkg/react.js";
import Box from "../../_snowpack/pkg/@mui/material/Box.js";
import {SVGRectBackdrop} from "../../lib/SVGElements.js";
import {margin, dims2Scales, scales2Axes} from "../../lib/index.js";
import useCTX from "../../hooks/use-ctx.js";
import useD3 from "../../hooks/use-d3.js";
import Ticks from "./ticks.js";
import Isobars from "./isobars.js";
import Isohumes from "./isohumes.js";
import Isotherms from "./isotherms.js";
import DryAdibats from "./dry-adibats.js";
import MoistAdiabats from "./moist-adiabats.js";
import EnvironmentalLapseRate from "./environmental-lapse-rate.js";
export default function Diagram({...props}) {
  const {dims, setState, isSized} = useCTX();
  const ref = useD3((element) => {
    if (!isSized) {
      element.selectAll(".skewt-elements").remove();
      let width = parseInt(element.style("width"));
      let height = width;
      width = width - margin.left - margin.right;
      height = width - margin.top - margin.bottom;
      const dims2 = {height, width};
      const scales = dims2Scales(dims2);
      const axes = scales2Axes(scales);
      setState({dims: dims2, axes, scales, isSized: true});
    }
  }, [isSized]);
  return /* @__PURE__ */ React.createElement(Box, {
    ref
  }, isSized ? /* @__PURE__ */ React.createElement("svg", {
    transform: `translate(0,${margin.top})`,
    width: dims.width + margin.left,
    height: dims.height + margin.bottom
  }, /* @__PURE__ */ React.createElement(SVGRectBackdrop, {
    width: dims.width,
    height: dims.height,
    fill: "white"
  }), /* @__PURE__ */ React.createElement(EnvironmentalLapseRate, null), /* @__PURE__ */ React.createElement(Isobars, null), /* @__PURE__ */ React.createElement(Isotherms, null), /* @__PURE__ */ React.createElement(MoistAdiabats, null), /* @__PURE__ */ React.createElement(DryAdibats, null), /* @__PURE__ */ React.createElement(Isohumes, null), /* @__PURE__ */ React.createElement(Ticks, null), props.children) : null);
}
