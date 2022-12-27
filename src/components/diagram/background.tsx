/**
 * the skew-t diagram components are not dependent on the data
 * these components are only dependent on the dimensions of the diagram
 * which are controlled by the size of the parent container and the controlled constants
 *
 * references:
 * https://www.weather.gov/jetstream/skewt
 * https://www.weather.gov/source/zhu/ZHU_Training_Page/convective_parameters/skewt/skewtinfo.html
 */
import React from "react";
import * as d3 from "d3";
// top level imports hooks and
import { useD3, useSkewT } from "../../hooks";
import {
  getElevation,
  dryLapse,
  mixingRatio,
  saturationVaporPressure,
  vaporPressure,
  dewPoint,
  moistGradientT,
} from "../../thermo";
import { ABSOLUTE_ZERO } from "../../thermo/constants";
// component imports
import { GElement } from "../util";
// diagram imports
import { ATTRIBUTES, TEMPERATURE, TANGENT, PRESSURE, ALL } from "./constants";

// https://www.weather.gov/source/zhu/ZHU_Training_Page/convective_parameters/skewt/skewtinfo.html

/**
 * (Isobars) - Lines of equal pressure.
 * They run horizontally from left to right and are labeled on the left side of the diagram.
 * Pressure is given in increments of 100 mb and ranges from 1050 to 100 mb.
 * Notice the spacing between isobars increases in the vertical (thus the name Log P).
 */
function IsoBars(props: SkewT.GElementProps): JSX.Element {
  const { dimensions, scales, mouseEventDispatcher } = useSkewT();

  const ref = useD3<SVGGElement>(
    (g) => {
      g.selectAll("g") ////
        .data(PRESSURE.RANGE)
        .enter()
        .append("line")
        .attr("x1", -dimensions.width)
        .attr("x2", 2 * dimensions.width)
        // create the horizontal log scale
        .attr("y1", scales.yLogarithmic)
        .attr("y2", scales.yLogarithmic)
        // some styling and clipping
        .attr("class", ATTRIBUTES.CLASS)
        .attr("clip-path", ATTRIBUTES.CLIP_PATH)
        // a mouse event handler
        .on("mouseover", mouseEventDispatcher);
    },
    [dimensions.width, scales.yLogarithmic]
  );

  return <GElement {...props} ref={ref} />;
}
/**
 * (Isotherms) - Lines of equal temperature.
 * They run from the southwest to the northeast (thus the name skew) across the diagram and are SOLID.
 * Increment are given for every 10 degrees in units of Celsius. They are labeled at the bottom of the diagram.
 */
function IsoTherms(props: SkewT.GElementProps): JSX.Element {
  const {
    dimensions: { height },
    scales,
  } = useSkewT();

  const ref = useD3<SVGGElement>(
    (g) => {
      g.selectAll("isotherms")
        .data(TEMPERATURE.RANGE)
        .enter()
        .append("line")
        .attr(
          "x1",
          (d) =>
            scales.xLinear(d) -
            0.5 +
            (scales.yLogarithmic(PRESSURE.BASE) -
              scales.yLogarithmic(PRESSURE.TOP)) /
              TANGENT
        )
        .attr("x2", (d) => scales.xLinear(d) - 0.5)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("class", ATTRIBUTES.CLASS)
        .attr("clip-path", ATTRIBUTES.CLIP_PATH);
      //
      g.selectAll("line").attr("stroke", (d) =>
        d === 0 || d === -20 ? "blue" : null
      );
    },
    [height, scales]
  );

  return <GElement {...props} ref={ref} />;
}

function IsoHumes(props: SkewT.GElementProps): JSX.Element {
  const { scales } = useSkewT();
  const lineGenerator = React.useMemo(() => {
    let mRatio: number;
    return d3
      .line<number>()
      .curve(d3.curveLinear)
      .x((tempC, i) => {
        const mBar = PRESSURE.RANGE[i];
        if (!mBar) return 0;
        // set the mixing ratio for the first point
        if (i === 0) mRatio = mixingRatio(saturationVaporPressure(tempC), mBar);
        // calculate the dew point temperature for the current pressure level in celsius
        tempC = dewPoint(vaporPressure(mBar, mRatio)) - ABSOLUTE_ZERO;
        return (
          scales.xLinear(tempC) +
          (scales.yLogarithmic(PRESSURE.BASE) - scales.yLogarithmic(mBar)) /
            TANGENT
        );
      })
      .y((_, i) => {
        const mBar = PRESSURE.RANGE[i];
        return !!mBar ? scales.yLogarithmic(mBar) : 0;
      });
  }, [scales]);

  const ref = useD3<SVGGElement>(
    (g) => {
      g.selectAll("g") //
        .data(ALL)
        .enter()
        .append("path")
        .attr("d", lineGenerator)
        .attr("class", ATTRIBUTES.CLASS)
        .attr("clip-path", ATTRIBUTES.CLIP_PATH);
    },
    [lineGenerator]
  );

  return <GElement {...props} ref={ref} />;
}

