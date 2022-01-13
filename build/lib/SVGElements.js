import {green, purple, blue, orange, blueGrey, red} from "../_snowpack/pkg/@mui/material/colors.js";
import {createTheme, styled} from "../_snowpack/pkg/@mui/material/styles.js";
function applyPathLineStyles(elementType) {
  return styled("g")(({theme}) => {
    const {mode} = theme.palette;
    const stroke = theme[elementType][mode];
    const {strokeWidth: strokeWidth2, strokeOpacity: strokeOpacity2} = theme[elementType];
    return {stroke, fill: "none", strokeWidth: strokeWidth2, strokeOpacity: strokeOpacity2, clipPath: "url(#clipper)"};
  });
}
const strokeOpacity = 1;
const strokeWidth = 0.4;
export default createTheme({
  temperature: {
    light: red["A700"],
    dark: red["A700"],
    strokeWidth: 2,
    strokeOpacity: 1
  },
  dewpoint: {
    light: blue["A700"],
    dark: blue["A700"],
    strokeWidth: 2,
    strokeOpacity: 1
  },
  envLapseRate: {
    light: purple["A700"],
    dark: purple["A700"],
    strokeWidth: 2,
    strokeOpacity
  },
  isobars: {
    light: blueGrey[900],
    dark: blueGrey["A700"],
    strokeWidth,
    strokeOpacity
  },
  isotherms: {
    light: red["A400"],
    dark: red["A700"],
    strokeWidth,
    strokeOpacity
  },
  isohumes: {
    light: purple[900],
    dark: green["A700"],
    strokeWidth,
    strokeOpacity
  },
  moistAdiabats: {
    light: green["A700"],
    dark: green["A700"],
    strokeWidth,
    strokeOpacity
  },
  dryAdiabats: {
    light: orange[900],
    dark: orange[400],
    strokeWidth,
    strokeOpacity
  },
  backdrop: {
    light: "white",
    dark: "black"
  }
});
export const SVGGTemperature = applyPathLineStyles("temperature");
export const SVGGDewpoint = applyPathLineStyles("dewpoint");
export const SVGGIsobars = applyPathLineStyles("isobars");
export const SVGGIsotherms = applyPathLineStyles("isotherms");
export const SVGGIsohumes = applyPathLineStyles("isohumes");
export const SVGGDryAdibats = applyPathLineStyles("dryAdiabats");
export const SVGGMoistAdibats = applyPathLineStyles("moistAdiabats");
export const SVGGEnvironmentalLapseRate = applyPathLineStyles("envLapseRate");
export const SVGGTick = styled("g")(({theme}) => {
  return {stroke: "green"};
});
export const SVGRectBackdrop = styled("rect")(({theme}) => {
  const {mode} = theme.palette;
  return {fill: theme.backdrop[mode]};
});
