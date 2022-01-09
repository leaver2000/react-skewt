// Gas constant for dry air at the surface of the Earth
const Rd = 287;
// Specific heat at constant pressure for dry air
const Cpd = 1005;
// Molecular weight ratio

/**@method */
const pressureFromElevation = (e: number, refp = 1013.25) =>
    //
    Math.pow(-((e * 3.28084) / 145366.45 - 1), 1 / 0.190284) * refp;

/**
 * Computes the temperature at the given pressure assuming dry processes.
 *
 *  t0 is the starting temperature at p0 (degree Celsius).
 */
const dryLapse = (p: number, tK0: number, p0: number) =>
    //
    tK0 * Math.pow(p / p0, Rd / Cpd);

export { pressureFromElevation, dryLapse };