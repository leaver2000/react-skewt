import { scaleLinear, scaleLog, axisBottom, axisLeft, axisRight } from 'd3';
import LineGenerators from 'lib/generators';
// import * as atm from '../util/atmosphere';
import * as atm from 'lib/atmo'
import { pressureFromElevation } from 'lib/atmo2'
// import { line, curveLinear } from 'd3';
export const pAt11km = pressureFromElevation(11000);
const DEG2RAD = Math.PI / 180;
const K0 = 273.15;
const tan = Math.tan(45 * DEG2RAD);
export const makeScales = (width: number, height: number, { mid, range }: SKEWT.TEMPERATURE, { top, base }: SKEWT.PRESSURE) => ({
    x: scaleLinear()
        .range([-width / 2, width + width / 2])
        .domain([mid - range * 2, mid + range * 2]),
    //
    y: scaleLog().range([0, height]).domain([top, base]),
    tan,
});

export const makeAxes = ({ x, y }: SKEWT.SCALES, { log, mbarTicks, altTicks }) => {
    //
    const x0 = axisBottom(x).tickSize(0).ticks(40); //.orient("bottom");
    //
    const y0 = axisLeft(y)
        .tickSize(0)
        .tickValues(log.filter((p: number) => p % 100 === 0 || p === 50 || p === 150));
    // .tickFormat(format(parseI('.0d'))); //.orient("left");
    //
    const y1 = axisRight(y).tickSize(5).tickValues(mbarTicks); //.orient("right");
    // d3.axisLeft(y).tickSize(2,0).tickValues(altticks);
    const y2 = axisLeft(y).tickSize(2).tickValues(altTicks);

    return { x0, y0, y1, y2 };
};
export const makeLines = (scales: SKEWT.SCALES, P: SKEWT.PRESSURE) => new LineGenerators(scales, P).makeAllLineGenerators();

