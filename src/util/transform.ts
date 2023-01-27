import { ABSOLUTE_ZERO } from "../common/constants";
/**
 * TARP parameters
 */
enum Parameters {
    windDirection = "dir",
    windSpeed = "speed",
    temperature = "temp",
    dewPoint = "dewpt",
    height = "gph",
  }
  // inverting the enum to make it easier to look up the key from the value
  const ParamKeyMap = {} as { [key: string]: string };
  Object.entries(Parameters).forEach(([key, value]) => {
    ParamKeyMap[value] = key;
  });
interface Container {
  [validTime: string]: {
    [level: string]: {
      [parameter: string]: number;
    };
  };
}
/**
 * Tarp data structure is a bit different than the SkewT data structure
 *
 * - tarp nests data by parameter, level, and time
 * - skewT nests time, level, and parameter
 *
 * so the entire dataset needs to be restructured
 * @param {TARP.Data[]} tarpData TARP data
 * @returns {SkewT.Dataset} SkewT data
 */
export function tarpToSkewTDataset(tarpData: TARP.Data[]): SkewT.Dataset {
    // function handleTarpData({ data }: TARP.Dataset): SkewT.Dataset {
    // initialize the container object that will be used to restructure the data
    const container = {} as Container;
    // iterate over each parameter
    tarpData.forEach(({ parameter, levels }) => {
      const paramKey = ParamKeyMap[parameter];
      // only looking for wind, temperature, dew point, and height
      if (!Object.values(Parameters).includes(parameter as Parameters)) return;
      // iterate over each level
      levels.forEach(({ level, values }) => {
        // not interested in surface data for now
        if (level === "surface") return;
        // iterate over each time
        values.forEach(({ value, validTime }) => {
          // only interested in numeric values
          if (!value || typeof value !== "number") return;
          if (!container[validTime]) {
            container[validTime] = {};
          }
          if (!container[validTime][level]) {
            container[validTime][level] = {};
          }
  
          if (
            parameter === Parameters.temperature ||
            parameter === Parameters.dewPoint
          ) {
            value += ABSOLUTE_ZERO;
          }
          container[validTime][level][paramKey] = value;
        });
      });
    });
    // convert the container to the skewT data structure
    const result = Object.entries(container).map(([validTime, levels]) => {
      return {
        validTime,
        datums: Object.entries(levels).map(([level, parameters]) => {
          // strip mb from level and convert to a number
          const pressure = Number(level.replace("mb", ""));
          return {
            pressure,
            ...parameters,
          };
        }),
      };
    }) as SkewT.Dataset;
  
    return result;
  }
  