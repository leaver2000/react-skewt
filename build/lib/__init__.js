import {scaleLinear, scaleLog, axisBottom, axisLeft, axisRight, range as arrange} from "../_snowpack/pkg/d3.js";
import {pressureFromElevation} from "./atmo2.js";
export const margin = {top: 20, right: 20, bottom: 20, left: 20};
export const deg2rad = Math.PI / 180;
export const tangent = Math.tan(45 * deg2rad);
const top = 50;
const base = 1050;
const increment = -50;
const mid = 0;
const range = 50;
const dryAdiabticLapseRate = scaleLinear().domain([mid - range * 2, mid + range * 4]).ticks(36);
const mbarTicks = arrange(base, top - 50, -25);
var altTicks = [];
for (let i = 0; i < 2e4; i += 1e4 / 3.28084)
  altTicks.push(pressureFromElevation(i));
export const all = Array.from(dryAdiabticLapseRate, (dalrValue) => Array.from(mbarTicks, () => dalrValue));
export const T = {mid, range};
export const P = {
  at11km: pressureFromElevation(11e3),
  increment,
  mbarTicks,
  altTicks,
  base,
  top
};
export const SKEW_T = scaleLinear().domain([mid - range * 3, mid + range]).ticks(24);
export const LOG_P = arrange(base, top - 50, increment);
export const dims2Scales = ({width, height}) => ({
  x: scaleLinear().range([-width / 2, width + width / 2]).domain([mid - range * 2, mid + range * 2]),
  y: scaleLog().range([0, height]).domain([top, base])
});
export const scales2Axes = ({x, y}) => {
  const x0 = axisBottom(x).tickSize(0).ticks(40);
  const y0 = axisLeft(y).tickSize(0).tickValues(LOG_P.filter((p) => p % 100 === 0 || p === 50 || p === 150));
  const y1 = axisRight(y).tickSize(5).tickValues(mbarTicks);
  const y2 = axisLeft(y).tickSize(2).tickValues(altTicks);
  return {x0, y0, y1, y2};
};
