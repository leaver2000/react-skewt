export const K0 = 273.15;
const DRY_AIR_SPECIFC_GAS_DENSITY = 287;
const DRY_AIR_SPECIFC_HEAT_AT_CONSTANT_PRESSURE = 1005;
const MOLECULAR_WEIGHT_RATIO = 18.01528 / 28.9644;
const HEAT_OF_VAPORIZATION = 2501e3;
const SATURATION_VAPOR_RATIO = 6.112;
const L = -65e-4;
const g = 9.80665;
export const pressureFromElevation = (elevation, refrencePressure = 1013.25) => Math.pow(-(elevation * 3.28084 / 145366.45 - 1), 1 / 0.190284) * refrencePressure;
export const dryLapse = (pressure, tK0, p0) => tK0 * Math.pow(pressure / p0, DRY_AIR_SPECIFC_GAS_DENSITY / DRY_AIR_SPECIFC_HEAT_AT_CONSTANT_PRESSURE);
export function mixingRatio(partialPressure, totalPressure, molecularWeightRatio = MOLECULAR_WEIGHT_RATIO) {
  return molecularWeightRatio * partialPressure / (totalPressure - partialPressure);
}
const saturationMixingRatio = (pressure, tempK) => mixingRatio(saturationVaporPressure(tempK), pressure);
export function saturationVaporPressure(tempK) {
  const tempC = tempK - K0;
  return SATURATION_VAPOR_RATIO * Math.exp(17.67 * tempC / (tempC + 243.5));
}
export function moistGradientT(pressure, tempK) {
  const saturation_mixing_ratio = saturationMixingRatio(pressure, tempK);
  const n = DRY_AIR_SPECIFC_GAS_DENSITY * tempK + HEAT_OF_VAPORIZATION * saturation_mixing_ratio;
  const d = DRY_AIR_SPECIFC_HEAT_AT_CONSTANT_PRESSURE + Math.pow(HEAT_OF_VAPORIZATION, 2) * saturation_mixing_ratio * MOLECULAR_WEIGHT_RATIO / (DRY_AIR_SPECIFC_GAS_DENSITY * Math.pow(tempK, 2));
  return 1 / pressure * (n / d);
}
export function vaporPressure(pressure, mixingRatio2) {
  return pressure * mixingRatio2 / (MOLECULAR_WEIGHT_RATIO + mixingRatio2);
}
export function dewpoint(pressure) {
  const val = Math.log(pressure / SATURATION_VAPOR_RATIO);
  return K0 + 243.5 * val / (17.67 - val);
}
export function getElevation(pressure, p0 = 1013.25) {
  const t0 = 288.15;
  return t0 / L * (Math.pow(pressure / p0, -L * DRY_AIR_SPECIFC_GAS_DENSITY / g) - 1);
}
