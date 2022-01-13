import React from "../../_snowpack/pkg/react.js";
import {line, curveLinear} from "../../_snowpack/pkg/d3.js";
import {SVGGEnvironmentalLapseRate} from "../../lib/SVGElements.js";
import {getElevation} from "../../lib/atmo2.js";
import {P, tangent, LOG_P} from "../../lib/index.js";
import useD3 from "../../hooks/use-d3.js";
import useCTX from "../../hooks/use-ctx.js";
export default function EnvironmentalLapseRate() {
  const {scales} = useCTX();
  const lineGenerator = React.useMemo(() => {
    const {x, y} = scales;
    return line().curve(curveLinear).x((d) => {
      let t = d > P.at11km ? 15 - getElevation(d) * 649e-5 : -56.5;
      return x(t) + (y(P.base) - y(d)) / tangent;
    }).y((d) => y(d));
  }, [scales]);
  const ref = useD3((element) => {
    element.selectAll("elr").data([LOG_P.filter((p) => p > P.at11km).concat([P.at11km, 50])]).enter().append("path").attr("d", lineGenerator).attr("class", "skewt-elements").attr("clip-path", "url(#clipper)");
  }, [lineGenerator]);
  return /* @__PURE__ */ React.createElement(SVGGEnvironmentalLapseRate, {
    ref
  });
}
