import {create, select} from "../../../_snowpack/pkg/d3-selection.js";
export const ConversionFactors = {
  KmhToKnot: 0.539,
  MpsToKnot: 1.944,
  None: 1
};
const range = (length, from = 0) => Array.from(new Array(length), (_, i) => from + i);
const DEFAULT_CONFIG = {
  size: {
    height: 33,
    width: 80
  },
  rootBarClassName: "wind-barb-root",
  svgId: "",
  bar: {
    angle: 30,
    padding: 6,
    stroke: "#000",
    width: 2,
    fullBarClassName: "wind-barb-bar-full",
    shortBarClassName: "wind-barb-bar-half"
  },
  conversionFactor: ConversionFactors.None,
  triangle: {
    fill: "#000",
    stroke: "#000",
    padding: 6,
    className: "wind-barb-triangle"
  },
  circle: {
    fill: "#FFFFFF00",
    stroke: "#000",
    radius: 10,
    strokeWidth: 2,
    className: "wind-barb-zero-knots-circle"
  },
  baseCircle: void 0
};
const DEFAULT_CIRCLE_CONFIG = {
  baseCircle: {
    className: "wind-barb-base-circle",
    fill: "#000",
    radius: 5,
    stroke: "#000",
    strokeWidth: 1
  }
};
export class D3WindBarb {
  constructor(speed, angle, options) {
    this.speed = speed;
    this.angle = angle;
    this.options = options;
    this.fullOptions = this.mergeOptions();
    this.svg = this.createSvg();
  }
  createSvg() {
    const {width, height} = this.fullOptions.size;
    const svg = create("svg").attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet").attr("width", width).attr("height", height).attr("overflow", "visible");
    if (this.fullOptions.svgId) {
      svg.attr("id", this.fullOptions.svgId);
    }
    return svg;
  }
  mergeOptions() {
    const {bar: pBar, conversionFactor: pConversionFactor, size: pSize, triangle: pTriangle, circle: pCircle, svgId: pSvgId, baseCircle: pBaseCircle, rootBarClassName: pRootBarClassName} = this.options || {};
    const {bar, conversionFactor, size, triangle, circle, svgId, rootBarClassName} = DEFAULT_CONFIG;
    const privateOptions = {
      bar: {...bar, ...pBar},
      conversionFactor: pConversionFactor ?? conversionFactor,
      rootBarClassName: pRootBarClassName ?? rootBarClassName,
      svgId: pSvgId ?? svgId,
      size: {...size, ...pSize},
      triangle: {...triangle, ...pTriangle},
      circle: {...circle, ...pCircle},
      baseCircle: !pBaseCircle ? void 0 : typeof pBaseCircle === "object" ? {...DEFAULT_CIRCLE_CONFIG.baseCircle, ...pBaseCircle} : DEFAULT_CIRCLE_CONFIG.baseCircle
    };
    const dims = this.getSizes(privateOptions);
    return {
      ...privateOptions,
      ...dims
    };
  }
  getSizes(options) {
    const height = options.size.height;
    const C = (90 - options.bar.angle) * Math.PI / 180;
    const b = height * Math.sin(C);
    const ct = height * Math.cos(C);
    const triangleHeight = b;
    const triangleWidth = ct;
    return {
      dims: {
        barHeight: height,
        triangleHeight,
        triangleWidth
      }
    };
  }
  getBarbs() {
    const knots = Number((this.speed * this.fullOptions.conversionFactor).toFixed());
    const res = {
      50: 0,
      10: 0,
      5: 0
    };
    if (knots < 5) {
      return void 0;
    }
    for (let k = knots; k > 0; ) {
      if (k - 50 >= 0) {
        res[50] += 1;
        k -= 50;
      } else if (k - 10 >= 0) {
        res[10] += 1;
        k -= 10;
      } else if (k - 5 >= 0) {
        res[5] += 1;
        k -= 5;
      } else {
        break;
      }
    }
    return res;
  }
  drawCircle() {
    const {
      size: {width, height},
      circle
    } = this.fullOptions;
    this.svg.append("circle").attr("r", circle.radius).attr("cx", width / 2).attr("cy", height / 2).attr("stroke", circle.stroke).attr("fill", circle.fill).attr("stroke-width", circle.strokeWidth).attr("class", circle.className);
    return this;
  }
  drawBarbs(barbs) {
    const {
      size: {height, width},
      rootBarClassName,
      bar: {width: barWidth, stroke, padding: barPadding},
      dims: {triangleWidth},
      triangle: {padding: trianglePadding}
    } = this.fullOptions;
    const container = this.svg.append("g");
    container.append("line").attr("x1", 0).attr("y1", height).attr("x2", width).attr("y2", height).attr("stroke-width", barWidth).attr("stroke", stroke).attr("class", rootBarClassName);
    this.drawBaseCircle(container);
    if (barbs[50] !== 0) {
      this.drawTriangles(barbs[50], container);
    }
    if (barbs[10] !== 0) {
      const paddingR = barbs[50] * (triangleWidth + trianglePadding);
      this.drawBars(barbs[10], container, paddingR, "full");
    }
    if (barbs[5] !== 0) {
      const paddingR = barbs[50] * (triangleWidth + trianglePadding) + barbs[10] * (barPadding + barWidth);
      this.drawBars(barbs[5], container, paddingR === 0 ? barPadding * 2 : paddingR, "half");
    }
    container.attr("transform-origin", `${width / 2}px ${height}px`).attr("transform", `translate(0, ${-height / 2})`).attr("transform", `translate(0, ${-height / 2})rotate(${-90 + this.angle})`);
    return container;
  }
  drawBaseCircle(container) {
    if (!this.fullOptions.baseCircle) {
      return;
    }
    const {
      baseCircle,
      size: {height}
    } = this.fullOptions;
    container.append("g").append("circle").attr("class", baseCircle.className).attr("radius", baseCircle.radius).attr("stroke", baseCircle.stroke).attr("fill", baseCircle.fill).attr("stroke-width", baseCircle.strokeWidth).attr("cx", 0).attr("cy", height).attr("r", baseCircle.radius);
  }
  drawTriangles(q, container) {
    const {
      size: {height, width},
      triangle: {padding, stroke, fill, className},
      dims: {triangleWidth, triangleHeight}
    } = this.fullOptions;
    const drawPath = (index) => {
      const initialX = width - (triangleWidth + padding) * index;
      return `M${initialX}, ${height}, ${initialX - triangleWidth}, ${height}, ${initialX}, ${height - triangleHeight}z`;
    };
    const data = range(q);
    container.append("g").selectAll("path").data(data).enter().append("path").attr("d", (_, i) => drawPath(i)).attr("stroke", stroke).attr("fill", fill).attr("class", className);
  }
  drawBars(q, container, right, type) {
    const {
      size: {width, height},
      bar: {width: barWidth, padding, angle, stroke, fullBarClassName, shortBarClassName},
      dims: {barHeight}
    } = this.fullOptions;
    const data = range(q);
    container.append("g").selectAll("line").data(data).enter().append("line").attr("x1", (_, i) => width - (right + i * (barWidth + padding))).attr("y1", height).attr("x2", (_, i) => width - (right + i * (barWidth + padding))).attr("y2", height - (type === "full" ? barHeight : barHeight / 2)).attr("stroke", stroke).attr("stroke-width", barWidth).attr("class", type === "full" ? fullBarClassName : shortBarClassName).attr("transform-origin", (_, i) => `${width - (right + i * (barWidth + padding))} ${height}`).attr("transform", `rotate(${angle})`);
  }
  draw(container) {
    const barbs = this.getBarbs();
    if (barbs === void 0) {
      this.drawCircle();
    } else {
      this.drawBarbs(barbs);
    }
    if (container) {
      select(container).node()?.appendChild(this.svg.node());
    }
    return this.svg.node();
  }
}
45;
