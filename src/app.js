import { useRef, useState, useEffect, useCallback } from 'react';
import Skewt from './skewt-plus/skewt';
import { sounding } from './data/sounding';
import Tree from 'react-json-tree';
import * as d3 from 'd3';
import usePrint from './hooks/use-print';
export default function SkewtPlus() {
	return (
		<div style={{ margin: '10px', padding: '10px', height: '100px' }}>
			<SkewtComponent sounding={sounding} />
		</div>
	);
}

function SkewtComponent({ sounding }) {
	const skewRef = useRef();
	console.log(sounding);
	const onEvent = useCallback((e) => {
		console.log(e.tempLine);
	}, []);
	const [data, print] = useState(null);

	// useEffect(() => {
	// 	console.log(lines);
	// 	if (!!lines) {
	// 		// const l = d3.selectAll(lines);
	// 		// l.on('click', () => {
	// 		// 	console.log('YERP');
	// 		// });
	// 		console.log(lines);
	// 	}
	// 	// if (!!tempLine)
	// 	// 	tempLine.on('click', () => {
	// 	// 		console.log('asdasd');
	// 	// 	});
	// }, [lines]);

	useEffect(() => {
		const skew = new Skewt(skewRef.current, {}, onEvent);
		const { data, lines, parctemp } = skew.plot(sounding);
		print(lines);
		console.log(lines);
		// lines.tempLine.on('click', () => {
		// 	console.log('CLICKED');
		// });
		// console.log(tmp);
		// console.log(plt);
		// skew.setCallback(onEvent);
		// console.log(skew);

		// console.log(skew);

		// this.setCallback = (f) => {
		// 	this.cbf = f;
		// };
		// this.setCallbackRange = (f) => {
		// 	this.cbfRange = f;
		// };
	}, [sounding, onEvent, print]);

	return (
		<div>
			<Tree data={data} />
			<div ref={skewRef} className='skew-t' />
		</div>
	);
}
