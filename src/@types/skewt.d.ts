declare namespace Skewt {
	type GElement = Element;
	type Dataset = Datum[][];
	type Datums = Datum[];
	type Datum = {
		pressure: number;
		height: number;
		temperature: number;
		dewPoint: number;
		windDirection: number;
		windSpeed: number;
	};

	type Dispatch =  //
		| { datums: Skewt.Datum[] } //
		| { scales: Skewt.Scales }
		| { axes: Skewt.Axes }
		| { dims: Skewt.Dims }
		| { windBarbs: Skewt.WindBarbs }
		| { darkMode: boolean }
		| { isSized: boolean };
	/** x & y scales
	 * x = linear skewt for Skewd Temp Lines
	 * y = log pressure lines
	 */
	interface Scales {
		x: d3.ScaleLinear<number, number, never>;
		y: d3.ScaleLogarithmic<number, number, never>;
	}
	interface Axes {
		x0: Axis<NumberValue>;
		y0: Axis<NumberValue>;
		y1: Axis<NumberValue>;
		y2: Axis<NumberValue>;
	}
	// interface WindBarbs {
	// 	[k: string]: SVGElement;
	// }
	interface Dims {
		height: number;
		width: number;
	}

	type SVGGLineElements = 'temperature' | 'dewPoint' | 'isobars' | 'isotherms' | 'isohumes' | 'dryAdiabats' | 'moistAdiabats' | 'envLapseRate';
	interface SVGGLine {
		light: string;
		dark: string;
		strokeWidth: number;
		strokeOpacity: number;
	}
	// rokeOpacity: number;

	interface SVGGRect {
		light: string;
		dark: string;
	}

	type LINEOVEREVENT = (e: any, lineObj: any) => any;
	interface MOUSE_EVENT {
		target: {
			__data__: number | number[];
		};
	}
}
