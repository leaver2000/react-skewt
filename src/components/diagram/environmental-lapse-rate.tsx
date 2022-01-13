import React from 'react';
import { line, curveLinear } from 'd3';
//	lib
import { SVGGEnvironmentalLapseRate } from 'lib/SVGElements';
import { getElevation } from 'lib/atmo2';
import { P, tangent, LOG_P } from 'lib';
//	hooks
import useD3 from 'hooks/use-d3';
import useCTX from 'hooks/use-ctx';
//
export default function EnvironmentalLapseRate() {
	const { scales } = useCTX();
	const lineGenerator = React.useMemo(() => {
		const { x, y } = scales;

		return line<number>() //
			.curve(curveLinear)
			.x((d) => {
				let t = d > P.at11km ? 15 - getElevation(d) * 0.00649 : -56.5; //6.49 deg per 1000 m
				return x(t) + (y(P.base) - y(d)) / tangent;
			})
			.y((d) => y(d));
	}, [scales]);
	//
	const ref = useD3<SVGGElement>(
		(element) => {
			element
				.selectAll('elr')
				.data([LOG_P.filter((p) => p > P.at11km).concat([P.at11km, 50])])
				.enter()
				.append('path')
				.attr('d', lineGenerator)
				.attr('class', 'skewt-elements')
				.attr('clip-path', 'url(#clipper)');
			// .on('mouseover', (e: SKEWT.MOUSE_EVENT) => lineOverEvent({ envLapseRate: handleMouseEvent(e) }, e));
		},
		[lineGenerator]
	);

	return <SVGGEnvironmentalLapseRate ref={ref} />;
}
