import * as d3 from "d3";
import { pressureFromElevation } from "../../thermo";

const DEG2RAD = Math.PI / 180;
/**skew-t the temperature lines by 45° */
const TANGENT = Math.tan(45 * DEG2RAD);

// initialize some global constants for the chart
// PRESSURE constants
// these control the y-axis of the diagram
const PRESSURE_BASE = 1_000 as Millibar;
const PRESSURE_TOP = 50 as Millibar;
const PRESSURE_INTERVAL = -25 as Millibar;
// the PRESSURE object is a constant object that contains all the constants for the PRESSURE axis
const PRESSURE = {
  TOP: PRESSURE_TOP,
  BASE: PRESSURE_BASE,
  INTERVAL: PRESSURE_INTERVAL,
  RANGE: d3.range(
    PRESSURE_BASE,
    PRESSURE_TOP + PRESSURE_INTERVAL,
    PRESSURE_INTERVAL
  ) as Millibar[],
  AT_11KM: pressureFromElevation(11_000 as Feet),
  TICKS: d3.range(PRESSURE_BASE, 0, PRESSURE_INTERVAL) as Millibar[],
} as const;

// additionally, we need to create a list of altitude values for the PRESSURE y-axis-1 (right side)
const ALTITUDE_TICKS: Millibar[] = [];
for (let i = 0; i < 20_000; i += 10_000 / 3.28084)
  ALTITUDE_TICKS.push(pressureFromElevation(i));

// TEMPERATURE constants
// these control the x-axis of the diagram
const TEMPERATURE_MID = 0 as Celsius;
const TEMPERATURE_MAX = 50 as Celsius; // the right side of the chart

const TEMPERATURE = {
  MID: TEMPERATURE_MID,
  MAX: TEMPERATURE_MAX,
  RANGE: d3
    .scaleLinear()
    .domain([
      TEMPERATURE_MID - TEMPERATURE_MAX * 3,
      TEMPERATURE_MID + TEMPERATURE_MAX,
    ])
    .ticks(24) as Celsius[],
} as const;

// derived constants
export const DRY_ADIABATIC_LAPSE_RATE = d3
  .scaleLinear()
  .domain([
    TEMPERATURE.MID - TEMPERATURE.MAX * 2,
    TEMPERATURE.MID + TEMPERATURE.MAX * 4,
  ])
  .ticks(36) as Celsius[];

const ADIABATIC_LAPSE_RATE_DATA = Array.from(DRY_ADIABATIC_LAPSE_RATE, (d) =>
  Array.from(PRESSURE.RANGE, () => d)
) as Celsius[][];

const ENVIRONMENTAL_LAPSE_RATE_DATA = PRESSURE.RANGE.filter(
  (p) => p > PRESSURE.AT_11KM
).concat([PRESSURE.AT_11KM, PRESSURE.TOP]) as Millibar[];

enum MARGINS {
  TOP = 10,
  RIGHT = 10,
  BOTTOM = 10,
  LEFT = 10,
}

enum ATTRIBUTES {
  CLASS = "skew-t-element",
  CLIP_PATH = "url(#clipper)",
}

export {
  ADIABATIC_LAPSE_RATE_DATA,
  ENVIRONMENTAL_LAPSE_RATE_DATA,
  ALTITUDE_TICKS,
  DEG2RAD,
  TANGENT,
  PRESSURE,
  TEMPERATURE,
  MARGINS,
  ATTRIBUTES,
};
