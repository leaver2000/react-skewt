import { create, select, Selection } from 'd3-selection';

import { PrivateWindBarbOptions, PublicWindBarbOptions, WindBarbDims } from './models';

/**
 * Generic Selection type
 * @ignore
 */
type SVG = Selection<any, any, any, any>;

/**
 * For internal use only
 * @ignore
 */
type Barbs = { 50: number; 10: number; 5: number };

/**
 * This library works internally with nautical Knots. So, if your data is in other
 * units you <b>should</b>:
 * 1) Pass the correct conversion factor as option
 * 2) Transform your data to knots and ignore the `conversionFactor` option
 *
 * This library provides 2 conversion factors:
 * 1) <b>KmhToKnot</b> - Kilometers per hour to nautical knots
 * 2) <b>MpsToKnot</b> - Meters per second to nautical knots
 *
 * <b>None</b> is the default option and will be used if your data is in knots
 *
 * Be aware that your speed data will be multiplied by `conversionFactor`
 */
export const ConversionFactors = {
	KmhToKnot: 0.539,
	MpsToKnot: 1.944,
	None: 1,
} as const;

/**
 * @ignore
 */
const range = (length: number, from = 0): number[] => Array.from(new Array(length), (_, i) => from + i);

/**
 * Default configuration.
 * All that properties that you don't provide will be overwritten by
 * the corresponding option of this configuration
 *
 * @see [[PublicWindBarbOptions]]
 */
const DEFAULT_CONFIG: Omit<PrivateWindBarbOptions, 'dims'> = {
	/**
	 * @see [[WindBarbSize]]
	 */
	size: {
		height: 33,
		width: 80,
	},
	/**
	 * @see [[WindBarbSize]]
	 */
	rootBarClassName: 'wind-barb-root',
	/**
	 * @see [[WindBarbSize]]
	 */
	svgId: '',
	/**
	 * @see [[WindBarbBar]]
	 */
	bar: {
		angle: 30,
		padding: 6,
		stroke: '#000',
		width: 2,
		fullBarClassName: 'wind-barb-bar-full',
		shortBarClassName: 'wind-barb-bar-half',
	},
	/**
	 * @see [[ConversionFactors]]
	 */
	conversionFactor: ConversionFactors.None,
	/**
	 * @see [[WindBarbTriangle]]
	 */
	triangle: {
		fill: '#000',
		stroke: '#000',
		padding: 6,
		className: 'wind-barb-triangle',
	},
	/**
	 * @see [[WindBarbCircle]]
	 */
	circle: {
		fill: '#FFFFFF00',
		stroke: '#000',
		radius: 10,
		strokeWidth: 2,
		className: 'wind-barb-zero-knots-circle',
	},
	baseCircle: undefined,
};

/**
 * Default configuration for base circle. If you provide some options for `baseCircle`
 * the rest of options will be filled with this options.
 *
 * If you provide an empty object as `baseCircle` this will be the used properties.
 * If you provide `undefinded` then, no circle will be drawn
 */
const DEFAULT_CIRCLE_CONFIG: Pick<PrivateWindBarbOptions, 'baseCircle'> = {
	baseCircle: {
		className: 'wind-barb-base-circle',
		fill: '#000',
		radius: 5,
		stroke: '#000',
		strokeWidth: 1,
	},
};

export class D3WindBarb {
	private svg: SVG;
	private fullOptions: PrivateWindBarbOptions;

	/**
	 *
	 * @param speed Wind speed in any units. @see [[ConversionFactors]]
	 * @param angle Wind direction angle.
	 *
	 * As reference:
	 *
	 * - 0deg for north
	 * - 90deg for east
	 * - 180deg for south
	 * - 270deg for west
	 *
	 * But you can pass any angle between 0 and 360
	 * @param options @see [[DEFAULT_CONFIG]]
	 */
	constructor(private speed: number, private angle: number, private options?: PublicWindBarbOptions) {
		this.fullOptions = this.mergeOptions();
		this.svg = this.createSvg();
	}

