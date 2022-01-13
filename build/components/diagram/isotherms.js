import React from "../../_snowpack/pkg/react.js";
import {SVGGIsotherms} from "../../lib/SVGElements.js";
import {SKEW_T, P, tangent} from "../../lib/index.js";
import useD3 from "../../hooks/use-d3.js";
import useCTX from "../../hooks/use-ctx.js";
export default function Isotherms() {
  const {dims, scales} = useCTX();
  const ref = useD3((element) => {
    const {x, y} = scales;
    element.selectAll("isotherms").data(SKEW_T).enter().append("line").attr("x1", (d) => x(d) - 0.5 + (y(P.base) - y(P.top)) / tangent).attr("x2", (d) => x(d) - 0.5).attr("y1", 0).attr("y2", dims.height).attr("class", "skewt-elements").attr("clip-path", "url(#clipper)");
    element.selectAll("line").attr("stroke", (d) => d === 0 || d === -20 ? "blue" : null);
  }, [dims.height, scales]);
  return /* @__PURE__ */ React.createElement(SVGGIsotherms, {
    ref
  });
}
