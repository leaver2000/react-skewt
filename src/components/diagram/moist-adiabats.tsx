import React from 'react';
import { line, curveLinear } from 'd3';
//
import { SVGGMoistAdibats } from 'lib/SVGElements';
import { moistGradientT, K0 } from 'lib/atmo2';
import { tangent, P, all, LOG_P } from 'lib';
//
import useD3 from 'hooks/use-d3';
import useCTX from 'hooks/use-ctx';
/** */
export default function MoistAdiabats() {
	const { scales } = useCTX();

	const lineGenerator = React.useMemo(() => {
		const { x, y } = scales;
		let temp: number;
		return line<number>()
			.curve(curveLinear)
			.x((d, i) => {
				const pressureValue = LOG_P[i];

				if (!!pressureValue) {
					if (i === 0) temp = K0 + d;
					else if (!!pressureValue) temp = temp + moistGradientT(pressureValue, temp) * P.increment;
					return x(temp - K0) + (y(P.base) - y(pressureValue)) / tangent;
				} else return 0;
			})
			.y((_, i) => {
				const pressureValue = LOG_P[i];
				return !!pressureValue ? y(pressureValue) : 0;
			});
	}, [scales, P, tangent]);

	const ref = useD3<SVGGElement>(
		(element) =>
			element //
				.selectAll('malr')
				.data(all)
				.enter()
				.append('path')
				.attr('d', lineGenerator)
				.attr('class', 'skewt-elements')
				.attr('clip-path', 'url(#clipper)'),
		[lineGenerator]
	);

	return <SVGGMoistAdibats ref={ref} />;
}
