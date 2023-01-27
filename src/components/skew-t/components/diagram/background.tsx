/**
 * the skew-t diagram background components are not dependent on the data
 * these components are only dependent on the dimensions of the diagram and some constants
 * this dimensions are are controlled by the size of the parent container
 *
 * references:
 * https://www.weather.gov/jetstream/skewt
 * https://www.weather.gov/source/zhu/ZHU_Training_Page/convective_parameters/skewt/skewtinfo.html
 */
import React from "react";
import * as d3 from "d3";
// top level imports hooks and
import {
  PathElementGenerator,
  type LineProps,
  LineElementGenerator,
} from "../../../../common/d3-react";
import { useSkewT } from "../../hooks";
import { getElevation, dryLapse, moistTemperatureGradient } from "../../thermo";
import { ABSOLUTE_ZERO } from "../../thermo/constants";

// diagram imports
import {
  PRESSURE,
  TEMPERATURE,
  TANGENT,
  ADIABATIC_LAPSE_RATE_DATA,
  ENVIRONMENTAL_LAPSE_RATE_DATA,
} from "./constants";
const ZERO_CELSIUS = (ABSOLUTE_ZERO - ABSOLUTE_ZERO) as Celsius;
const NEGATIVE_20_CELSIUS = (ZERO_CELSIUS - 20) as Celsius;

/**
 * (Isobars) - Lines of equal pressure.
 * They run horizontally from left to right and are labeled on the left side of the diagram.
 * Pressure is given in increments of 100 mb and ranges from 1050 to 100 mb.
 * Notice the spacing between isobars increases in the vertical (thus the name Log P).
 */
function IsoBars(props: LineProps): JSX.Element {
  const { dimensions, scales } = useSkewT();
  return (
    <LineElementGenerator //
      data={PRESSURE.RANGE}
      x1={-dimensions.width}
      x2={2 * dimensions.width}
      y1={scales.y}
      y2={scales.y}
      {...props}
    />
  );
}
/**
 * (Isotherms) - Lines of equal temperature.
 * They run from the southwest to the northeast (thus the name skew) across the diagram and are SOLID.
 * Increment are given for every 10 degrees in units of Celsius. They are labeled at the bottom of the diagram.
 */
function IsoTherms({ stroke = "red", ...props }: LineProps): JSX.Element {
  const { dimensions, scales } = useSkewT();
  return (
    <LineElementGenerator //
      data={TEMPERATURE.RANGE}
      x1={(d) =>
        scales.x(d) +
        (scales.y(PRESSURE.BASE) - scales.y(PRESSURE.TOP)) / TANGENT
      }
      x2={scales.x}
      y1={0}
      y2={dimensions.height}
      // stroke='steelblue'
      stroke={(d) =>
        d === ZERO_CELSIUS || d === NEGATIVE_20_CELSIUS ? "steelblue" : stroke
      }
      {...props}
    />
    // return (
    // 	<>
    // 		{TEMPERATURE.RANGE.map((d, i) => {
    // 			return (
    // 				<line //
    // 					key={`skewt-isotherm-${i}`}
    // 					x1={scales.x(d) + (scales.y(PRESSURE.BASE) - scales.y(PRESSURE.TOP)) / TANGENT}
    // 					x2={scales.x(d) - 0.5}
    // 					y1={0}
    // 					y2={dimensions.height}
    // 					stroke={d === ZERO_CELSIUS || d === NEGATIVE_20_CELSIUS ? 'steelblue' : stroke}
    // 					hidden={props.hidden}
    // 					{...props}
    // 				/>
    // 			);
    // 		})}
    // 	</>
  );
}

/**
 * (Isohumes) - Lines of equal saturation mixing ratio.
 * The dash-dotted curves that slope upward and to the right on the 
 * thermodynamic diagram are saturation mixing ratio lines, or isohumes. 
 * They describe the saturation mixing ratio of air and are labeled in 
 * grams per kilogram (g/kg) along the bottom of the diagram. 
 * For any particular pressure and temperature—that is, for any particular 
 * location on the diagram—the isohume passing through that location tells 
 * you the maximum amount (mass) of water vapor that could be present in 
 * each kilogram of dry air at that temperature and pressure.
 * 
 * Thermodynamic diagrams show only relations between temperature, pressure, 
 * and saturation mixing ratio but show nothing directly about mixing ratio, 
 * dew-point temperature, or relative humidity. 
 * However, if we know either a parcel's dew point temperature, its mixing ratio, 
 * or its relative humidity (in addition to its temperature and pressure), 
 * then we can determine the others indirectly from the diagram. Similarly, 
 * if a parcel's temperature, pressure, and/or moisture content changes, then 
 * we can determine changes in the other quantities.
  To do this we take advantage of the definition of dew point temperature and 
  the relation between relative humidity, mixing ratio and saturation mixing ratio. 
  The reasoning needed to do this is described in our text as well as in class.
*/

