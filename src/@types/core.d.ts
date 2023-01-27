/**
 * pipe the properties of one interface into another, overriding any matching properties in the first interface
 * @template T - the type to override
 * @template U - the the values to override with 
 * @param {T} interface - the datum
 * @returns {U} the value
 * @example
 * ```ts
 * interface Dimensions { height: number; width: number; }
 * interface AreaDifferenceProps extends PipeProps<React.SVGProps<SVGGElement>, Dimensions> {
 *  primaryField: string;
 *  secondaryField: string;
 *  primaryData: number[];
 *  secondaryData: number[];
 * }
```
 */
type PipeProps<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

type Pair<T> = [T, T];

type Domain = Pair<number>;

interface Dimensions {
  width: number;
  height: number;
}

type D3PointerEvent<T extends SVGElement> = MouseEvent &
  NativePointerEvent &
  React.PointerEvent<T>;

type D3SVGPointerEvent = D3PointerEvent<SVGElement>;

interface WindDatum {
  windDirection: number;
  windSpeed: number;
}

// an interface with 2 unique types and unknown filed names
interface ControlData {
  temperature: Celsius[];
  dewPoint: Celsius[];
  wind: WindDatum[];
}

declare namespace TARP {
  type Value = number | string | null | Kelvin;
  interface Values<T = Value> {
    value: T;
    validTime: string;
    edited: boolean;
    entry_id: string;
  }

  interface Levels {
    level: string;
    values: Values[];
    unit: string;
  }

  interface Data {
    /** The name of the parameter */
    parameter: string;
    title: string;
    unit: string;
    levels: Levels[];
  }
  interface Metadata {
    [key: string]: string;
    station: {
      id: string;
      name: string;
      location: {
        latitude: number;
        longitude: number;
      };
      runways: number[];
    };
  }
  interface Dataset {
    metadata: Metadata;
    data: Data[];
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
