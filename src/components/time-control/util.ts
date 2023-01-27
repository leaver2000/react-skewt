import * as d3 from "d3";

export interface InterpolatedResults {
  timeIndex?: number;
  pressureLevel?: Millibar;
}

export type PointerCallback = (
  interpolatedResults: Partial<InterpolatedResults>,
  e: D3SVGPointerEvent
) => void;

export interface WindDatum {
  windDirection: number;
  windSpeed: number;
}

// an interface with 2 unique types and unknown filed names
export interface ControlData {
  temperature: Celsius[];
  dewPoint: Celsius[];
  wind: WindDatum[];
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

export function unpackDatasetAtLevel(
  dataset: SkewT.Dataset,
  pressureLevel: Millibar
): ControlData {
  // the dataset is reduced to flatten the data at a specific level into arrays of temperature, dewPoint, and wind
  let results = { temperature: [], dewPoint: [], wind: [] } as ControlData;
  for (const { datums } of dataset) {
    const datum = getDatumAtLevel(datums, pressureLevel);
    results.temperature.push(datum.temperature);
    results.dewPoint.push(datum.dewPoint);
    results.wind.push({
      windDirection: datum.windDirection,
      windSpeed: datum.windSpeed,
    });
  }

  return results;
}

export function interpolateTime(
  start: number,
  stop: number,
  amountOfSteps: number,
  offsetX: number
) {
  const x = d3
    .scaleLinear()
    .range([start, stop])
    .domain([start, amountOfSteps]);

  return clampIndex(Math.round(x.invert(offsetX)), amountOfSteps);
}

export const callbackFactory =
  (callback: PointerCallback, dataLength: number) => (e: D3SVGPointerEvent) => {
    const rect = e.currentTarget!.getBoundingClientRect();
    const results = {
      timeIndex: interpolateTime(0, rect.width, dataLength, e.offsetX),
    };
    callback(results, e);
  };
