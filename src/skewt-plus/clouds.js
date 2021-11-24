function lerp(v0, v1, weight) {
	return v0 + weight * (v1 - v0);
}

// let _hrAlt = [0,    5,   11,  16.7, 25,  33.4, 50,  58.4, 66.7, 75,  83.3, 92,  98,  100];     //wndy distribution % for pressure levels

/////////to test
// _hrAlt =[0, 3.42, 4.82, 6.26, 9.23, 12.34, 19.07, 26.63, 35.29, 45.49, 58.01, 74.54, 85.51, 100];
//based on standard elevation for pressure levels  below,  thus linear for elevation

//using d3,  basep=1050
// _hrAlt=[ 2.07, 4.26, 5.39, 6.56, 8.99, 11.56, 17.24, 23.80, 31.55, 41.04, 53.28, 70.52, 82.75, 100];

// var _hrAltPressure = [ null, 950, 925, 900,  850, 800,  700, 600,  500,  400, 300,  200, 150, null];
/////

const lookup = new Uint8Array(256);

for (let i = 0; i < 160; i++) {
	lookup[i] = clampIndex(24 * Math.floor((i + 12) / 16), 160);
}

// Compute the rain clouds cover.
// Output an object:
// - clouds: the clouds cover,
// - width & height: dimension of the cover data.
function computeClouds(ad, wdth = 1, hght = 200) {
	////added wdth and hght,  to improve performance   ///supply own hrAlt   altutude percentage distribution,  based on pressure levels
	// Compute clouds data.

	//console.log("WID",wdth,hght);

	/////////convert to windy format
	//ad must be sorted;

	//rel position 0 to 100
	const logscale = (x, d, r) => {
		//log scale function D3,  x is the value d is the domain [] and r is the range []
		let xlog = Math.log10(x),
			dlog = [Math.log10(d[0]), Math.log10(d[1])],
			delta_d = dlog[1] - dlog[0],
			delta_r = r[1] - r[0];
		return r[0] + ((xlog - dlog[0]) / delta_d) * delta_r;
	};

	let airData = {};
	let hrAltPressure = [],
		hrAlt = [];
	ad.forEach((a) => {
		if (!a.press) return;
		if (a.rh == void 0 && a.dwpt && a.temp) {
			a.rh = 100 * (Math.exp((17.625 * a.dwpt) / (243.04 + a.dwpt)) / Math.exp((17.625 * a.temp) / (243.04 + a.temp))); ///August-Roche-Magnus approximation.
		}
		if (a.rh && a.press >= 100) {
			let p = Math.round(a.press);
			airData[`rh-${p}h`] = [a.rh];
			hrAltPressure.push(p);
			hrAlt.push(logscale(p, [1050, 100], [0, 100]));
		}
	});

	//fix underground clouds,  add humidty 0 element in airData wehre the pressure is surfcace pressure +1:
	airData[`rh-${hrAltPressure[0] + 1}h`] = [0];
	hrAlt.unshift(null, hrAlt[0]);
	hrAltPressure.unshift(null, hrAltPressure[0] + 1);
	hrAltPressure.pop();
	hrAltPressure.push(null);

	///////////

	const numX = airData[`rh-${hrAltPressure[1]}h`].length;
	const numY = hrAltPressure.length;
	const rawClouds = new Array(numX * numY);

	for (let y = 0, index = 0; y < numY; ++y) {
		if (hrAltPressure[y] == null) {
			for (let x = 0; x < numX; ++x) {
				rawClouds[index++] = 0.0;
			}
		} else {
			const weight = hrAlt[y] * 0.01;
			const pAdd = lerp(-60, -70, weight);
			const pMul = lerp(0.025, 0.038, weight);
			const pPow = lerp(6, 4, weight);
			const pMul2 = 1 - 0.8 * Math.pow(weight, 0.7);
			const rhRow = airData[`rh-${hrAltPressure[y]}h`];
			for (let x = 0; x < numX; ++x) {
				const hr = Number(rhRow[x]);
				let f = Math.max(0.0, Math.min((hr + pAdd) * pMul, 1.0));
				f = Math.pow(f, pPow) * pMul2;
				rawClouds[index++] = f;
			}
		}
	}

	// Interpolate raw clouds.
	const sliceWidth = wdth || 10;
	const width = sliceWidth * numX;
	const height = hght || 300;
	const clouds = new Array(width * height);
	const kh = (height - 1) * 0.01;
	const dx2 = (sliceWidth + 1) >> 1;
	let heightLookupIndex = 2 * height;
	const heightLookup = new Array(heightLookupIndex);
	const buffer = new Array(16);
	let previousY;
	let currentY = height;

	for (let j = 0; j < numY - 1; ++j) {
		previousY = currentY;
		currentY = Math.round(height - 1 - hrAlt[j + 1] * kh);
		const j0 = numX * clampIndex(j + 2, numY);
		const j1 = numX * clampIndex(j + 1, numY);
		const j2 = numX * clampIndex(j + 0, numY);
		const j3 = numX * clampIndex(j - 1, numY);
		let previousX = 0;
		let currentX = dx2;
		const deltaY = previousY - currentY;
		const invDeltaY = 1.0 / deltaY;

		for (let i = 0; i < numX + 1; ++i) {
			if (i == 0 && deltaY > 0) {
				const ry = 1.0 / deltaY;
				for (let l = 0; l < deltaY; l++) {
					heightLookup[--heightLookupIndex] = j;
					heightLookup[--heightLookupIndex] = Math.round(10000 * ry * l);
				}
			}
			const i0 = clampIndex(i - 2, numX);
			const i1 = clampIndex(i - 1, numX);
			const i2 = clampIndex(i + 0, numX);
			const i3 = clampIndex(i + 1, numX);
			buffer[0] = rawClouds[j0 + i0];
			buffer[1] = rawClouds[j0 + i1];
			buffer[2] = rawClouds[j0 + i2];
			buffer[3] = rawClouds[j0 + i3];
			buffer[4] = rawClouds[j1 + i0];
			buffer[5] = rawClouds[j1 + i1];
			buffer[6] = rawClouds[j1 + i2];
			buffer[7] = rawClouds[j1 + i3];
			buffer[8] = rawClouds[j2 + i0];
			buffer[9] = rawClouds[j2 + i1];
			buffer[10] = rawClouds[j2 + i2];
			buffer[11] = rawClouds[j2 + i3];
			buffer[12] = rawClouds[j3 + i0];
			buffer[13] = rawClouds[j3 + i1];
			buffer[14] = rawClouds[j3 + i2];
			buffer[15] = rawClouds[j3 + i3];

			const topLeft = currentY * width + previousX;
			const dx = currentX - previousX;
			const fx = 1.0 / dx;

			for (let y = 0; y < deltaY; ++y) {
				let offset = topLeft + y * width;
				for (let x = 0; x < dx; ++x) {
					const black = step(bicubicFiltering(buffer, fx * x, invDeltaY * y) * 160.0);
					clouds[offset++] = 255 - black;
				}
			}

			previousX = currentX;
			currentX += sliceWidth;

			if (currentX > width) {
				currentX = width;
			}
		}
	}

	return { clouds, width, height };
}

