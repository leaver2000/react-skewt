import React from 'react'
import { scaleLinear, range as arrange } from 'd3';

export const SkewtCTX = React.createContext(() => {
    const [state, dispatch] = React.useState<SKEWT.STATE>(() => ({
        datums: null,
        scales: null,
        lineGen: null,
        axes: null,

        ...buildState()
    }));

    const setState = React.useCallback((newState: Record<string, any>) => {
        dispatch(({ ...old }) => ({ ...old, ...newState }))
    }, [])
    React.useEffect(() => {
        if (!!state.datums) {

        }
    }, [state.datums])



    return { ...state, setState };
});
const useCTX = () => React.useContext(SkewtCTX)()
export default useCTX



///////
const margin = { top: 30, right: 40, bottom: 20, left: 35 }
const dims = { height: 0, width: 0 }
const initialized = false

// const theme = {
//     status: {
//         danger: 'string'
//     }
// }



const buildState = () => {
    /** pressure */
    const top = 50;
    const base = 1050;
    const increment = -50;
    /** temperature */
    const mid = 0;
    const range = 50;
    const dryAdiabticLapseRate = scaleLinear()
        .domain([mid - range * 2, mid + range * 4])
        .ticks(36);

    const mbarTicks = arrange(base, top - 50, -25);

    var altTicks: number[] = [];
    for (let i = 0; i < 20000; i += 10000 / 3.28084) altTicks.push(pressureFromElevation(i));

    const all = Array.from(dryAdiabticLapseRate, (dalrValue) => Array.from(mbarTicks, () => dalrValue));

    const log = arrange(base, top - 50, increment);

    return {
        T: {
            mid,
            range,
            skew: scaleLinear()
                .domain([mid - range * 3, mid + range])
                .ticks(24),
        },
        P: {
            at11km: pressureFromElevation(11000),
            increment,
            mbarTicks,
            altTicks,
            base,
            log,
            top,
        },
        // theme,
        margin,
        dims,
        initialized,
        all,
    };
};

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
