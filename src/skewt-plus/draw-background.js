function drawBackground({clipper,skewtbg, lines,midtemp,temprange,topp,tan,buttons.P}) {
    // Add clipping path
    clipper = skewtbg.append('clipPath').attr('id', 'clipper').append('rect').attr('x', 0).attr('y', 0).attr('width', w).attr('height', h);

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
        .attr('x1', (d) => x(d) - 0.5 + (y(P.base) - y(topp)) / tan)
        .attr('x2', (d) => x(d) - 0.5)
        .attr('y1', 0)
        .attr('y2', h)
        .attr('class', (d) => (d === 0 ? `tempzero ${buttons['Temp'].hi ? 'highlight-line' : ''}` : `templine ${buttons['Temp'].hi ? 'highlight-line' : ''}`))
        .attr('clip-path', 'url(#clipper)')
        .on('click', (e) => console.log(e));

    var pp = moving ? [P.base, P.base - (P.base - topp) * 0.25, P.base - (P.base - topp) * 0.5, P.base - (P.base - topp) * 0.75, topp] : range(P.base, topp - 50, P.increment);

    let pAt11km = atm.pressureFromElevation(11000);
    //console.log(pAt11km);

    var elrFx = line()
        .curve(curveLinear)
        .x(function (d, i) {
            let e = atm.getElevation2(d);
            let t = d > pAt11km ? 15 - atm.getElevation(d) * 0.00649 : -56.5; //6.49 deg per 1000 m
            return x(t) + (y(P.base) - y(d)) / tan;
        })
        .y(function (d, i) {
            return y(d);
        });

    const elr = skewtbg
        .selectAll('elr')
        .data([P.lines.filter((p) => p > pAt11km).concat([pAt11km, 50])])
        .enter()
        .append('path')
        .attr('d', elrFx)
        .attr('clip-path', 'url(#clipper)')
        .attr('class', `elr ${showElr ? 'highlight-line' : ''}`);

    // Logarithmic pressure lines
    const pressure = skewtbg
        .selectAll('pressureline')
        .data(P.lines)
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
        .x(function (d, i) {
            return x(atm.dryLapse(pp[i], K0 + d, P.base) - K0) + (y(P.base) - y(pp[i])) / tan;
        })
        .y(function (d, i) {
            return y(pp[i]);
        });

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
        .x(function (d, i) {
            temp = i == 0 ? K0 + d : temp + atm.moistGradientT(pp[i], temp) * (moving ? (topp - P.base) / 4 : P.increment);
            return x(temp - K0) + (y(P.base) - y(pp[i])) / tan;
        })
        .y(function (d, i) {
            return y(pp[i]);
        });

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
        .x(function (d, i) {
            //console.log(d);
            if (i == 0) mixingRatio = atm.mixingRatio(atm.saturationVaporPressure(d + K0), pp[i]);
            temp = atm.dewpoint(atm.vaporPressure(pp[i], mixingRatio));
            return x(temp - K0) + (y(P.base) - y(pp[i])) / tan;
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
    xAxisValues = skewtbg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (h - 0.5) + ')')
        .call(xAxis)
        .attr('clip-path', 'url(#clipper)')
        .on('click', (e) => console.log(e));
    skewtbg.append('g').attr('class', 'y axis').attr('transform', 'translate(-0.5,0)').call(yAxis);
    skewtbg.append('g').attr('class', 'y axis ticks').attr('transform', 'translate(-0.5,0)').call(yAxis2);
    skewtbg.append('g').attr('class', 'y axis hght-ticks').attr('transform', 'translate(-0.5,0)').call(yAxis3);

    lines = { pressure, elr, moistadiabat, dryadiabat, isohume };
}