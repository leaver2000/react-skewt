import React from "../../_snowpack/pkg/react.js";
import {line, curveLinear} from "../../_snowpack/pkg/d3.js";
import {SVGGDryAdibats} from "../../lib/SVGElements.js";
import {dryLapse, K0} from "../../lib/atmo2.js";
import {all, P, tangent, LOG_P} from "../../lib/index.js";
import useD3 from "../../hooks/use-d3.js";
import useCTX from "../../hooks/use-ctx.js";
export default function DryAdibats() {
  const {scales} = useCTX();
  const lineGenerator = React.useMemo(() => {
    const {x, y} = scales;
    return line().curve(curveLinear).x((d, i) => {
      const pressureValue = LOG_P[i];
      return !!pressureValue ? x(dryLapse(pressureValue, K0 + d, P.base) - K0) + (y(P.base) - y(pressureValue)) / tangent : 0;
    }).y((_, i) => {
      const pressureValue = LOG_P[i];
      return !!pressureValue ? y(pressureValue) : 0;
    });
  }, [scales]);
  const ref = useD3((element) => {
    element.selectAll("g").data(all).enter().append("path").attr("d", lineGenerator).attr("class", "skewt-elements").attr("clip-path", "url(#clipper)");
  }, [lineGenerator]);
  return /* @__PURE__ */ React.createElement(SVGGDryAdibats, {
    ref
  });
}
