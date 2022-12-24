import React from 'react';
import { line, curveLinear } from 'd3-shape';
//
import { SVGGTemperature } from 'lib/SVGElements';
import { P, tangent } from 'lib';
import useD3 from 'hooks/use-d3';
import useCTX from 'hooks/use-ctx';
/** Temperature */
export default function Temperature() {
	const { scales, datums } = useCTX();
	//
	const lineGenerator = React.useMemo(() => {
		const { x, y } = scales;
		return line<Skewt.Datum>() //
			.curve(curveLinear)
			.x((d) => x(d.temperature) + (y(P.base) - y(d.pressure)) / tangent)
			.y((d) => y(d.pressure));
	}, [scales]);
	//
	const ref = useD3<SVGGElement>(
		(element) => {
			element.selectAll('path').remove();
			element //
				.selectAll('temperature')
				.data([datums])
				.enter()
				.append('path')
				.attr('d', lineGenerator)
				.attr('class', 'skewt-elements')
				.attr('clip-path', 'url(#clipper)');
		},
		[datums, lineGenerator]
	);

	return <SVGGTemperature ref={ref} />;
}
