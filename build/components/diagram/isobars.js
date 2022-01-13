import React from "../../_snowpack/pkg/react.js";
import {SVGGIsobars} from "../../lib/SVGElements.js";
import {LOG_P} from "../../lib/index.js";
import useD3 from "../../hooks/use-d3.js";
import useCTX from "../../hooks/use-ctx.js";
export default function Isobars() {
  const {dims, scales} = useCTX();
  const ref = useD3((element) => {
    element.selectAll("g").data(LOG_P).enter().append("line").attr("x1", -dims.width).attr("x2", 2 * dims.width).attr("y1", scales.y).attr("y2", scales.y).attr("class", "skewt-elements").attr("clip-path", "url(#clipper)");
  }, [dims.width, scales.y]);
  return /* @__PURE__ */ React.createElement(SVGGIsobars, {
    ref
  });
}
