import React from "react";
import * as d3 from "d3-shape";

import { useSkewT } from "../../hooks";

import { PRESSURE, TANGENT } from "./constants";

enum PARAMETER {
  TEMPERATURE = "temperature",
  DEW_POINT = "dewPoint",
}

const createLineGenerator = (
  parameter: PARAMETER,
  scales: SkewT.Scales
): d3.Line<SkewT.Datum> =>
  d3
    .line<SkewT.Datum>() //
    .curve(d3.curveLinear)
    .x(
      (d) =>
        scales.x(d[parameter]) +
        (scales.y(PRESSURE.BASE) - scales.y(d.pressure)) / TANGENT
    )
    .y((d) => scales.y(d.pressure));

// a factory function that creates a sounding line for either temperature or dew point
const soundingFactory = (
  parameter: PARAMETER,
  props: SkewT.PathElementProps
): JSX.Element => {
  const { scales, datums } = useSkewT();
  const lineGenerator = React.useCallback(
    d3
      .line<SkewT.Datum>() //
      .curve(d3.curveLinear)
      .x(
        (d) =>
          scales.x(d[parameter]) +
          (scales.y(PRESSURE.BASE) - scales.y(d.pressure)) / TANGENT
      )
      .y((d) => scales.y(d.pressure)),
    [scales, parameter]
  );
  const path = React.useMemo(
    () => lineGenerator(datums)!,
    [datums, lineGenerator]
  );
  return <path d={path} {...props} />;
};
// the signature for temperature and dew point are the same so we can reuse the same function for both
// and just pass in the parameter we want to use.
export const Temperature = (props: SkewT.PathElementProps): JSX.Element =>
  soundingFactory(PARAMETER.TEMPERATURE, props);
export const DewPoint = (props: SkewT.PathElementProps): JSX.Element =>
  soundingFactory(PARAMETER.DEW_POINT, props);
