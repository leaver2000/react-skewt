import React from 'react';
import Box from '@mui/material/Box';
import { select, selectAll } from 'd3-selection';
//
import { LOG_P, margin } from 'lib';
import { D3WindBarb, ConversionFactors } from 'lib/wind-barb';
//
import useD3 from 'hooks/use-d3';
import useCTX from 'hooks/use-ctx';
// import useDimensions from 'hooks/use-dimensions';
//

const BARB_HEIGHT = 40;

const defualtBarbOptions = {
	circle: {
		fill: '#FFFFFF00',
		stroke: '#000',
		radius: 10,
		strokeWidth: 2,
	},
	triangle: {
		fill: '#000',
		stroke: '#000',
		padding: 20,
	},
	baseCircle: {
		className: 'wind-barb-base-circle',
		fill: '#000',
		radius: 2,
		stroke: '#000',
		strokeWidth: 2,
	},
};

export default function WindStaff() {
	const { dims, datums, scales } = useCTX();
	const ref = useD3<SVGSVGElement>(
		(svg) => {
			// svg.selectAll('g').remove();
			svg //
				.selectAll('*')
				.data(LOG_P)
				.enter()
				.append('svg')
				.attr('y', scales.y)
				.attr('width', 60)
				.attr('height', 60)
				.append('g')
				// .attr('border', 'solid red')
				.attr('transform', `translate(${margin.left / 2},${BARB_HEIGHT / 4})`)
				.attr('id', (d) => `windstaff-log-${d}mb`);
		},
		[scales.y]
	); //as React.MutableRefObject<SVGSVGElement>;

	React.useEffect(() => {
		if (!!datums) {
			selectAll('.wind-barbs').remove();

			datums.forEach(({ wspd, wdir, press }) => {
				const barbOptions = {
					...defualtBarbOptions,
					bar: { angle: wdir > 180 ? 30 - 180 : 30, width: 4, padding: 5 },
				};
				select(new D3WindBarb(wspd, wdir, barbOptions).draw(`#windstaff-log-${press}mb`))
					.attr('class', 'wind-barbs')
					.attr('width', 35)
					.attr('height', 35);
			});
		}
	}, [datums]);

	return (
		<Box sx={{ border: '1px solid red', pl: 1 }}>
			<svg ref={ref} transform={`translate(5,${-BARB_HEIGHT + margin.bottom})`} height={dims.height + margin.bottom}></svg>
		</Box>
	);
}
