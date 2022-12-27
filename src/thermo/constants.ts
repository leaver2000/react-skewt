/**
 *  `tempK = tempC + ABSOLUTE_ZERO`
 * 
 *  `tempC = tempK - ABSOLUTE_ZERO`
 * */
const ABSOLUTE_ZERO = -273.15 as Kelvin;
// ----------------------------
// Thermodynamic Laws applied to the atmosphere
// ----------------------------
/**
 *  The specific gas constant for dry air is 287.058 J/(kg·K) in SI units
 */
const SPECIFIC_GAS_CONSTANT = 287.058;
/**
 * `Cpd air = 1004 J·kg–1·K–1 for dry air at const. pressure`
 * 
 * Specific heat at constant pressure for dry air
 * the specific heat of a gas at constant pressure is defined as the quantity of heat required to raise the 
 * temperature of unit mass of the gas by 1 degree, the pressure remaining constant during heating. 
 * It is given the symbol cp.
 */
const PRESSURE_FOR_DRY_AIR_CONSTANT = 1004;
/** `Cvd air = 717 J kg–1 K–1 for dry air at const. volume` */
const VOLUME_FOR_DRY_AIR_CONSTANT = 717;
/** `Cliq ≈ 4217.6 J·kg–1·K–1 for liquid water at 0°C`*/
const LIQUID_WATER_AT_0C_CONSTANT = 4217.6;
/** `Cice ≈ 2106 J·kg–1·K–1 for ice at 0°C`*/
const ICE_AT_0C_CONSTANT = 2106;
/** `Cpv = 1850 J·kg–1·K–1 for pure water vapor at 0°C` */
const FREEZING_VAPOR_CONSTANT = 1850;
/*** Molecular weight ratio */
const MOLECULAR_WEIGHT_RATIO = 18.01528 / 28.9644;
/**
 * ### Heat of vaporization of water
 * Just as it takes a lot of heat to increase the temperature of liquid water, 
 * it also takes an unusual amount of heat to vaporize a given amount of water, 
 * because hydrogen bonds must be broken in order for the molecules to fly off as gas. 
 * That is, water has a high heat of vaporization, the amount of energy needed to 
 * change one gram of a liquid substance to a gas at constant temperature.
 * Water’s heat of vaporization is around 540 cal/g at 100 °C, water's boiling point. 
 * 
 * Note that some molecules of water 
 * - ones that happen to have high kinetic energy 
 * - will escape from the surface of the water even at lower temperatures.
*/
const HEAT_OF_VAPORIZATION = 2.501e6;
/**
 * Ratio of the specific gas constant of dry air to the specific gas constant for water vapour
 */
const SATURATION_VAPOR_RATIO = 6.112;
const L = -6.5e-3;
const g = 9.80665;
export {
    SPECIFIC_GAS_CONSTANT,
    PRESSURE_FOR_DRY_AIR_CONSTANT,
    VOLUME_FOR_DRY_AIR_CONSTANT,
    LIQUID_WATER_AT_0C_CONSTANT,
    ICE_AT_0C_CONSTANT,
    FREEZING_VAPOR_CONSTANT,
    // 
    ABSOLUTE_ZERO,
    MOLECULAR_WEIGHT_RATIO,
    HEAT_OF_VAPORIZATION,
    SATURATION_VAPOR_RATIO,
    L,
    g,
}