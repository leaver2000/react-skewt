import React from 'react';
//	lib
import { SVGRectBackdrop, SVGGTick } from 'lib/SVGElements';
import { margin, P, LOG_P } from 'lib';
//	hooks
import useCTX from 'hooks/use-ctx';
import useD3 from 'hooks/use-d3';
// components
export default function Ticks() {
	return (
		<React.Fragment>
			<IsothermTicks />
			<IsobarTicks />
		</React.Fragment>
	);
}

function IsothermTicks() {
	const { dims, axes, darkMode } = useCTX();
	const ref = useD3<SVGGElement>(
		(element) => {
			element //
				.attr('transform', `translate(${margin.left},${dims.height - 5})`)
				.call(axes.x0);
			element.selectAll('line').attr('stroke', 'red').attr('stroke-width', '.2');
			element
				.selectAll('text')
				.attr('stroke', darkMode ? 'white' : 'black')
				.attr('stroke-width', '.35');
		},
		[dims.height]
	);

	return <g ref={ref} />;
}

function IsobarTicks() {
	const { dims, axes, darkMode } = useCTX();
	const ref = useD3<SVGGElement>(
		(element) => {
			// .axisBottom(xScale)
			// .ticks(5)
			// .tickFormat((d) => `+${d}hr`)
			// .tickSize(height); //.tickSize(height);.attr("transform", "translate(0," +   (h - 0.5 ) + ")")
			element.call(axes.y1).attr('transform', 'translate(+5,0)');
			element.selectAll('line').attr('stroke', 'red').attr('stroke-width', '1');
			element
				.selectAll('text')
				.attr('stroke', darkMode ? 'white' : 'black')
				.attr('stroke-width', '.35');
			// element //
			// 	.attr('transform', `translate(${margin.left},${dims.height - margin.bottom - 2.5})`)
			// 	.call(axes.x0);
			// element.selectAll('line').attr('stroke', 'red').attr('stroke-width', '.2');
			// element.selectAll('text').attr('stroke', 'red');
		},
		[dims.height, darkMode]
	);

	// console.log(mode);
	return <SVGGTick ref={ref} />;
}
