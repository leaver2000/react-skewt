import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Skewt from './skewtjs/skewt';
import { sounding } from './data/sounding';
import Tree from 'react-json-tree';
import { scaleLinear, bisector, scaleLog, axisBottom, axisRight, axisLeft, format, range, curveLinear, line, drag, select, selectAll } from 'd3';
// import * as atm from './skewt/atmosphere';
// import * as d3 from 'd3';
// import usePrint from './hooks/use-print';
export default function SkewtPlus() {
	const onEvent = useCallback((e) => {
		console.log(e);
	}, []);
	return (
		<div style={{ margin: '10px', padding: '10px', height: '100px' }}>
			<SkewtComponent sounding={sounding} options={{}} onEvent={onEvent} />
		</div>
	);
}
function useRefFactory() {
	const wrapper = useRef();
	const svg = useRef();
	const container = useRef();
	const skewtbg = useRef();
	const skewtgroup = useRef();
	const barbgroup = useRef();
	const tooltipgroup = useRef();
	const tooltipRect = useRef();
	const cloudContainer = useRef();
	const cloudCanvas1 = useRef();
	const cloudCanvas2 = useRef();
	return useMemo(() => ({ wrapper, svg, container, skewtbg, skewtgroup, barbgroup, tooltipgroup, tooltipRect, cloudContainer, cloudCanvas1, cloudCanvas2 }), []);
}
const DEG2RAD = Math.PI / 180;
const K0 = 273.15;
const GRADIENT = 45;

function SkewtComponent({ sounding, options, onEvent }) {
	const [{ width, height }, setState] = useState({ width: undefined, height: undefined });
	const [selections, setSelections] = useState({});

	const refs = useRefFactory();
	const [skew, setSkewt] = useState(null);
	let w, h, x, y, xAxis, yAxis, yAxis2;
	var margin = { top: 30, right: 40, bottom: 20, left: 35 };
	var basep = 1050;
	var topp = 100;
	var plines = [1000, 850, 700, 500, 300, 200, 100];
	var pticks = [950, 900, 800, 750, 650, 600, 550, 450, 400, 350, 250, 150];
	var barbsize = 25;
	var data = [];
	//aux
	// var unit = 'kt'; // or kmh
	var midtemp = 0,
		temprange = 60;
	const tan = Math.tan((GRADIENT || 55) * DEG2RAD);

	function setVariables(margin) {
		width = parseInt(refs.wrapper.style('width'), 10) - 10; // tofix: using -10 to prevent x overflow
		w = 1000;
		h = 1000;
		// tan = Math.tan((GRADIENT || 55) * DEG2RAD);
		x = scaleLinear()
			.range([-w / 2, w + w / 2])
			.domain([midtemp - temprange * 2, midtemp + temprange * 2]); //range is w*2
		y = scaleLog().range([0, h]).domain([topp, basep]);

		xAxis = axisBottom(x).tickSize(0, 0).ticks(20); //.orient("bottom");
		yAxis = axisLeft(y)
			.tickSize(0, 0)
			.tickValues(plines.filter((p) => p % 100 === 0 || p === 50 || p === 150))
			.tickFormat(format('.0d')); //.orient("left");
		yAxis2 = axisRight(y).tickSize(5, 0).tickValues(pticks); //.orient("right");
		// yAxis3 = axisLeft(y).tickSize(2, 0).tickValues(altticks);
	}
	useEffect(() => {
		const k = Object.keys(refs).reduce((obj, k) => ({ ...obj, [k]: select(refs[k].current) }), {});
		setSelections(k);
	}, [refs]);

	return (
		<div ref={refs.wrapper} className='skew-t'>
			<svg ref={refs.svg} className='mainsvg'>
				<g ref={refs.container}>
					<g ref={refs.skewtbg} className='skewtbg' />
					<g ref={refs.skewtgroup} className='skewt' />
					<g ref={refs.barbgroup} className='windbarb' />
					<g ref={refs.tooltipgroup} className='tooltips' />
					<rect ref={refs.tooltipRect} className='overlay' />
				</g>
			</svg>
		</div>
	);
}
