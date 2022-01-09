// import type { Selection } from 'd3'
// import defaultTheme from 'lib/theme'



declare namespace SKEWT {

    type PROPS = {
        datums: DATUMS
        theme?: THEME
    }
    type DATUMS = DATUM[]
    type DATUM = {
        press: number;
        hght: number;
        temp: number;
        dwpt: number;
        wdir: number;
        wspd: number;
    }
    type LINEOVEREVENT = (e: any, lineObj: any) => any;
    interface MOUSE_EVENT {
        target: {
            __data__: number | number[];
        };
    }
    interface PRESSURE {
        at11km: number;
        increment: number;
        mbarTicks: number[];
        altTicks: number[];
        base: number;
        log: number[];
        top: number;
    };
    type TEMPERATURE = {
        mid: number;
        range: number;
        skew: number[];
    }
    type MARGIN = {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };

    interface SCALES {
        tan: number;
        x: ScaleLinear<number, number, never>;
        y: ScaleLogarithmic<number, number, never>;
    }
    interface AXES {
        x0: d3.Axis<d3.AxisDomain>;
        y0: d3.Axis<d3.AxisDomain>;
        y1: d3.Axis<d3.AxisDomain>;
        y2: d3.Axis<d3.AxisDomain>;
    }
    interface LINE_GENERATORS {
        temp: d3.Line<[number, number]>;
        dewpt: d3.Line<[number, number]>;
        elr: d3.Line<[number, number]>;
        dalr: d3.Line<[number, number]>;
        malr: d3.Line<[number, number]>;
        isohume: d3.Line<[number, number]>;
    }
    interface DIMS {
        height: number
        width: number

    }
    // scales: null,
    // lineGen: null,
    type ALL = number[][];
    interface STATE {
        initialized: boolean
        // theme: THEME
        T: TEMPERATURE
        P: PRESSURE
        margin: MARGIN
        all: ALL
        dims: DIMS
        datums: DATUMS | null
        scales: SCALES | null
        lineGen: LINE_GENERATORS | null
        axes: AXES | null

    }
}


namespace USED3 {
    //Selection<any, unknown, null, undefined>
    type RENDER = (element: d3.Selection<any, unknown, null, undefined>) => { [key: string]: any } | void
    type DEPS = React.DependencyList

}


// ... 5 more ...;
// _all: number[][];
// }