import React from 'react';
import * as d3 from 'd3-shape';

import { useD3, useSkewT } from '../../hooks';

import { PRESSURE, TANGENT, ATTRIBUTES } from './constants';
import { GElement } from '../util';

/** Temperature */
function Temperature(props: SkewT.GElementProps): JSX.Element {
	const { data, scales } = useSkewT();
	// a memoized line generator only changes if the scales change
	const lineGenerator = React.useMemo(() => {
		const { xLinear: x, yLogarithmic: y } = scales;
		return d3
			.line<SkewT.Datum>() //
			.curve(d3.curveLinear)
			.x((d) => x(d.temperature) + (y(PRESSURE.BASE) - y(d.pressure)) / TANGENT)
			.y((d) => y(d.pressure));
	}, [scales]);
	// a ref to the SVG element that will be rendered
	const ref = useD3<SVGGElement>(
		(g) => {
			g.selectAll('path').remove();
			g.selectAll('temperature') //
				.data([data])
				.enter()
				.append('path')
				.attr('d', lineGenerator)
				.attr('class', ATTRIBUTES.CLASS)
				.attr('clip-path', ATTRIBUTES.CLIP_PATH);
		},
		[data, lineGenerator]
	);

	return <GElement {...props} ref={ref} />;
}

function DewPoint(props: SkewT.GElementProps): JSX.Element {
	const { data, scales } = useSkewT();
	// a memoized line generator only changes if the scales change
	const lineGenerator = React.useMemo(() => {
		const { xLinear: x, yLogarithmic: y } = scales;
		return d3
			.line<SkewT.Datum>() //
			.curve(d3.curveLinear)
			.x((d) => x(d.dewPoint) + (y(PRESSURE.BASE) - y(d.pressure)) / TANGENT)
			.y((d) => y(d.pressure));
	}, [scales]);
  // a ref to the SVG element that will be rendered
	const ref = useD3<SVGGElement>(
		(g) => {
			g.selectAll('path').remove();
			g //
				.selectAll('*')
				.data([data])
				.enter()
				.append('path')
				.attr('d', lineGenerator)
				.attr('class', ATTRIBUTES.CLASS)
				.attr('clip-path', ATTRIBUTES.CLIP_PATH);
		},
		[data, lineGenerator]
	);

	return <GElement {...props} ref={ref} />;
}

export { Temperature, DewPoint };