/**
 *  Rate of cooling (depends on moisture content of air) of a rising saturated parcel of air.
 *  These lines slope from the south toward the northwest.
 *  The MALR increases with height since cold air has less moisture content that warm air.
 * @param {SkewT.GElementProps} props the props are passed to the GElement component which is a wrapper for the SVG g element
 * @returns
 * @see https://github.com/rittels/skewt-js/blob/master/src/skewt.mjs#L319
 */
function MoistAdiabats(props: SkewT.PathElementProps): JSX.Element {
  if (props.hidden) return <></>;

  const { scales } = useSkewT();

  let tempK: Kelvin;
  const lineGenerator = React.useMemo(
    () =>
      d3
        .line<Celsius>()
        .curve(d3.curveLinear)
        .x((d, i) => {
          // access the current pressure level from the PRESSURE.RANGE array
          const pressure = PRESSURE.RANGE[i];
          // if this is the first iteration, then the temperature is the current temperature, converted to Kelvin
          if (i === 0) tempK = d - ABSOLUTE_ZERO;
          // otherwise, the temperature is the previous temperature plus the adiabatic lapse rate for the current pressure level
          else
            tempK +=
              moistTemperatureGradient(pressure, tempK) * PRESSURE.INTERVAL;
          // then every thing is scaled to the diagram
          return (
            scales.x(tempK + ABSOLUTE_ZERO) +
            (scales.y(PRESSURE.BASE) - scales.y(pressure)) / TANGENT
          );
        })
        .y((_, i) => scales.y(PRESSURE.RANGE[i])),
    [scales]
  );
  return (
    <PathElementGenerator
      data={ADIABATIC_LAPSE_RATE_DATA}
      lineGenerator={lineGenerator}
      {...props}
    />
  );
}

/**
 * (Dry adiabatic lapse rate) - Rate of cooling (10 degrees Celsius per kilometer) of a rising unsaturated parcel of air.
 * These lines slope from the southeast to the northwest and are SOLID. Lines gradually arc to the North with height.
 */
function DryAdibats(props: SkewT.PathElementProps): JSX.Element {
  const { scales } = useSkewT();

  const lineGenerator = d3
    .line<Kelvin>()
    .curve(d3.curveLinear)
    .x((d, i) => {
      const pressure = PRESSURE.RANGE[i];
      return (
        scales.x(
          dryLapse(pressure, d - ABSOLUTE_ZERO, PRESSURE.BASE) + ABSOLUTE_ZERO
        ) +
        (scales.y(PRESSURE.BASE) - scales.y(pressure)) / TANGENT
      );
    })
    .y((_, i) => scales.y(PRESSURE.RANGE[i]));

  return (
    <PathElementGenerator
      data={ADIABATIC_LAPSE_RATE_DATA}
      lineGenerator={lineGenerator}
      {...props}
    />
  );
}
function EnvironmentalLapseRate(props: SkewT.PathElementProps): JSX.Element {
  if (props.hidden) return <></>;
  const { scales } = useSkewT();

  const lineGenerator = React.useMemo(
    () =>
      d3
        .line<Millibar>()
        .curve(d3.curveLinear)
        .x((d) => {
          const tempC =
            d > PRESSURE.AT_11KM ? 15 - getElevation(d) * 0.00649 : -56.5; // 6.49 deg per 1000 m
          return (
            scales.x(tempC) + (scales.y(PRESSURE.BASE) - scales.y(d)) / TANGENT
          );
        })
        .y(scales.y),
    [scales]
  );

  return <path d={lineGenerator(ENVIRONMENTAL_LAPSE_RATE_DATA)!} {...props} />;
}
export {
  IsoTherms,
  IsoBars,
  EnvironmentalLapseRate,
  DryAdibats,
  MoistAdiabats,
};
