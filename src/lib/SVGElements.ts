import { green, purple, grey, blue, pink, orange, common, blueGrey, cyan, indigo, red } from '@mui/material/colors';
import { createTheme, styled } from '@mui/material/styles';

function applyPathLineStyles(elementType: Skewt.SVGGLineElements) {
	return styled('g')(({ theme }) => {
		const { mode } = theme.palette;
		const stroke = theme[elementType][mode];
		const { strokeWidth, strokeOpacity } = theme[elementType];

		return { stroke, fill: 'none', strokeWidth, strokeOpacity, clipPath: 'url(#clipper)' };
	});
}
const strokeOpacity = 1;
const strokeWidth = 0.4;
export default createTheme({
	temperature: {
		light: red['A700'],
		dark: red['A700'],
		strokeWidth: 2,
		strokeOpacity: 1,
	},
	dewpoint: {
		light: blue['A700'],
		dark: blue['A700'],
		strokeWidth: 2,
		strokeOpacity: 1,
	},
	envLapseRate: {
		light: purple['A700'],
		dark: purple['A700'],
		strokeWidth: 2,
		strokeOpacity,
	},
	isobars: {
		light: blueGrey[900],
		dark: blueGrey['A700'],
		strokeWidth,
		strokeOpacity,
	},
	isotherms: {
		light: red['A400'],
		dark: red['A700'],
		strokeWidth,
		strokeOpacity,
	},
	isohumes: {
		light: purple[900],
		dark: green['A700'],
		strokeWidth,
		strokeOpacity,
	},
	moistAdiabats: {
		light: green['A700'],
		dark: green['A700'],
		strokeWidth,
		strokeOpacity,
	},
	dryAdiabats: {
		light: orange[900],
		dark: orange[400],
		strokeWidth,
		strokeOpacity,
	},
	backdrop: {
		light: 'white',
		dark: 'black',
	},
});

export const SVGGTemperature = applyPathLineStyles('temperature');
export const SVGGDewpoint = applyPathLineStyles('dewpoint');
export const SVGGIsobars = applyPathLineStyles('isobars');
export const SVGGIsotherms = applyPathLineStyles('isotherms');
export const SVGGIsohumes = applyPathLineStyles('isohumes');
export const SVGGDryAdibats = applyPathLineStyles('dryAdiabats');
export const SVGGMoistAdibats = applyPathLineStyles('moistAdiabats');
export const SVGGEnvironmentalLapseRate = applyPathLineStyles('envLapseRate');
export const SVGGTick = styled('g')(({ theme }) => {
	return { stroke: 'green' };
});
export const SVGRectBackdrop = styled('rect')(({ theme }) => {
	const { mode } = theme.palette;
	// const stroke = theme[elementType][mode];
	// const { strokeWidth, strokeOpacity } = theme[elementType];
	return { fill: theme.backdrop[mode] };
});

type blah = Record<Skewt.SVGGLineElements, Skewt.SVGGLine> | { backdrop: Skewt.SVGGRect };
declare module '@mui/material/styles' {
	interface Theme {
		backdrop: Skewt.SVGGRect;
		temperature: Skewt.SVGGLine;
		dewpoint: Skewt.SVGGLine;
		isobars: Skewt.SVGGLine;
		isotherms: Skewt.SVGGLine;
		envLapseRate: Skewt.SVGGLine;
		isohumes: Skewt.SVGGLine;
		moistAdiabats: Skewt.SVGGLine;
		dryAdiabats: Skewt.SVGGLine;
	}
	interface ThemeOptions {
		backdrop: Skewt.SVGGRect;
		temperature: Skewt.SVGGLine;
		dewpoint: Skewt.SVGGLine;
		isobars: Skewt.SVGGLine;
		isotherms: Skewt.SVGGLine;
		envLapseRate: Skewt.SVGGLine;
		isohumes: Skewt.SVGGLine;
		moistAdiabats: Skewt.SVGGLine;
		dryAdiabats: Skewt.SVGGLine;
	}
}
