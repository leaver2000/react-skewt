import React from "../../_snowpack/pkg/react.js";
import {SVGGTick} from "../../lib/SVGElements.js";
import {margin} from "../../lib/index.js";
import useCTX from "../../hooks/use-ctx.js";
import useD3 from "../../hooks/use-d3.js";
export default function Ticks() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IsothermTicks, null), /* @__PURE__ */ React.createElement(IsobarTicks, null));
}
function IsothermTicks() {
  const {dims, axes, darkMode} = useCTX();
  const ref = useD3((element) => {
    element.attr("transform", `translate(${margin.left},${dims.height - 5})`).call(axes.x0);
    element.selectAll("line").attr("stroke", "red").attr("stroke-width", ".2");
    element.selectAll("text").attr("stroke", darkMode ? "white" : "black").attr("stroke-width", ".35");
  }, [dims.height]);
  return /* @__PURE__ */ React.createElement("g", {
    ref
  });
}
function IsobarTicks() {
  const {dims, axes, darkMode} = useCTX();
  const ref = useD3((element) => {
    element.call(axes.y1).attr("transform", "translate(+5,0)");
    element.selectAll("line").attr("stroke", "red").attr("stroke-width", "1");
    element.selectAll("text").attr("stroke", darkMode ? "white" : "black").attr("stroke-width", ".35");
  }, [dims.height, darkMode]);
  return /* @__PURE__ */ React.createElement(SVGGTick, {
    ref
  });
}
