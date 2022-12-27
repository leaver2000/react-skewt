// Type definitions for SkewT Log-P Diagram

declare namespace TARP {
  interface Values {
    value: number | string | null;
    validTime: string;
    edited: boolean;
    entry_id: string;
  }

  interface Levels {
    level: string;
    values: Values[];
  }

  interface Data {
    /** The name of the parameter */
    parameter: string;
    levels: Levels[];
  }
  interface Metadata {
    [key: string]: string;
  }
  interface Dataset {
    metadata: {
      [key: string]: string;
    };
    data: Data[];
  }
}

declare namespace SkewT {
  interface GElementProps extends React.SVGProps<SVGGElement> {
    hidden?: boolean;
  }

  type Datum = {
    pressure: number;
    height: number;
    temperature: number;
    dewPoint: number;
    windDirection: number;
    windSpeed: number;
  };

  type Datums = Datum[];

  type Dataset = { validTime: string; data: Datums }[];
  interface DataState {
    timeIndex: number;
    pressureLevel: number;
  }

  interface Scales {
    xLinear: d3.ScaleLinear<number, number, never>;
    yLogarithmic: d3.ScaleLogarithmic<number, number, never>;
  }
  /** DataState is the state of the data that is being displayed */

  interface Axes {
    x0: d3.Axis<d3.NumberValue>;
    y0: d3.Axis<d3.NumberValue>;
    y1: d3.Axis<d3.NumberValue>;
    y2: d3.Axis<d3.NumberValue>;
  }

  interface Dimensions {
    height: number;
    width: number;
  }

  interface SVGGLine {
    light: string;
    dark: string;
    strokeWidth: number;
    strokeOpacity: number;
  }

  interface State {
    dataState: DataState;
    dataset: Dataset;
    data: Datums;
    validTime: Date;
    //
    metadata?: TARP.Metadata;
    //
    scales: Scales;
    axes: Axes;
    dimensions: Dimensions;
  }
  interface Context extends State {
    setState: React.Dispatch<React.SetStateAction<SkewT.State>>;
  }
}
// establishing some unit types, this is a bit of a hack
// but it works for catching errors in the code

// Temperature units
enum KelvinTemperature {
  _ = 0,
}
declare type Kelvin = number & KelvinTemperature;
enum CelsiusTemperature {
  _ = 1,
}
declare type Celsius = number & CelsiusTemperature;
enum FahrenheitTemperature {
  _ = 2,
}
declare type Fahrenheit = number & FahrenheitTemperature;

// Pressure units
enum HectoPascalPressure {
  _ = 3,
}
declare type HectoPascal = number & HectoPascalPressure;
enum MillibarPressure {
  _ = 4,
}
declare type Millibar = number & MillibarPressure;
enum InchOfMercuryPressure {
  _ = 5,
}
declare type InchOfMercury = number & InchOfMercuryPressure;

// Distance units
enum MeterDistance {
  _ = 6,
}
declare type Meter = number & MeterDistance;
enum KilometerDistance {
  _ = 7,
}
declare type Kilometer = number & KilometerDistance;
enum FeetDistance {
  _ = 8,
}
declare type Feet = number & FeetDistance;
