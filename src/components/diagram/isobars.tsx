import React from 'react';
//	lib
import { SVGGIsobars } from 'lib/SVGElements';
import { LOG_P } from 'lib';
//	hooks
import useD3 from 'hooks/use-d3';
import useCTX from 'hooks/use-ctx';
/** ### Isobars */
export default function Isobars() {
	const { dims, scales } = useCTX();
	const ref = useD3<SVGGElement>(
		(element) => {
			element ////
				.selectAll('g')
				.data(LOG_P)
				.enter()
				.append('line')
				.attr('x1', -dims.width)
				.attr('x2', 2 * dims.width)
				.attr('y1', scales.y)
				.attr('y2', scales.y)
				.attr('class', 'skewt-elements')
				.attr('clip-path', 'url(#clipper)');
			//.on('mouseover', (e: SKEWT.MOUSE_EVENT) => lineOverEvent({ isobars: handleMouseEvent(e) }, e)),
		},
		[dims.width, scales.y]
	);

	return <SVGGIsobars ref={ref} />;
}
