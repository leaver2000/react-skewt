//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Types

import { ABSOLUTE_ZERO } from "./constants";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Constants
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ROCP = 0.2856;
const ZEROCNK = 273.15;
const EPS = 0.622;
const WD = 850;
const HT = 850;
const HODOSZ = 550;
const HOPXEXPAN = 1;
const iHR = 0;
const SHIFTt = 300;
// pulled from dtMALR
const CONST_CP = 1.03e3;
const CONST_K = 0.286;
const CONST_KELVIN = 273.15;
const CONST_L = 2.5e6;
const CONST_MA = 300.0;
const CONST_RD = 287.0;
const CONST_RV = 461.0;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Thermodynamic Functions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Get Temperature Along Dry Adiabat (C in/out)
 * @param theta
 * @param p
 * @returns Celsius
 */
function DALRtemp(theta: Celsius, p: Millibar): Celsius {
  theta + ZEROCNK;
  const t = (theta + ZEROCNK) * Math.pow(p / 1_000, ROCP);
  return t - ZEROCNK;
}
/**
 * Get Potential Temperature from temp and press
 * @param t
 * @param p
 * @returns
 */
function DALRtheta(t: Celsius, p: Millibar): Celsius {
  return (t + ZEROCNK) * Math.pow(1_000 / p, ROCP) - ZEROCNK;
}
/**
 * Get Pressure Level from Dry Adiabat given temp
 * @param th
 * @param t
 * @returns
 * @see https://www.weather.gov/media/epz/wxcalc/pressure.pdf
 */
function DALRpress(th: number, t: number) {
  return 1_000 / Math.pow((th + ZEROCNK) / (t + ZEROCNK), 1 / ROCP);
}
/**
 *  Get Temperature Along Moist Adiabat
 * @param p
 * @param t
 * @param dp
 * @returns
 */
function dtMALR(p: number, t: number, dp: number) {
  const kelvin = t + CONST_KELVIN;
  const lsbc = (CONST_L / CONST_RV) * (1.0 / CONST_KELVIN - 1.0 / kelvin);
  const rw = 6.11 * Math.exp(lsbc) * (EPS / p);
  const lrwbt = (CONST_L * rw) / (CONST_RD * kelvin);
  const nume = ((CONST_RD * kelvin) / (CONST_CP * p)) * (1.0 + lrwbt);
  const deno = 1.0 + lrwbt * ((EPS * CONST_L) / (CONST_CP * kelvin));
  const gradi = nume / deno;
  const dt = dp * gradi;
  return t - dt;
}
/**
 *  Get Temperature Along Mixing Ratio
 * @param w number
 * @param p number
 */
function mxratio(w: number, p: number): number {
  // const c1 = 0.0498646455
  // const c2 = 2.4082965
  // const c3 = 7.07475
  // const c4 = 38.9114
  // const c5 = 0.0915
  // const c6 = 1.2035
  const es = (p * w) / (w + 622.0);
  const logThing = Math.pow(Math.log(es / 6.11), -1.0);
  return Math.pow((17.269 / 237.3) * (logThing - 1.0 / 17.269), -1.0);
}

function virtualTemperature(t: Celsius, w: number): Celsius {
  w = w / 1000;
  return ((t + ZEROCNK) * (w + EPS)) / (1 + w) / EPS - ZEROCNK;
}

export { DALRtemp, DALRtheta, DALRpress, dtMALR, mxratio, virtualTemperature };
