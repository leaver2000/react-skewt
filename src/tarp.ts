import { ABSOLUTE_ZERO } from "./thermo/constants"


interface Container {
  [validTime: string]: {
    [level: string]: {
      [parameter: string]: number
    }
  }
}
enum Parameters {
  windDirection = "dir",
  windSpeed = "speed",
  temperature = "temp",
  dewPoint = "dewpt",
  height = "gph",
}

const ParamKeyMap = {} as { [key: string]: string }
Object.entries(Parameters).forEach(([key, value]) => {
  ParamKeyMap[value] = key
})


class Tarp {
  constructor(public metadata: TARP.Metadata, public data: TARP.Data[]) {}
  /**
   * Tarp data structure is a bit different than the skewT data structure
   * 
   * - tarp nests data by parameter, level, and time
   * - skewT nests time, level, and parameter
   * 
   * so the entire dataset needs to be restructured 
   */
  toSkewT(): SkewT.Dataset {
    // function handleTarpData({ data }: TARP.Dataset): SkewT.Dataset {
    // initialize the container object that will be used to restructure the data
    const container: Container = {}
    // iterate over each parameter
    this.data.forEach(({ parameter, levels }) => {
      const paramKey = ParamKeyMap[parameter]
      // only looking for wind, temperature, dew point, and height
      if (!Object.values(Parameters).includes(parameter as Parameters)) return
      // iterate over each level
      levels.forEach(({ level, values }) => {
        // not interested in surface data for now
        if (level === "surface") return
        // iterate over each time
        values.forEach(({ value, validTime }) => {
          // only interested in numeric values
          if (!value || typeof value !== 'number') return
          if (!container[validTime]) {
            container[validTime] = {}
          }
          if (!container[validTime][level]) {
            container[validTime][level] = {}
          }

          if (parameter === Parameters.temperature || parameter === Parameters.dewPoint) {
            value += ABSOLUTE_ZERO
          }
          container[validTime][level][paramKey] = value
        })
      })
    })
    // convert the container to the skewT data structure
    return Object.entries(container).map(([validTime, levels]) => {

      return {
        validTime,
        data: Object.entries(levels).map(([level, parameters]) => {
          // strip mb from level and convert to a number
          const pressure = Number(level.replace("mb", ""))
          return {
            pressure,
            ...parameters,
          }
        })
      }
    }) as SkewT.Dataset


  }
}


export default Tarp