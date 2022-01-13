import React from "../../_snowpack/pkg/react.js";
import {line, curveLinear} from "../../_snowpack/pkg/d3.js";
import {SVGGIsohumes} from "../../lib/SVGElements.js";
import {mixingRatio, saturationVaporPressure, vaporPressure, dewpoint, K0} from "../../lib/atmo2.js";
import {P, all, tangent, LOG_P} from "../../lib/index.js";
import useD3 from "../../hooks/use-d3.js";
import useCTX from "../../hooks/use-ctx.js";
export default function Isohumes() {
  const {scales} = useCTX();
  const lineGenerator = React.useMemo(() => {
    const {x, y} = scales;
    let temp;
    let mixing_ratio;
    return line().curve(curveLinear).x((d, i) => {
      const pressureValue = LOG_P[i];
      if (i === 0)
        mixing_ratio = mixingRatio(saturationVaporPressure(d + K0), pressureValue);
      else if (!!pressureValue) {
        temp = dewpoint(vaporPressure(pressureValue, mixing_ratio));
        return x(temp - K0) + (y(P.base) - y(pressureValue)) / tangent;
      }
      return 0;
    }).y((_, i) => {
      const pressureValue = LOG_P[i];
      return !!pressureValue ? y(pressureValue) : 0;
    });
  }, [scales]);
  const ref = useD3((element) => element.selectAll("Isohumes").data(all).enter().append("path").attr("d", lineGenerator).attr("class", "skewt-elements").attr("clip-path", "url(#clipper)"), [lineGenerator]);
  return /* @__PURE__ */ React.createElement(SVGGIsohumes, {
    ref,
    strokeDasharray: "6 5"
  });
}
