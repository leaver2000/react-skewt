import React from 'react';
import { line, curveLinear } from 'd3';
//	lib
import { SVGGDryAdibats } from 'lib/SVGElements';
import { dryLapse, K0 } from 'lib/atmo2';
import { all, P, tangent, LOG_P } from 'lib';
//	hooks
import useD3 from 'hooks/use-d3';
import useCTX from 'hooks/use-ctx';
//
export default function DryAdibats() {
	const { scales } = useCTX();

	const lineGenerator = React.useMemo(() => {
		const { x, y } = scales;
		return line<number>()
			.curve(curveLinear)
			.x((d, i) => {
				const pressureValue = LOG_P[i];
				return !!pressureValue ? x(dryLapse(pressureValue, K0 + d, P.base) - K0) + (y(P.base) - y(pressureValue)) / tangent : 0;
			})
			.y((_, i) => {
				const pressureValue = LOG_P[i];
				return !!pressureValue ? y(pressureValue) : 0;
			});
	}, [scales]);
	//
	const ref = useD3<SVGGElement>(
		(element) => {
			element ////
				.selectAll('g')
				.data(all)
				.enter()
				.append('path')
				.attr('d', lineGenerator)
				.attr('class', 'skewt-elements')
				.attr('clip-path', 'url(#clipper)');
			// .on('mouseover', (e: SKEWT.MOUSE_EVENT) => lineOverEvent({ dalr: handleMouseEvent(e) }, e));
			//.on('mouseover', (e: SKEWT.MOUSE_EVENT) => lineOverEvent({ isobars: handleMouseEvent(e) }, e)),
		},
		[lineGenerator]
	); //as React.MutableRefObject<SVGGElement>;

	return <SVGGDryAdibats ref={ref} />;
}
