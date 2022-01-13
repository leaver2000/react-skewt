import React from 'react';
//
import { SVGGIsotherms } from 'lib/SVGElements';
import { SKEW_T, P, tangent } from 'lib';
//
import useD3 from 'hooks/use-d3';
import useCTX from 'hooks/use-ctx';
/** */
export default function Isotherms() {
	const { dims, scales } = useCTX();

	const ref = useD3<SVGGElement>(
		(element) => {
			const { x, y } = scales;

			element ////
				.selectAll('isotherms')
				.data(SKEW_T)
				.enter()
				.append('line')
				.attr('x1', (d: number) => x(d) - 0.5 + (y(P.base) - y(P.top)) / tangent)
				.attr('x2', (d: number) => x(d) - 0.5)
				.attr('y1', 0)
				.attr('y2', dims.height)
				.attr('class', 'skewt-elements')
				.attr('clip-path', 'url(#clipper)');

			element //
				.selectAll('line')
				.attr('stroke', (d) => (d === 0 || d === -20 ? 'blue' : null));

			// .on('mouseover', (e: SKEWT.MOUSE_EVENT) => lineOverEvent({ isotherms: handleMouseEvent(e) }, e));
			//.on('mouseover', (e: SKEWT.MOUSE_EVENT) => lineOverEvent({ isobars: handleMouseEvent(e) }, e)),
		},
		[dims.height, scales]
	);

	return <SVGGIsotherms ref={ref} />;
}
