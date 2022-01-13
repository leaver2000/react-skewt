import React from 'react';
import Box from '@mui/material/Box';
//	lib
import { SVGRectBackdrop } from 'lib/SVGElements';
import { margin, dims2Scales, scales2Axes } from 'lib';
//	hooks
import useCTX from 'hooks/use-ctx';
import useD3 from 'hooks/use-d3';
// components
import Ticks from './ticks';
import Isobars from './isobars';
import Isohumes from './isohumes';
import Isotherms from './isotherms';
import DryAdibats from './dry-adibats';
import MoistAdiabats from './moist-adiabats';
import EnvironmentalLapseRate from './environmental-lapse-rate';
/**
 *### `JSX-D3` `Diagram Component`
 * Renders a `Log P` `Skew T` Diagram
 * ```
 * return(
 * 	<Isobars />
 * 	<DryAdibats />
 * 	<Isotherms />
 * 	<Isohumes />
 * 	<MoistAdiabats />
 * 	<EnvironmentalLapseRate />
 * )
 * ```
 */
export default function Diagram({ ...props }) {
	const { dims, setState, ...ctx } = useCTX();

	const ref = useD3<HTMLDivElement>(
		(element) => {
			if (!ctx.isSized) {
				element.selectAll('.skewt-elements').remove();
				let width = parseInt(element.style('width'));
				// console.log()
				let height = width; //to fix
				width = width - margin.left - margin.right;
				height = width - margin.top - margin.bottom;
				const dims = { height, width };
				const scales = dims2Scales(dims);
				const axes = scales2Axes(scales);
				setState({ dims, axes, scales, isSized: true });
			}
		},
		[ctx.isSized]
	);
	return (
		<Box ref={ref}>
			{ctx.isSized ? (
				<svg transform={`translate(0,${margin.top})`} width={dims.width + margin.left} height={dims.height + margin.bottom}>
					<SVGRectBackdrop width={dims.width} height={dims.height} fill='white' />
					<EnvironmentalLapseRate />
					<Isobars />
					<Isotherms />
					<MoistAdiabats />
					<DryAdibats />
					<Isohumes />
					<Ticks />
					{/* props.children = temp & dewp sounding profile */}
					{!!ctx.datums ? props.children : null}
				</svg>
			) : null}
		</Box>
	);
}