function EnvironmentalLapseRate(props: SkewT.GElementProps): JSX.Element {
  const { scales } = useSkewT();

  function elrLine(d: Millibar) {
    const tempC = d > PRESSURE.AT_11KM ? 15 - getElevation(d) * 0.00649 : -56.5; // 6.49 deg per 1000 m
    return (
      scales.xLinear(tempC) +
      (scales.yLogarithmic(PRESSURE.BASE) - scales.yLogarithmic(d)) / TANGENT
    );
  }

  const lineGenerator = React.useMemo(() => {
    return d3
      .line<Millibar>() //
      .curve(d3.curveLinear)
      .x(elrLine)
      .y(scales.yLogarithmic);
  }, [scales]);

  const ref = useD3<SVGGElement>(
    (g) => {
      g.selectAll("elr")
        .data([
          PRESSURE.RANGE.filter((p) => p > PRESSURE.AT_11KM).concat([
            PRESSURE.AT_11KM,
            50 as Millibar,
          ]),
        ])
        .enter()
        .append("path")
        .attr("d", lineGenerator)
        .attr("class", ATTRIBUTES.CLASS)
        .attr("clip-path", ATTRIBUTES.CLIP_PATH);
    },
    [lineGenerator]
  );

  return <GElement {...props} ref={ref} />;
}
/**
 * (Dry adiabatic lapse rate) - Rate of cooling (10 degrees Celsius per kilometer) of a rising unsaturated parcel of air.
 * These lines slope from the southeast to the northwest and are SOLID. Lines gradually arc to the North with height.
 */
function DryAdibats(props: SkewT.GElementProps): JSX.Element {
  const { scales } = useSkewT();

  const lineGenerator = React.useMemo(() => {
    return d3
      .line<number>()
      .curve(d3.curveLinear)
      .x((tempC, i) => {
        const mBar = PRESSURE.RANGE[i];
        if (!mBar) return 0;

        return (
          scales.xLinear(
            dryLapse(mBar, tempC - ABSOLUTE_ZERO, PRESSURE.BASE) + ABSOLUTE_ZERO
          ) +
          (scales.yLogarithmic(PRESSURE.BASE) - scales.yLogarithmic(mBar)) /
            TANGENT
        );
      })
      .y((_, i) => {
        const mBar = PRESSURE.RANGE[i];
        if (!mBar) return 0;

        return scales.yLogarithmic(mBar);
      });
  }, [scales]);

  const ref = useD3<SVGGElement>(
    (g) => {
      g.selectAll("g") ////
        .data(ALL)
        .enter()
        .append("path")
        .attr("d", lineGenerator)
        .attr("class", ATTRIBUTES.CLASS)
        .attr("clip-path", ATTRIBUTES.CLIP_PATH);
    },
    [lineGenerator]
  );

  return <GElement {...props} ref={ref} />;
}
/**
 *  Rate of cooling (depends on moisture content of air) of a rising saturated parcel of air.
 *  These lines slope from the south toward the northwest.
 *  The MALR increases with height since cold air has less moisture content that warm air.
 */
function MoistAdiabats(props: SkewT.GElementProps): JSX.Element {
  const { scales } = useSkewT();
  const lineGenerator = React.useMemo(() => {
    const { xLinear: x, yLogarithmic: y } = scales;
    let temp: Kelvin;
    return d3
      .line<Celsius>()
      .curve(d3.curveLinear)
      .x((tempC, i) => {
        const mBar = PRESSURE.RANGE[i];
        if (!mBar) return 0;
        if (i == 0) {
          temp = tempC + ABSOLUTE_ZERO;
        } else {
          temp += moistGradientT(mBar, temp) * PRESSURE.INTERVAL;
        }

        return x(temp - ABSOLUTE_ZERO) + (y(PRESSURE.BASE) - y(mBar)) / TANGENT;
      })
      .y((_, i) => {
        const mBar = PRESSURE.RANGE[i];
        if (!mBar) return 0;
        return y(mBar);
      });
  }, [scales]);

  const ref = useD3<SVGGElement>(
    (g) => {
      g.selectAll("malr") //
        .data(ALL)
        .enter()
        .append("path")
        .attr("d", lineGenerator)
        .attr("class", ATTRIBUTES.CLASS)
        .attr("clip-path", ATTRIBUTES.CLIP_PATH);
    },
    [lineGenerator]
  );

  return <GElement {...props} ref={ref} />;
}

export {
  IsoTherms,
  IsoBars,
  EnvironmentalLapseRate,
  DryAdibats,
  IsoHumes,
  MoistAdiabats,
};
