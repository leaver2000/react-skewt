import React from 'react';
import * as d3 from 'd3';
import { useSkewT, useD3 } from '../hooks';
import { getDatumsAtLevel, clampIndex } from '../util';
type SkewPointerEvent = React.PointerEvent<SVGGElement> & PointerEvent;
function getWindFillColor(windSpeed: number) {
	return `rgba(0,0,0, ${Math.max(0, Math.min(1, windSpeed / 30))})`;

	// if (windSpeed < 5) {
	//   return 'rgb(0, 0, 255)';
	// } else if (windSpeed < 10) {
	//   return 'rgb(0, 255, 255)';
	// } else if (windSpeed < 15) {
	//   return 'rgb(0, 255, 0)';
	// } else if (windSpeed < 20) {
	//   return 'rgb(255, 255, 0)';
	// } else if (windSpeed < 25) {
	//   return 'rgb(255, 127, 0)';
	// } else if (windSpeed < 30) {
	//   return 'rgb(255, 0, 0)';
	// } else {
	//   return 'rgb(127, 0, 0)';
	// }
}
/**
 * the SVGSVGElement is the root element of the Temporal control and is responsible for
 * @param param0
 * @returns
 */
function Graphic({ width, height }: SkewT.Dimensions) {
	const { dataset, dataState, ...skewt } = useSkewT();
	// memoized data for the vertical axis
	const data = React.useMemo(() => {
		// the current state of the dataset along the vertical axis
		// this value is set by clicking on the skew-t diagram
		const temperature: Celsius[] = [];
		const dewPoint: Celsius[] = [];
		const windSpeed: number[] = [];

		dataset.forEach(({ validTime, data }) => {
			const datum = getDatumsAtLevel(data, dataState.pressureLevel);
			temperature.push(datum.temperature);
			dewPoint.push(datum.dewPoint);
			console.log(datum.windSpeed);
			windSpeed.push(datum.windSpeed);
		});

		const yMax = (Math.max(...temperature) + 2) as Celsius;
		const yMin = (Math.min(...dewPoint) - 2) as Celsius;

		const results = {
			temperature,
			dewPoint,
			windSpeed,
			yMax,
			yMin,
			length: dewPoint.length,
		};
		return results;
	}, [dataset, dataState.pressureLevel]);

	// TODO: this should be cleaned up

	const [x, y] = React.useMemo(() => {
		const x = d3.scaleLinear().domain([0, data.length]).range([0, width]);
		const y = d3.scaleLinear().domain([data.yMin, data.yMax]).range([height, 0]);
		return [x, y];
	}, [data, width, height]);

	const lineGenerator = React.useCallback(
		d3
			.line<Celsius>()
			.x((_, d) => x(d))
			.y((d) => y(d)),
		[x, y]
	);

	const ref = useD3<SVGGElement>(
		(g) => {
			// the temperature data
			g.append('path') //
				.datum(data.temperature)
				.attr('fill', 'none')
				.attr('stroke', 'red')
				.attr('stroke-width', 1.5)
				.attr('stroke-linejoin', 'round')
				.attr('stroke-linecap', 'round')
				.attr('d', lineGenerator);
			// the dew point data
			g.append('path') //
				.datum(data.dewPoint)
				.attr('fill', 'none')
				.attr('stroke', 'steelblue')
				.attr('stroke-width', 1.5)
				.attr('stroke-linejoin', 'round')
				.attr('stroke-linecap', 'round')
				.attr('d', lineGenerator);
			// append a bar graph to show the wind speed

			const yWind = d3
				.scaleLinear()
				.domain([0, Math.max(...data.windSpeed)])
				.range([height, 0]);
			// a bar graph to show the wind speed
			g.selectAll('rect')
				.data(data.windSpeed)
				.join('rect')
				// using the index of the data point to determine the x position of the bar
				.attr('x', (_, i) => x(i))
				// input the wind speed to determine the y position of the bar
				.attr('y', (d) => yWind(d))
				// the width of each rect is the width of the svg divided by the number of data points
				.attr('width', width / data.length)
				// the height is the difference between the y value of the wind speed and the height of the svg
				.attr('height', (d) => height - yWind(d))
				// the wind speed is used to determine the color of the bar
				.attr('fill', getWindFillColor);

			// a vertical line every 6 hours
			g.selectAll('line')
				.data(d3.range(0, data.length, 6))
				.join('line')
				.attr('x1', (d) => x(d))
				.attr('x2', (d) => x(d))
				.attr('y1', 0)
				.attr('y2', height)
				.attr('stroke', 'black')
				.attr('stroke-width', 1)
				.attr('stroke-dasharray', '2,2')
				.attr('class', 'time-series-line');
			// an onClick event to show the time
		},
		[data, height, width]
	);
	// interpolate the timeIndex based on the x position of the mouse
	const interpolateTime = React.useCallback(
		(e: SkewPointerEvent) => {
			if (!e.currentTarget) return;
			const rect = e.currentTarget.getBoundingClientRect();
			const x = d3.scaleLinear().range([0, rect.width]).domain([0, data.length]);
			const timeIndex = clampIndex(Math.round(x.invert(e.offsetX)), data.length);
			console.log(timeIndex);
			skewt.setPartialDataState({ timeIndex });
		},
		[data.length, width]
	);
	// interpolate the data values based on the y position of the mouse
	const interpolateData = React.useCallback(
		(e: SkewPointerEvent) => {
			if (!e.currentTarget) return;
			const rect = e.currentTarget.getBoundingClientRect();
			const y = d3.scaleLinear().range([rect.height, 0]).domain([data.yMin, data.yMax]);
			const temperatureValue = Math.round(y.invert(e.offsetY));
			console.log(`${temperatureValue}°C`);
			// console.log(y.invert(e.offsetY))
			// skewt.setPartialDataState({level})
		},
		[width]
	);

	const svgRef = useD3<SVGSVGElement>(
		(svg) => {
			svg
				.selectAll('*')
				// on click
				.on('click', interpolateTime)
				// add a on hover to show the temperature and dew point at the cursor
				.on('mousemove', (e: SkewPointerEvent) => {
					// display the temperature and dew point at the cursor

					interpolateData(e);
					// check to see if the ctrl key is pressed if it is then interpolate the position and set the timeIndex
					if (!e.ctrlKey) return;
					interpolateTime(e);
				});
		},
		[interpolateData]
	);

	return (
		<svg width={width} ref={svgRef}>
			{/* background */}
			<rect width={width - 20} height={height} fill='white' />
			{/* main graphic display */}
			<g ref={ref} />
			{/* tooltip */}
		</svg>
	);
}

