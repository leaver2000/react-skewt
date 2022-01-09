import * as atm from './atmo';
import { pressureFromElevation, dryLapse } from './atmo2';
import { line, curveLinear } from 'd3';
export const pAt11km = pressureFromElevation(11000);
const K0 = 273.15;

export default class LineGenerators {
    // scales pressure
    constructor(s, p) {
        this.state = { ...s, ...p };
    }

    temp() {
        const { x, y, tan, base } = this.state;
        return line() //
            .curve(curveLinear)
            .x(function (d, i) {
                return x(d.temp) + (y(base) - y(d.press)) / tan;
            })
            .y(function (d, i) {
                return y(d.press);
            });
    }
    dewpt() {
        const { x, y, tan, base } = this.state;
        return line()
            .curve(curveLinear)
            .x(function (d) {
                // console.log(d);
                return x(d.dwpt) + (y(base) - y(d.press)) / tan;
            })
            .y(function (d, i) {
                return y(d.press);
            });
    }

    elr() {
        const { x, y, tan, base } = this.state;
        return line()
            .curve(curveLinear)
            .x(function (d, i) {
                // let e = atm.getElevation2(d);
                let t = d > pAt11km ? 15 - atm.getElevation(d) * 0.00649 : -56.5; //6.49 deg per 1000 m
                return x(t) + (y(base) - y(d)) / tan;
            })
            .y(function (d, i) {
                return y(d);
            });
    }

    dalr() {
        const { x, y, tan, log, base } = this.state;
        return line()
            .curve(curveLinear)
            .x((d, i) => {
                return !!log[i] ? x(dryLapse(log[i], K0 + d, base) - K0) + (y(base) - y(log[i])) / tan : null;
            })
            .y((_, i) =>
                // console.log(log[i]);
                !!log[i] ? y(log[i]) : null
            );
    }
    malr() {
        // const moving = false;
        const { x, y, tan, log, base, increment } = this.state;
        let temp;
        return line()
            .curve(curveLinear)
            .x(function (d, i) {
                // console.log(increment);

                temp = i === 0 ? K0 + d : temp + atm.moistGradientT(log[i], temp) * increment; //(false ? (top - base) / 4 : increment);
                // console.log(x(temp - K0) + (y(base) - y(log[i])) / tan);
                // console.log(K0 + d);
                return x(temp - K0) + (y(base) - y(log[i])) / tan;
            })
            .y(function (d, i) {
                return y(log[i]);
            });
    }

    isohume() {
        const { x, y, tan, log, base } = this.state;
        var mixingRatio;
        var temp;
        return line()
            .curve(curveLinear)
            .x(function (d, i) {
                //console.log(d);
                if (i === 0) mixingRatio = atm.mixingRatio(atm.saturationVaporPressure(d + K0), log[i]);
                temp = atm.dewpoint(atm.vaporPressure(log[i], mixingRatio));
                return x(temp - K0) + (y(base) - y(log[i])) / tan;
            })
            .y(function (d, i) {
                return y(log[i]);
            });
    }
    makeAllLineGenerators() {
        return { temp: this.temp(), dewpt: this.dewpt(), elr: this.elr(), dalr: this.dalr(), malr: this.malr(), isohume: this.isohume() };
    }
}