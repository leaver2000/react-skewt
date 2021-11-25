import { scaleLinear, bisector, scaleLog, axisBottom, axisRight, axisLeft, format, range, curveLinear, line, drag, select, selectAll } from 'd3';
import * as atm from './atmosphere.js';
/**
 * SkewT v1.1.0
 * 2016 David Félix - dfelix@live.com.pt
 *
 * Dependency:
 * d3.v3.min.js from https://d3js.org/
 *
 */
const DEG2RAD = Math.PI / 180;
const K0 = 273.15;
const GRADIENT = 45;

function convert(msvalue, unit) {
	switch (unit) {
		case 'kt':
			return msvalue * 1.943844492;
		case 'kmh':
			return msvalue * 3.6;
		default:
			return msvalue;
	}
}
export default class Skewt {
	_selectRefs(refs) {
		this._refs = Object.keys(refs).reduce((obj, k) => {
			this[`_${k}`] = select(refs[k].current);
			return { ...obj, [k]: select(refs[k].current) };
		}, {});
		return this._refs;
	}
	_resize() {
		this._skewtbg.selectAll('*').remove();
		this._setVariables();
		// this._svg.attr('width', w + margin.right + margin.left).attr('height', h + margin.top + margin.bottom);
		// this._container.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
		this._drawBackground();
		this._makeBarbTemplates();
		this.plot(this.data);
	}
	_drawBackground() {}
	_makeBarbTemplates() {}
	_setVariables() {}
	set _variables(vars) {
		console.log(vars);
	}
	plot(data) {
		this._sounding = data;
	}
	constructor(refs, { units = { unit: 'kt' }, w, h, x, y, xAxis, yAxis, yAxis2, options }, cb) {
		const { wrapper, svg, container, skewtbg, skewtgroup, barbgroup } = this._selectRefs(refs);

		var width = parseInt(this._wrapper.style('width'), 10);
		// var height = width; //tofix
		var margin = { top: 30, right: 40, bottom: 20, left: 35 }; //container margins

		var tan = Math.tan(55 * DEG2RAD);
		var basep = 1050;
		var topp = 100;
		var plines = [1000, 850, 700, 500, 300, 200, 100];
		var pticks = [950, 900, 800, 750, 650, 600, 550, 450, 400, 350, 250, 150];
		var barbsize = 25;
		// functions for Scales and axes. Note the inverted domain for the y-scale: bigger is up!
		// var r = scaleLinear().range([0, 300]).domain([0, 150]);
		// var y2 = scaleLinear();
		// var bisectTemp = bisector((d) => d.press).left; // bisector function for tooltips
		// var h, x, y, xAxis, yAxis, yAxis2;
		var data = [];
		//aux
		// var unit = 'kt'; // or kmh
		var midtemp = 0,
			temprange = 60;
		// var altticks = [];
		//containers
		this._variables = { units: 'kt', w, h, x, y, xAxis, yAxis, yAxis2, options };
		function setVariables(margin) {
			width = parseInt(wrapper.style('width'), 10) - 10; // tofix: using -10 to prevent x overflow
			w = 1000;
			h = 1000;
			tan = Math.tan((GRADIENT || 55) * DEG2RAD);
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

		//assigns d3 events
		select(window).on('resize', resize);

		function resize() {
			skewtbg.selectAll('*').remove();
			setVariables();
			svg.attr('width', w + margin.right + margin.left).attr('height', h + margin.top + margin.bottom);
			container.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
			drawBackground();
			makeBarbTemplates();
			plot(data);
		}

		let lines = { temp: null };
		// let clipper;
		// let xAxisValues;
		let moving = false;
		function drawBackground(Increment = -50) {
			var buttons = { 'Dry Adiabat': {}, 'Moist Adiabat': {}, Isohume: {}, Temp: {}, Pressure: {} };
			// Add clipping path
			// clipper = skewtbg.append('clipPath').attr('id', 'clipper').append('rect').attr('x', 0).attr('y', 0).attr('width', w).attr('height', h);

			// Skewed temperature lines
			lines.temp = skewtbg;
			selectAll('templine')
				.data(
					scaleLinear()
						.domain([midtemp - temprange * 3, midtemp + temprange])
						.ticks(24)
				)
				.enter()
				.append('line')
				.attr('x1', (d) => x(d) - 0.5 + (y(basep) - y(topp)) / tan)
				.attr('x2', (d) => x(d) - 0.5)
				.attr('y1', 0)
				.attr('y2', h)
				.attr('class', (d) => (d === 0 ? `tempzero ${buttons['Temp'].hi ? 'highlight-line' : ''}` : `templine ${buttons['Temp'].hi ? 'highlight-line' : ''}`))
				// .attr('class', (d) => (d === 0 ? `tempzero ${buttons['Temp'].hi ? 'highlight-line' : ''}` : `templine ${buttons['Temp'].hi ? 'highlight-line' : ''}`))
				.attr('clip-path', 'url(#clipper)');
			// .on('click', (e) => console.log(e));

			var pp = moving ? [basep, basep - (basep - topp) * 0.25, basep - (basep - topp) * 0.5, basep - (basep - topp) * 0.75, topp] : range(basep, topp - 50, Increment);

			let pAt11km = atm.pressureFromElevation(11000);
			//console.log(pAt11km);

			var elrFx = line()
				.curve(curveLinear)
				.x((d) => {
					let t = d > pAt11km ? 15 - atm.getElevation(d) * 0.00649 : -56.5; //6.49 deg per 1000 m
					return x(t) + (y(basep) - y(d)) / tan;
				})
				.y((d, i) => y(d));

			const elr = skewtbg
				.selectAll('elr')
				.data([plines.filter((p) => p > pAt11km).concat([pAt11km, 50])])
				.enter()
				.append('path')
				.attr('d', elrFx)
				.attr('clip-path', 'url(#clipper)')
				.attr('class', `elr ${true ? 'highlight-line' : ''}`);

			// Logarithmic pressure lines
			const pressure = skewtbg
				.selectAll('pressureline')
				.data(plines)
				.enter()
				.append('line')
				.attr('x1', -w)
				.attr('x2', 2 * w)
				.attr('y1', y)
				.attr('y2', y)
				.attr('clip-path', 'url(#clipper)')
				.attr('class', `pressure ${buttons['Pressure'].hi ? 'highlight-line' : ''}`);

			// create array to plot adiabats

			var dryad = scaleLinear()
				.domain([midtemp - temprange * 2, midtemp + temprange * 4])
				.ticks(36);

			var all = [];

			for (var i = 0; i < dryad.length; i++) {
				var z = [];
				for (var j = 0; j < pp.length; j++) {
					z.push(dryad[i]);
				}
				all.push(z);
			}

			var drylineFx = line()
				.curve(curveLinear)
				.x((d, i) => x(atm.dryLapse(pp[i], K0 + d, basep) - K0) + (y(basep) - y(pp[i])) / tan)
				.y((d, i) => y(pp[i]));

			// Draw dry adiabats
			const dryadiabat = skewtbg
				.selectAll('dryadiabatline')
				.data(all)
				.enter()
				.append('path')
				.attr('class', `dryadiabat  ${buttons['Dry Adiabat'].hi ? 'highlight-line' : ''}`)
				.attr('clip-path', 'url(#clipper)')
				.attr('d', drylineFx);

			// moist adiabat fx
			var temp;
			var moistlineFx = line()
				.curve(curveLinear)
				.x((d, i) => {
					temp = i === 0 ? K0 + d : temp + atm.moistGradientT(pp[i], temp) * (moving ? (topp - basep) / 4 : Increment);
					return x(temp - K0) + (y(basep) - y(pp[i])) / tan;
				})
				.y((_, i) => y(pp[i]));

			// Draw moist adiabats
			const moistadiabat = skewtbg
				.selectAll('moistadiabatline')
				.data(all)
				.enter()
				.append('path')
				.attr('class', `moistadiabat ${buttons['Moist Adiabat'].hi ? 'highlight-line' : ''}`)
				.attr('clip-path', 'url(#clipper)')
				.attr('d', moistlineFx);

			// isohume fx
			var mixingRatio;
			var isohumeFx = line()
				.curve(curveLinear)
				.x((d, i) => {
					//console.log(d);
					if (i === 0) mixingRatio = atm.mixingRatio(atm.saturationVaporPressure(d + K0), pp[i]);
					temp = atm.dewpoint(atm.vaporPressure(pp[i], mixingRatio));
					return x(temp - K0) + (y(basep) - y(pp[i])) / tan;
				})
				.y(function (d, i) {
					return y(pp[i]);
				});

			// Draw isohumes
			const isohume = skewtbg
				.selectAll('isohumeline')
				.data(all)
				.enter()
				.append('path')
				.attr('class', `isohume ${buttons['Isohume'].hi ? 'highlight-line' : ''}`)
				.attr('clip-path', 'url(#clipper)')
				.attr('d', isohumeFx);

			// Line along right edge of plot
			skewtbg
				.append('line')
				.attr('x1', w - 0.5)
				.attr('x2', w - 0.5)
				.attr('y1', 0)
				.attr('y2', h)
				.attr('class', 'gridline');

			// Add axes
			const xAxisValues = skewtbg
				.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,' + (h - 0.5) + ')')
				.call(xAxis)
				.attr('clip-path', 'url(#clipper)');
			// .on('click', (e) => console.log(e));

			skewtbg.append('g').attr('class', 'y axis').attr('transform', 'translate(-0.5,0)').call(yAxis);
			skewtbg.append('g').attr('class', 'y axis ticks').attr('transform', 'translate(-0.5,0)').call(yAxis2);
			// skewtbg.append('g').attr('class', 'y axis hght-ticks').attr('transform', 'translate(-0.5,0)').call(yAxis3);

			lines = { pressure, elr, moistadiabat, dryadiabat, isohume };
		}
		var makeBarbTemplates = function () {
			var speeds = range(5, 105, 5);
			var barbdef = container.append('defs');
			speeds.forEach(function (d) {
				var thisbarb = barbdef.append('g').attr('id', 'barb' + d);
				var flags = Math.floor(d / 50);
				var pennants = Math.floor((d - flags * 50) / 10);
				var halfpennants = Math.floor((d - flags * 50 - pennants * 10) / 5);
				var px = barbsize;
				// Draw wind barb stems
				thisbarb.append('line').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', barbsize);
				// Draw wind barb flags and pennants for each stem
				for (var i = 0; i < flags; i++) {
					thisbarb
						.append('polyline')
						.attr('points', '0,' + px + ' -10,' + px + ' 0,' + (px - 4))
						.attr('class', 'flag');
					px -= 7;
				}
				// Draw pennants on each barb
				for (i = 0; i < pennants; i++) {
					thisbarb
						.append('line')
						.attr('x1', 0)
						.attr('x2', -10)
						.attr('y1', px)
						.attr('y2', px + 4);
					px -= 3;
				}
				// Draw half-pennants on each barb
				for (i = 0; i < halfpennants; i++) {
					thisbarb
						.append('line')
						.attr('x1', 0)
						.attr('x2', -5)
						.attr('y1', px)
						.attr('y2', px + 2);
					px -= 3;
				}
			});
		};

		var drawToolTips = function (skewtlines) {
			var lines = skewtlines.reverse();
			// Draw tooltips
			var tmpcfocus = skewtgroup.append('g').attr('class', 'focus tmpc').style('display', 'none');
			tmpcfocus.append('circle').attr('r', 4);
			tmpcfocus.append('text').attr('x', 9).attr('dy', '.35em');

			var dwpcfocus = skewtgroup.append('g').attr('class', 'focus dwpc').style('display', 'none');
			dwpcfocus.append('circle').attr('r', 4);
			dwpcfocus.append('text').attr('x', -9).attr('text-anchor', 'end').attr('dy', '.35em');

			var hghtfocus = skewtgroup.append('g').attr('class', 'focus').style('display', 'none');
			hghtfocus.append('text').attr('x', 0).attr('text-anchor', 'start').attr('dy', '.35em');

			var wspdfocus = skewtgroup.append('g').attr('class', 'focus windspeed').style('display', 'none');
			wspdfocus.append('text').attr('x', 0).attr('text-anchor', 'start').attr('dy', '.35em');

			container
				.append('rect')
				.attr('class', 'overlay')
				.attr('width', w)
				.attr('height', h)
				.on('mouseover', function () {
					tmpcfocus.style('display', null);
					dwpcfocus.style('display', null);
					hghtfocus.style('display', null);
					wspdfocus.style('display', null);
				})
				.on('mouseout', function () {
					tmpcfocus.style('display', 'none');
					dwpcfocus.style('display', 'none');
					hghtfocus.style('display', 'none');
					wspdfocus.style('display', 'none');
				});
			// .on('mousemove', function () {
			// 	var y0 = y.invert(d3.mouse(this)[1]); // get y value of mouse pointer in pressure space
			// 	var i = bisectTemp(lines, y0, 1, lines.length - 1);
			// 	var d0 = lines[i - 1];
			// 	var d1 = lines[i];
			// 	var d = y0 - d0.press > d1.press - y0 ? d1 : d0;
			// 	tmpcfocus.attr('transform', 'translate(' + (x(d.temp) + (y(basep) - y(d.press)) / tan) + ',' + y(d.press) + ')');
			// 	dwpcfocus.attr('transform', 'translate(' + (x(d.dwpt) + (y(basep) - y(d.press)) / tan) + ',' + y(d.press) + ')');
			// 	hghtfocus.attr('transform', 'translate(0,' + y(d.press) + ')');
			// 	tmpcfocus.select('text').text(Math.round(d.temp) + '°C');
			// 	dwpcfocus.select('text').text(Math.round(d.dwpt) + '°C');
			// 	hghtfocus.select('text').text('-- ' + Math.round(d.hght) + ' m'); //hgt or hghtagl ???
			// 	wspdfocus.attr('transform', 'translate(' + (w - 65) + ',' + y(d.press) + ')');
			// 	wspdfocus.select('text').text(Math.round(convert(d.wspd, unit) * 10) / 10 + ' ' + unit);
			// });
		};

		var plot = (_data) => {
			//plot the skewt
			if (_data.length === 0) return;

			skewtgroup.selectAll('path').remove(); //clear previous paths from skew
			barbgroup.selectAll('use').remove(); //clear previous paths from barbs
			//? plot
			//? templines
			const templineFx = line()
				.curve(curveLinear)
				.x((d) => x(d.temp) + (y(basep) - y(d.press)) / tan)
				.y((d) => y(d.press));

			skewtgroup
				.selectAll('templines')
				.data([_data])
				.enter()
				.append('path')
				.attr('class', (_, i) => (i < 10 ? 'temp skline' : 'temp mean'))
				.attr('clip-path', 'url(#clipper)')
				.attr('d', templineFx);

			// var tempdewline = d3.svg
			// 	.line()
			// 	.interpolate('linear')
			// 	.x(function (d, i) {
			// 		return x(d.dwpt) + (y(basep) - y(d.press)) / tan;
			// 	})
			// 	.y(function (d, i) {
			// 		return y(d.press);
			// 	});
			//? dewpoint
			const tempdewlineFx = line()
				.curve(curveLinear)
				.x((d) => x(d.dwpt) + (y(basep) - y(d.press)) / tan)
				.y((d) => y(d.press));

			skewtgroup
				.selectAll('tempdewlines')
				.data([_data])
				.enter()
				.append('path')
				.attr('class', (_, i) => (i < 10 ? 'dwpt skline' : 'dwpt mean'))
				.attr('clip-path', 'url(#clipper)')
				.attr('d', tempdewlineFx);
		};

		const clear = (s) => {
			skewtgroup.selectAll('path').remove(); //clear previous paths from skew
			barbgroup.selectAll('use').remove(); //clear previous paths  from barbs
			//must clear tooltips!
			container
				.append('rect')
				.attr('class', 'overlay')
				.attr('width', w)
				.attr('height', h)
				.on('mouseover', function () {
					return false;
				})
				.on('mouseout', function () {
					return false;
				})
				.on('mousemove', function () {
					return false;
				});
		};

		//assings functions as public methods
		this.drawBackground = drawBackground;
		this.plot = plot;
		this.clear = clear;

		//init
		setVariables();
		resize();
	}
}