type ContainerProps = React.PropsWithChildren<SkewT.Dimensions & { setState: React.Dispatch<React.SetStateAction<SkewT.Dimensions>> }>;
type ContainerRef = React.MutableRefObject<HTMLDivElement | null> | React.ForwardedRef<HTMLDivElement | null>;

const Container = React.forwardRef((props: ContainerProps, ref: ContainerRef) => {
	const handleResize = () => {
		// check that the ref is a ref object
		if (typeof ref === 'function') {
			throw new Error('ref must be a ref object');
		}
		if (!ref || !ref.current) return;
		let { width, height } = ref.current.getBoundingClientRect();
		props.setState({ width, height });
	};

	React.useEffect(() => {
		// add the event listener to the window to resize the chart
		window.addEventListener('resize', handleResize);
		// and call it once to set the initial state
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, [ref]);

	return (
		<div ref={ref} style={{ border: 'solid magenta' }}>
			{props.children}
		</div>
	);
});

function MiniNavbar() {
	const { dataState, setPartialDataState } = useSkewT();
	const { pressureLevel } = dataState;
	const validTime = dataState.timeIndex;
	const stationId = 'KBLV';

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', border: 'solid black' }}>
			<div>
				<button onClick={() => setPartialDataState({ pressureLevel: dataState.pressureLevel + 1 })}>+</button>
				<button onClick={() => setPartialDataState({ pressureLevel: dataState.pressureLevel - 1 })}>-</button>
			</div>
			<div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<p style={{ lineHeight: '5px', fontFamily: 'monospace', fontSize: 10, padding: 0 }}>{`Station ID: ${stationId} | Valid Time ${validTime} |  Pressure Level: ${pressureLevel}mb `}</p>
				</div>
			</div>
		</div>
	);
}

export default function () {
	const [state, setState] = React.useState({ width: 0, height: 0 });
	const ref = React.useRef<HTMLDivElement>(null);

	return (
		<div>
			<MiniNavbar />
			<Container ref={ref} setState={setState} {...state}>
				<Graphic {...state} />
			</Container>
		</div>
	);
}
