import React from "../../_snowpack/pkg/react.js";
import {line, curveLinear} from "../../_snowpack/pkg/d3.js";
import {SVGGTemperature} from "../../lib/SVGElements.js";
import {P, tangent} from "../../lib/index.js";
import useD3 from "../../hooks/use-d3.js";
import useCTX from "../../hooks/use-ctx.js";
export default function Temperature({datums}) {
  const {scales} = useCTX();
  const lineGenerator = React.useMemo(() => {
    const {x, y} = scales;
    return line().curve(curveLinear).x((d) => x(d.temp) + (y(P.base) - y(d.press)) / tangent).y((d) => y(d.press));
  }, [scales, P.base]);
  const ref = useD3((element) => element.selectAll("temperature").data(datums).enter().append("path").attr("d", lineGenerator).attr("class", "skewt-elements").attr("clip-path", "url(#clipper)"), [lineGenerator]);
  return /* @__PURE__ */ React.createElement(SVGGTemperature, {
    ref
  });
}