	private createSvg(): SVG {
		const { width, height } = this.fullOptions.size;
		const svg = create('svg').attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet').attr('width', width).attr('height', height).attr('overflow', 'visible');
		if (this.fullOptions.svgId) {
			svg.attr('id', this.fullOptions.svgId);
		}
		return svg;
	}

	private mergeOptions(): PrivateWindBarbOptions {
		const { bar: pBar, conversionFactor: pConversionFactor, size: pSize, triangle: pTriangle, circle: pCircle, svgId: pSvgId, baseCircle: pBaseCircle, rootBarClassName: pRootBarClassName } = this.options || {};
		const { bar, conversionFactor, size, triangle, circle, svgId, rootBarClassName } = DEFAULT_CONFIG;
		const privateOptions: any = {
			bar: { ...bar, ...pBar },
			conversionFactor: pConversionFactor ?? conversionFactor,
			rootBarClassName: pRootBarClassName ?? rootBarClassName,
			svgId: pSvgId ?? svgId,
			size: { ...size, ...pSize },
			triangle: { ...triangle, ...pTriangle },
			circle: { ...circle, ...pCircle },
			baseCircle: !pBaseCircle ? undefined : 'object' === typeof pBaseCircle ? { ...DEFAULT_CIRCLE_CONFIG.baseCircle, ...pBaseCircle } : DEFAULT_CIRCLE_CONFIG.baseCircle,
		};
		const dims = this.getSizes(privateOptions);

		return {
			...privateOptions,
			...dims,
		};
	}

	private getSizes(options: Omit<PrivateWindBarbOptions, 'dims'>): WindBarbDims {
		const height = options.size.height;
		const C = ((90 - options.bar.angle) * Math.PI) / 180;
		const b = height * Math.sin(C);
		const ct = height * Math.cos(C);

		const triangleHeight = b;
		const triangleWidth = ct;
		return {
			dims: {
				barHeight: height,
				triangleHeight,
				triangleWidth,
			},
		};
	}