function clampIndex(index, size) {
	return index < 0 ? 0 : index > size - 1 ? size - 1 : index;
}

function step(x) {
	return lookup[Math.floor(clampIndex(x, 160))];
}

function cubicInterpolate(y0, y1, y2, y3, m) {
	const a0 = -y0 * 0.5 + 3.0 * y1 * 0.5 - 3.0 * y2 * 0.5 + y3 * 0.5;
	const a1 = y0 - 5.0 * y1 * 0.5 + 2.0 * y2 - y3 * 0.5;
	const a2 = -y0 * 0.5 + y2 * 0.5;
	return a0 * m ** 3 + a1 * m ** 2 + a2 * m + y1;
}

function bicubicFiltering(m, s, t) {
	return cubicInterpolate(cubicInterpolate(m[0], m[1], m[2], m[3], s), cubicInterpolate(m[4], m[5], m[6], m[7], s), cubicInterpolate(m[8], m[9], m[10], m[11], s), cubicInterpolate(m[12], m[13], m[14], m[15], s), t);
}

// Draw the clouds on a canvas.
// This function is useful for debugging.
function cloudsToCanvas({ clouds, width, height, canvas }) {
	if (canvas == null) {
		canvas = document.createElement('canvas');
	}
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	let imageData = ctx.getImageData(0, 0, width, height);
	let imgData = imageData.data;

	let srcOffset = 0;
	let dstOffset = 0;
	for (let x = 0; x < width; ++x) {
		for (let y = 0; y < height; ++y) {
			const color = clouds[srcOffset++];
			imgData[dstOffset++] = color;
			imgData[dstOffset++] = color;
			imgData[dstOffset++] = color;
			imgData[dstOffset++] = color < 245 ? 255 : 0;
		}
	}

	ctx.putImageData(imageData, 0, 0);
	ctx.drawImage(canvas, 0, 0, width, height);

	return canvas;
}
const myClouds = { computeClouds, cloudsToCanvas };
export default myClouds;
