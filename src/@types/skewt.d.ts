// Type definitions for SkewT Log-P Diagram
type NativePointerEvent = PointerEvent;

declare namespace SkewT {
  /////////////////////////////////////////
  //      Skew-T Dataset
  /////////////////////////////////////////
  // the skew-t dataset is for a fixed x, y location
  // with a vertical and temporal dimension
  type Dataset = { validTime: string; datums: Datums }[];
  // datums represent a single point in in that temporal dimension and includes a vertical dimension
  type Datums = Datum[];
  // a single datum represents a point in space and time ie: fixed x,y,z, and t
  type Datum = {
    pressure: Millibar;
    height: number;
    temperature: Celsius;
    dewPoint: Celsius;
    windDirection: number;
    windSpeed: number;
  };
  // the dataState is used to control the data that is displayed in the skew-t
  // mouse & pointer events will trigger changes to the dataState and force a re-render
  interface DataState {
    timeIndex: number;
    pressureLevel: Millibar;
  }
  /////////////////////////////////////////
  //      Skew-T SVG
  /////////////////////////////////////////
  // the dimensions of the svg are also managed by state but should not be confused with the dimensions of the data
  interface Dimensions {
    height: number;
    width: number;
  }
  // a change to the sizing dimensions will trigger the scales to be updated
  interface Scales {
    x: d3.ScaleLinear<number, number, never>;
    y: d3.ScaleLogarithmic<number, number, never>;
  }
  // the axes are built from the scales
  interface Axes {
    x0: d3.Axis<d3.NumberValue>;
    y0: d3.Axis<d3.NumberValue>;
    y1: d3.Axis<d3.NumberValue>;
    y2: d3.Axis<d3.NumberValue>;
  }
  /////////////////////////////////////////
  //      Skew-T State
  /////////////////////////////////////////
  // all of the state is managed in a single object that is passed to the context provider
  // and can be accessed by any of the child components using the useSkewT hook
  interface State {
    // Dataset State
    dataset: Dataset;
    datums: Datums;
    validTimes: Date[];
    pressureLevels: Millibar[];
    metadata?: TARP.Metadata;
  }
  interface Context extends State {
    setPartialState: (partialState: Partial<SkewT.State>) => void;
  }
  interface GElementProps extends React.SVGProps<SVGGElement> {
    hidden?: boolean;
  }
  interface PathElementProps extends React.SVGProps<SVGPathElement> {
    hidden?: boolean;
  }
  interface LineElementProps extends React.SVGProps<SVGLineElement> {
    hidden?: boolean;
  }
  type PointerEvent = D3PointerEvent<SVGElement>;
}