	private getBarbs(): Barbs | undefined {
		const knots = Number((this.speed * this.fullOptions.conversionFactor).toFixed());

		const res = {
			50: 0,
			10: 0,
			5: 0,
		};

		if (knots < 5) {
			return undefined;
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

	private drawCircle() {
		const {
			size: { width, height },
			circle,
		} = this.fullOptions;
		this.svg
			.append('circle')
			.attr('r', circle.radius)
			.attr('cx', width / 2)
			.attr('cy', height / 2)
			.attr('stroke', circle.stroke)
			.attr('fill', circle.fill)
			.attr('stroke-width', circle.strokeWidth)
			.attr('class', circle.className);
		return this;
	}

	private drawBarbs(barbs: Barbs) {
		const {
			size: { height, width },
			rootBarClassName,
			bar: { width: barWidth, stroke, padding: barPadding },
			dims: { triangleWidth },
			triangle: { padding: trianglePadding },
		} = this.fullOptions;
		const container = this.svg.append('g');

		container.append('line').attr('x1', 0).attr('y1', height).attr('x2', width).attr('y2', height).attr('stroke-width', barWidth).attr('stroke', stroke).attr('class', rootBarClassName);

		this.drawBaseCircle(container);

		if (barbs[50] !== 0) {
			this.drawTriangles(barbs[50], container);
		}

		if (barbs[10] !== 0) {
			const paddingR = barbs[50] * (triangleWidth + trianglePadding);
			this.drawBars(barbs[10], container, paddingR, 'full');
		}

		if (barbs[5] !== 0) {
			const paddingR = barbs[50] * (triangleWidth + trianglePadding) + barbs[10] * (barPadding + barWidth);
			this.drawBars(barbs[5], container, paddingR === 0 ? barPadding * 2 : paddingR, 'half');
		}

		container
			.attr('transform-origin', `${width / 2}px ${height}px`)
			.attr('transform', `translate(0, ${-height / 2})`)
			.attr('transform', `translate(0, ${-height / 2})rotate(${-90 + this.angle})`);

		return container;
	}

	private drawBaseCircle(container: SVG) {
		if (!this.fullOptions.baseCircle) {
			return;
		}
		const {
			baseCircle,
			size: { height },
		} = this.fullOptions;

		container
			.append('g')
			.append('circle')
			.attr('class', baseCircle.className)
			.attr('radius', baseCircle.radius)
			.attr('stroke', baseCircle.stroke)
			.attr('fill', baseCircle.fill)
			.attr('stroke-width', baseCircle.strokeWidth)
			.attr('cx', 0)
			.attr('cy', height)
			.attr('r', baseCircle.radius);
	}

	private drawTriangles(q: number, container: SVG) {
		const {
			size: { height, width },
			triangle: { padding, stroke, fill, className },
			dims: { triangleWidth, triangleHeight },
		} = this.fullOptions;
		const drawPath = (index: number) => {
			const initialX = width - (triangleWidth + padding) * index;

			return `M${initialX}, ${height}, ${initialX - triangleWidth}, ${height}, ${initialX}, ${height - triangleHeight}z`;
		};

		const data = range(q);
		container
			.append('g')
			.selectAll('path')
			.data(data)
			.enter()
			.append('path')
			.attr('d', (_: any, i: number) => drawPath(i))
			.attr('stroke', stroke)
			.attr('fill', fill)
			.attr('class', className);
	}

	private drawBars(q: number, container: SVG, right: number, type: 'full' | 'half') {
		const {
			size: { width, height },
			bar: { width: barWidth, padding, angle, stroke, fullBarClassName, shortBarClassName },
			dims: { barHeight },
		} = this.fullOptions;

		const data = range(q);
		container
			.append('g')
			.selectAll('line')
			.data(data)
			.enter()
			.append('line')
			.attr('x1', (_: any, i: number) => width - (right + i * (barWidth + padding)))
			.attr('y1', height)
			.attr('x2', (_: any, i: number) => width - (right + i * (barWidth + padding)))
			.attr('y2', height - (type === 'full' ? barHeight : barHeight / 2))
			.attr('stroke', stroke)
			.attr('stroke-width', barWidth)
			.attr('class', type === 'full' ? fullBarClassName : shortBarClassName)
			.attr('transform-origin', (_: any, i: number) => `${width - (right + i * (barWidth + padding))} ${height}`)
			.attr('transform', `rotate(${angle})`);
	}
	// 'transform', `rotate(${	angle < 180 ? angle - 180 : angle})`);

	/**
   * Creates wind barb and returns the svg element. If `container` is provided, the svg
   * will be appended to element if found
   * @param container Id of the element where the svg will be appended if provided
   * @returns SVGElement
   * @example
   * ```typescript
   * // Use d3-wind-barbs with leaflet to draw wind barbs as markers
   *
   const windBarb = new WindBarb(21, 45, {
   size:
     height: 20,
     width: 50
}).draw();
   *
   * const leafletIcon = new L.DivIcon({
   *    html: windBarb.outerHTML
   * })
   *
   * // Now you can use this icon in your L.Marker
   *```
   *
   * @example
   * ```typescript
   * // Use d3-wind-barb with OpenLayers to draw svg icons
   * 
   * const windBarb = new WindBarb(21, 45, {
   *    size:
   *      height: 20,
   *      width: 50
   * }).draw();
   * 
   * const style = new ol.style.Style({
   *   image: new ol.style.Icon({
   *     opacity: 1,
   *     src: 'data:image/svg+xml;utf8,' + windBarb.outerHTML
   *   })
   * });
   *  
   * ```
   */

	public draw(container?: string): SVGElement {
		const barbs = this.getBarbs();

		if (barbs === undefined) {
			this.drawCircle();
		} else {
			this.drawBarbs(barbs);
		}
		if (container) {
			(select(container).node() as HTMLElement)?.appendChild(this.svg.node());
		}
		return this.svg.node();
	}
}
