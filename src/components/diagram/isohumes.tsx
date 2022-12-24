import React from 'react';
import { line, curveLinear } from 'd3';
//	lib
import { SVGGIsohumes } from 'lib/SVGElements';
import { mixingRatio, saturationVaporPressure, vaporPressure, dewPoint, K0 } from 'lib/atmo2';
import { P, all, tangent, LOG_P } from 'lib';
//	hooks
import useD3 from 'hooks/use-d3';
import useCTX from 'hooks/use-ctx';

export default function Isohumes() {
	const { scales } = useCTX();

	const lineGenerator = React.useMemo(() => {
		const { x, y } = scales;
		let temperature: number;
		let mixing_ratio: number;
		return line<number>()
			.curve(curveLinear)
			.x((d, i) => {
				const pressureValue = LOG_P[i];
				if (i === 0) mixing_ratio = mixingRatio(saturationVaporPressure(d + K0), pressureValue);
				else if (!!pressureValue) {
					temperature = dewPoint(vaporPressure(pressureValue, mixing_ratio));
					return x(temperature - K0) + (y(P.base) - y(pressureValue)) / tangent;
				}
				return 0;
			})
			.y((_, i) => {
				const pressureValue = LOG_P[i];
				return !!pressureValue ? y(pressureValue) : 0;
			});
	}, [scales]);

	const ref = useD3<SVGGElement>(
		(element) =>
			element //
				.selectAll('Isohumes')
				.data(all)
				.enter()
				.append('path')
				.attr('d', lineGenerator)
				.attr('class', 'skewt-elements')
				.attr('clip-path', 'url(#clipper)'),
		[lineGenerator]
	);

	return <SVGGIsohumes ref={ref} strokeDasharray='6 5' />;
}
