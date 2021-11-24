/// <reference types="react-scripts" />
declare module 'react-charts'
declare module 'react-resizable'
declare module 'd3'
// declare module 'chart.js'
// declare module 'react-chartjs-2'


declare type AnyObject = Record<string, unknown>;
declare interface CTXState extends Object {
	time: number | null;
	level: number | null;
	icao: string | null;
}

declare interface CTXController extends Object {
	state: CTXState;
	icao: string | null;
	level: string | null;
	time: number | null;
	open: Function;
	close: Function;
	onClick:Function;
	onFocus:Function;
}
declare interface TGeometry extends TGeoJSON {
	type: string;
	coordinates: Array<number>;
}
declare interface TProperties extends TGeoJSON {
	forecastHours: Array<string>;
	basetime: string;
	description: string;
	icao: string;
}
declare interface TGeoJSON<T>extends Object{
	type: string;
	geometry: TGeometry;
	properties: TProperties;
	dataset: T;
}

declare type TSearchParams =  { [key: string]: any } | string | Record<string, string> | URLSearchParams | string[][] | undefined

declare interface SkewtDataset {
	levels: Array<number>;
	data: Array<Array<number>>;
}

// declare interface SkewtResponse {
// 	description: string;
// 	dataset: SkewtDataset;
// }
declare interface TDatums {
	primary: number;
	secondary: number;
}