/**
 * Celsius + K0 -> Kelvin
 * Kelvin - K0 -> Celsius
 * */
export const K0 = 273.15;
/**
 * The specific gas constant for dry air is 287.058 J/(kg·K) in SI units
 *
 * // const Rd = 287;
 * */
const DRY_AIR_SPECIFC_GAS_DENSITY = 287;
/**
 * Specific heat at constant pressure for dry air
 * The specific heat of a gas at constant pressure is defined as the quantity of heat required to raise the temperature of unit mass of the gas by 1 degree, the pressure remaining constant during heating. It is given the symbol cp.
 *
 * // const Cpd = 1005;
 */
const DRY_AIR_SPECIFC_HEAT_AT_CONSTANT_PRESSURE = 1005;
/**
 * Molecular weight ratio
 *
 * // const epsilon = 18.01528 / 28.9644;
 * */
const MOLECULAR_WEIGHT_RATIO = 18.01528 / 28.9644;

/**
 * ### Heat of vaporization of water
 * Just as it takes a lot of heat to increase the temperature of liquid water, it also takes an unusual amount of heat to vaporize a given amount of water, because hydrogen bonds must be broken in order for the molecules to fly off as gas. That is, water has a high heat of vaporization, the amount of energy needed to change one gram of a liquid substance to a gas at constant temperature.
 * Water’s heat of vaporization is around 540 cal/g at 100 °C, water's boiling point. Note that some molecules of water – ones that happen to have high kinetic energy – will escape from the surface of the water even at lower temperatures.
 *
 * //const Lv = 2501000;
 */
const HEAT_OF_VAPORIZATION = 2501000;

/**
 * Ratio of the specific gas constant of dry air to the specific gas constant for water vapour
 * //const satPressure0c = 6.112;
 */
const SATURATION_VAPOR_RATIO = 6.112;
// const satPressure0c = 6.112;

const L = -6.5e-3;
const g = 9.80665;

/** */
export const pressureFromElevation = (elevation: number, refrencePressure = 1013.25) =>
	//
	Math.pow(-((elevation * 3.28084) / 145366.45 - 1), 1 / 0.190284) * refrencePressure;

/**
 * Computes the temperature at the given pressure assuming dry processes.
 *
 *  t0 is the starting temperature at p0 (degree Celsius).
 */
export const dryLapse = (pressure: number, tK0: number, p0: number) =>
	//
	tK0 * Math.pow(pressure / p0, DRY_AIR_SPECIFC_GAS_DENSITY / DRY_AIR_SPECIFC_HEAT_AT_CONSTANT_PRESSURE);

//to calculate isohume lines:
//1.  Obtain saturation vapor pressure at a specific temperature = partial pressure at a specific temperature where the air will be saturated.
//2.  Mixing ratio:  Use the partial pressure where air will be saturated and the actual pressure to determine the degree of mixing,  thus what % of air is water.
//3.  Having the mixing ratio at the surface,  calculate the vapor pressure at different pressures.
//4.  Dewpoint temperature can then be calculated with the vapor pressure.

/**	Computes the mixing ration of a gas. */
export function mixingRatio(partialPressure: number, totalPressure: number, molecularWeightRatio = MOLECULAR_WEIGHT_RATIO) {
	return (molecularWeightRatio * partialPressure) / (totalPressure - partialPressure);
}

/** Computes the saturation mixing ratio of water vapor.*/
const saturationMixingRatio = (pressure: number, tempK: number) => mixingRatio(saturationVaporPressure(tempK), pressure);

/**Computes the saturation water vapor (partial) pressure*/
export function saturationVaporPressure(tempK: number) {
	const tempC = tempK - K0;
	return SATURATION_VAPOR_RATIO * Math.exp((17.67 * tempC) / (tempC + 243.5));
}
/**A typical value is around 1.5 °C/1,000 ft */
export function moistGradientT(pressure: number, tempK: number) {
	const saturation_mixing_ratio = saturationMixingRatio(pressure, tempK);
	const n = DRY_AIR_SPECIFC_GAS_DENSITY * tempK + HEAT_OF_VAPORIZATION * saturation_mixing_ratio;
	const d = DRY_AIR_SPECIFC_HEAT_AT_CONSTANT_PRESSURE + (Math.pow(HEAT_OF_VAPORIZATION, 2) * saturation_mixing_ratio * MOLECULAR_WEIGHT_RATIO) / (DRY_AIR_SPECIFC_GAS_DENSITY * Math.pow(tempK, 2));
	return (1 / pressure) * (n / d);
}
/**
 * Computes water vapor (partial) pressure.
 *
 * */
export function vaporPressure(pressure: number, mixingRatio: number) {
	return (pressure * mixingRatio) / (MOLECULAR_WEIGHT_RATIO + mixingRatio);
}
/**	Computes the ambient dewPoint given the vapor (partial) pressure. */
export function dewPoint(pressure: number) {
	const val = Math.log(pressure / SATURATION_VAPOR_RATIO);
	return K0 + (243.5 * val) / (17.67 - val);
}
export function getElevation(pressure: number, p0 = 1013.25) {
	const t0 = 288.15;
	return (t0 / L) * (Math.pow(pressure / p0, (-L * DRY_AIR_SPECIFC_GAS_DENSITY) / g) - 1);
}
