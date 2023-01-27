import { ABSOLUTE_ZERO } from "../common/constants";
import type { SurfaceParameterValue } from "../tarp";
// need to wrangle the the unit types to get something that make more sense
enum UNITS {
  KELVIN = "K",
  CELSIUS = "C",
  FAHRENHEIT = "F",
  // distance
  INCHES = "in",
  METERS = "m",
  STATUE_MILES = "sm",
  FEET = "ft",
  // speed
  KNOTS = "kt",
  MILLIBARS = "mb",
}

type ValueHandler<T = number> = (value: TARP.Values<TARP.Value>) => T;
const valueEngine = {
  // temperature
  [UNITS.KELVIN]: ({ value }: TARP.Values<number>) => value - 273.15,
  [UNITS.CELSIUS]: ({ value }: TARP.Values<number>) => value,
  [UNITS.FAHRENHEIT]: ({ value }: TARP.Values<number>) => (value - 32) / 1.8,
  // distance
  [UNITS.INCHES]: ({ value }: TARP.Values<number>) => value,
  [UNITS.METERS]: ({ value }: TARP.Values<number>) => value,
  [UNITS.STATUE_MILES]: ({ value }: TARP.Values<number>) => value,
  [UNITS.FEET]: ({ value }: TARP.Values<number>) => value,
  // pressure
  [UNITS.MILLIBARS]: ({ value }: TARP.Values<number>) => value,
  // speed
  [UNITS.KNOTS]: ({ value }: TARP.Values<number>) => value,
} as Record<UNITS, ValueHandler>;

export function getSecondaryParameters(
  tarp: TARP.Data[],
  fieldOne: SurfaceParameterValue,
  fieldTwo: SurfaceParameterValue,
  pressureLevel?: number
) {
  pressureLevel = pressureLevel || 0;
  let primaryField = "";
  let secondaryField = "";
  const data = {} as Record<string, number[]>;
  for (const { title, levels, parameter, unit } of tarp) {
    // if (!Object.values(UNITS).includes(unit as UNITS)) {
    //   console.log(unit);
    // }

    if (parameter === fieldOne) {
      primaryField = title;
    } else if (parameter === fieldTwo) {
      secondaryField = title;
    } else continue;

    const valueHandler =
      valueEngine[unit as UNITS] || (({ value }: TARP.Values<number>) => value);
    data[title] = levels[pressureLevel].values.map(valueHandler);
  }

  return {
    primaryField,
    secondaryField,
    primaryData: data[primaryField],
    secondaryData: data[secondaryField],
  };
}

/**
 * clap the index to the range of the data array to prevent out of bounds errors
 * @param {number} index
 * @param {number} length
 * @returns {number} clamped index
 */
export const clampIndex = (index: number, length: number): number =>
  Math.max(0, Math.min(index, length - 1)); //
/**
 * filter the data to get the index position of the nearest level dimension
 * @param {SkewT.Datums} datums - array of Datums
 * @param {Millibar} pressure  - Millibar value
 * @returns the datum at that level
 */
export const getDatumAtLevel = (
  datums: SkewT.Datums,
  pressure: Millibar
): SkewT.Datum => datums[datums.findIndex((d) => d.pressure === pressure)]; //
