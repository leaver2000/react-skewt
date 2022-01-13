import React from 'react';
import { line, curveLinear } from 'd3-shape';
//
import { SVGGDewpoint } from 'lib/SVGElements';
import { P, tangent } from 'lib';
import useD3 from 'hooks/use-d3';
import useCTX from 'hooks/use-ctx';
/** Dewpoint */
export default function Dewpoint() {
	const { scales, datums } = useCTX();

	const lineGenerator = React.useMemo(() => {
		const { x, y } = scales;
		return line<Skewt.Datum>() //
			.curve(curveLinear)
			.x((d) => x(d.dwpt) + (y(P.base) - y(d.press)) / tangent)
			.y((d) => y(d.press));
	}, [scales]);

	const ref = useD3<SVGGElement>(
		(element) => {
			element.selectAll('path').remove();
			element //
				.selectAll('*')
				.data([datums])
				.enter()
				.append('path')
				.attr('d', lineGenerator)
				.attr('class', 'skewt-elements dewpoint')
				.attr('clip-path', 'url(#clipper)');
		},
		[datums, lineGenerator]
	);

	return <SVGGDewpoint ref={ref} />;
}
