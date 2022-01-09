import React from 'react';
import { styled } from '@mui/system';
import { green, purple, grey, blue, pink, orange, common, blueGrey, cyan, indigo, red } from '@mui/material/colors';
const applyStyles = (lineType: string) => {
    const makeProps = () => {
        switch (lineType) {
            case 'temperature':
            case 'dewpoint':
                return { strokeOpacity: 1, strokeWidth: 1.5 };
            case 'elr':
                return { strokeOpacity: 0.8, strokeWidth: 1 };
            default:
                return { strokeOpacity: 0.2 };
        }
    };

    return styled('g')(({ theme: { palette } }) => {
        const { mode, skewtStrokes } = palette;
        return { stroke: skewtStrokes[lineType][mode], fill: 'none', ...makeProps() };
    });
};

export const SVGGEnvironmentalLapseRate = applyStyles('elr');
export const SVGGDewpoint = applyStyles('dewpoint');
export const SVGGTemperature = applyStyles('temperature');
export const SVGGIsobars = applyStyles('isobars');
export const SVGGIsohumes = applyStyles('isohumes');
export const SVGGIsotherms = applyStyles('isotherms');
export const SVGGDryAdibats = applyStyles('dryAdiabats');
export const SVGGMoistAdibats = applyStyles('moistAdiabats');
export const SVGGTick = styled('g')({ fill: 'none', stroke: 'white' });
export const skewtStrokes = {
    temperature: {
        light: red['A700'],
        dark: orange['A700'],
    },
    dewpoint: {
        light: green['A700'],
        dark: blue['A700'],
    },
    isobars: {
        light: blueGrey[900],
        dark: orange['A700'],
    },
    isotherms: {
        light: purple['A700'],
        dark: orange['A700'],
    },
    elr: {
        light: purple['A700'],
        dark: purple['A700'],
    },
    isohumes: {
        light: green['A700'],
        dark: green['A700'],
    },
    moistAdiabats: {
        light: green['A700'],
        dark: green['A700'],
    },
    dryAdiabats: {
        light: orange['A700'],
        dark: orange['A700'],
    },
};