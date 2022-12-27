import {
  ABSOLUTE_ZERO,
  SPECIFIC_GAS_CONSTANT,
  PRESSURE_FOR_DRY_AIR_CONSTANT,
  SATURATION_VAPOR_RATIO,
  HEAT_OF_VAPORIZATION,
  MOLECULAR_WEIGHT_RATIO,
  L,
  g,
} from "./constants";

const pressureFromElevation = (
  elevation: Feet,
  referencePressure = 1013.25 as Millibar
): Millibar =>
  //
  Math.pow(-((elevation * 3.28084) / 145366.45 - 1), 1 / 0.190284) *
  referencePressure;

/**
 * Computes the temperature at the given pressure assuming dry processes.
 *
 *  tempKRef is the starting temperature at p0 (degree Celsius).
 */
const dryLapse = (pressure: Millibar, temp: Celsius, p0: number) =>
  //
  temp *
  Math.pow(
    pressure / p0,
    SPECIFIC_GAS_CONSTANT / PRESSURE_FOR_DRY_AIR_CONSTANT
  );

//to calculate isohume lines:
//1.  Obtain saturation vapor pressure at a specific temperature = partial pressure at a specific temperature where the air will be saturated.
//2.  Mixing ratio:  Use the partial pressure where air will be saturated and the actual pressure to determine the degree of mixing,  thus what % of air is water.
//3.  Having the mixing ratio at the surface,  calculate the vapor pressure at different pressures.
//4.  Dew point temperature can then be calculated with the vapor pressure.

/**	Computes the mixing ration of a gas. */
function mixingRatio(
  partialPressure: number,
  totalPressure: Millibar,
  molecularWeightRatio = MOLECULAR_WEIGHT_RATIO
) {
  return (
    (molecularWeightRatio * partialPressure) / (totalPressure - partialPressure)
  );
}

/** Computes the saturation mixing ratio of water vapor.*/
const saturationMixingRatio = (pressure: Millibar, temp: Celsius) =>
  mixingRatio(saturationVaporPressure(temp), pressure);

/**Computes the saturation water vapor (partial) pressure*/
function saturationVaporPressure(temp: Celsius) {
  return SATURATION_VAPOR_RATIO * Math.exp((17.67 * temp) / (temp + 243.5));
}
/**
 * Saturation Vapor Pressure
 * @param t Temperature in Celsius
 * @returns Saturation Vapor Pressure in hPa
 * @see https://www.weather.gov/media/epz/wxcalc/vaporPressure.pdf
 * */
function saturationVaporPressureAlt(tempC: number): number {
  let es: number;
  if (tempC >= 0) {
    es =
      Math.exp(34.494 - 4924.99 / (tempC + 237.1)) /
      Math.pow(tempC + 105, 1.57);
  } else {
    es = Math.exp(43.494 - 6545.8 / (tempC + 278)) / Math.pow(tempC + 868, 2);
  }
  return es / 100;
}
/**A typical value is around 1.5 °C/1,000 ft */
function moistGradientT(pressure: Millibar, temp: Kelvin) {
  const smRatio = saturationMixingRatio(pressure, temp + ABSOLUTE_ZERO);
  const n = SPECIFIC_GAS_CONSTANT * temp + HEAT_OF_VAPORIZATION * smRatio;
  const d =
    PRESSURE_FOR_DRY_AIR_CONSTANT +
    (Math.pow(HEAT_OF_VAPORIZATION, 2) * smRatio * MOLECULAR_WEIGHT_RATIO) /
      (SPECIFIC_GAS_CONSTANT * Math.pow(temp, 2));
  return (1 / pressure) * (n / d);
}
/**
 * Computes water vapor (partial) pressure.
 *
 * */
function vaporPressure(pressure: Millibar, mixingRatio: number) {
  return (pressure * mixingRatio) / (MOLECULAR_WEIGHT_RATIO + mixingRatio);
}
/**	Computes the ambient dewPoint given the vapor (partial) pressure. */
function dewPoint(pressure: Millibar): Celsius {
  const log = Math.log(pressure / SATURATION_VAPOR_RATIO);
  return (243.5 * log) / (17.67 - log) - ABSOLUTE_ZERO;
}
function getElevation(pressure: Millibar, p0 = 1013.25) {
  const t0 = 288.15;
  return (
    (t0 / L) * (Math.pow(pressure / p0, (-L * SPECIFIC_GAS_CONSTANT) / g) - 1)
  );
}

export {
  dewPoint,
  dryLapse,
  getElevation,
  mixingRatio,
  moistGradientT,
  pressureFromElevation,
  saturationVaporPressure,
  saturationMixingRatio,
  vaporPressure,
};
