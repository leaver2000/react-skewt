import { c as createCommonjsModule } from './_commonjsHelpers-913f9c4a.js';
import { i as interopRequireDefault } from './green-31ac1fca.js';
import { _ as _extends_1, o as objectWithoutPropertiesLoose, a as esm, c as createTheme_1, e as esm$1, b as createTransitions_1, u as useThemeProps_1 } from './useThemeProps-5e0e9cb9.js';
import { u as useTheme_1 } from './useTheme-e7ed256e.js';
import { s as styled_1 } from './styled-f79f3650.js';

var adaptV4Theme_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = adaptV4Theme;

var _extends2 = interopRequireDefault(_extends_1);

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);



const _excluded = ["defaultProps", "mixins", "overrides", "palette", "props", "styleOverrides"],
      _excluded2 = ["type", "mode"];

function adaptV4Theme(inputTheme) {

  const {
    defaultProps = {},
    mixins = {},
    overrides = {},
    palette = {},
    props = {},
    styleOverrides = {}
  } = inputTheme,
        other = (0, _objectWithoutPropertiesLoose2.default)(inputTheme, _excluded);
  const theme = (0, _extends2.default)({}, other, {
    components: {}
  }); // default props

  Object.keys(defaultProps).forEach(component => {
    const componentValue = theme.components[component] || {};
    componentValue.defaultProps = defaultProps[component];
    theme.components[component] = componentValue;
  });
  Object.keys(props).forEach(component => {
    const componentValue = theme.components[component] || {};
    componentValue.defaultProps = props[component];
    theme.components[component] = componentValue;
  }); // CSS overrides

  Object.keys(styleOverrides).forEach(component => {
    const componentValue = theme.components[component] || {};
    componentValue.styleOverrides = styleOverrides[component];
    theme.components[component] = componentValue;
  });
  Object.keys(overrides).forEach(component => {
    const componentValue = theme.components[component] || {};
    componentValue.styleOverrides = overrides[component];
    theme.components[component] = componentValue;
  }); // theme.spacing

  theme.spacing = (0, esm.createSpacing)(inputTheme.spacing); // theme.mixins.gutters

  const breakpoints = (0, esm.createBreakpoints)(inputTheme.breakpoints || {});
  const spacing = theme.spacing;
  theme.mixins = (0, _extends2.default)({
    gutters: (styles = {}) => {
      return (0, _extends2.default)({
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
      }, styles, {
        [breakpoints.up('sm')]: (0, _extends2.default)({
          paddingLeft: spacing(3),
          paddingRight: spacing(3)
        }, styles[breakpoints.up('sm')])
      });
    }
  }, mixins);
  const {
    type: typeInput,
    mode: modeInput
  } = palette,
        paletteRest = (0, _objectWithoutPropertiesLoose2.default)(palette, _excluded2);
  const finalMode = modeInput || typeInput || 'light';
  theme.palette = (0, _extends2.default)({
    // theme.palette.text.hint
    text: {
      hint: finalMode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)'
    },
    mode: finalMode,
    type: finalMode
  }, paletteRest);
  return theme;
}
});

var createMuiStrictModeTheme_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createMuiStrictModeTheme;



var _createTheme = interopRequireDefault(createTheme_1);

function createMuiStrictModeTheme(options, ...args) {
  return (0, _createTheme.default)((0, esm$1.deepmerge)({
    unstable_strictMode: true
  }, options), ...args);
}
});

var createStyles_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStyles;
let warnedOnce = false; // To remove in v6

function createStyles(styles) {
  if (!warnedOnce) {
    console.warn(['MUI: createStyles from @mui/material/styles is deprecated.', 'Please use @mui/styles/createStyles'].join('\n'));
    warnedOnce = true;
  }

  return styles;
}
});

var cssUtils = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alignProperty = alignProperty;
exports.convertLength = convertLength;
exports.fontGrid = fontGrid;
exports.getUnit = getUnit;
exports.isUnitless = isUnitless;
exports.responsiveProperty = responsiveProperty;
exports.toUnitless = toUnitless;

function isUnitless(value) {
  return String(parseFloat(value)).length === String(value).length;
} // Ported from Compass
// https://github.com/Compass/compass/blob/master/core/stylesheets/compass/typography/_units.scss
// Emulate the sass function "unit"


function getUnit(input) {
  return String(input).match(/[\d.\-+]*\s*(.*)/)[1] || '';
} // Emulate the sass function "unitless"


function toUnitless(length) {
  return parseFloat(length);
} // Convert any CSS <length> or <percentage> value to any another.
// From https://github.com/KyleAMathews/convert-css-length


function convertLength(baseFontSize) {
  return (length, toUnit) => {
    const fromUnit = getUnit(length); // Optimize for cases where `from` and `to` units are accidentally the same.

    if (fromUnit === toUnit) {
      return length;
    } // Convert input length to pixels.


    let pxLength = toUnitless(length);

    if (fromUnit !== 'px') {
      if (fromUnit === 'em') {
        pxLength = toUnitless(length) * toUnitless(baseFontSize);
      } else if (fromUnit === 'rem') {
        pxLength = toUnitless(length) * toUnitless(baseFontSize);
      }
    } // Convert length in pixels to the output unit


    let outputLength = pxLength;

    if (toUnit !== 'px') {
      if (toUnit === 'em') {
        outputLength = pxLength / toUnitless(baseFontSize);
      } else if (toUnit === 'rem') {
        outputLength = pxLength / toUnitless(baseFontSize);
      } else {
        return length;
      }
    }

    return parseFloat(outputLength.toFixed(5)) + toUnit;
  };
}

function alignProperty({
  size,
  grid
}) {
  const sizeBelow = size - size % grid;
  const sizeAbove = sizeBelow + grid;
  return size - sizeBelow < sizeAbove - size ? sizeBelow : sizeAbove;
} // fontGrid finds a minimal grid (in rem) for the fontSize values so that the
// lineHeight falls under a x pixels grid, 4px in the case of Material Design,
// without changing the relative line height


function fontGrid({
  lineHeight,
  pixels,
  htmlFontSize
}) {
  return pixels / (lineHeight * htmlFontSize);
}
/**
 * generate a responsive version of a given CSS property
 * @example
 * responsiveProperty({
 *   cssProperty: 'fontSize',
 *   min: 15,
 *   max: 20,
 *   unit: 'px',
 *   breakpoints: [300, 600],
 * })
 *
 * // this returns
 *
 * {
 *   fontSize: '15px',
 *   '@media (min-width:300px)': {
 *     fontSize: '17.5px',
 *   },
 *   '@media (min-width:600px)': {
 *     fontSize: '20px',
 *   },
 * }
 * @param {Object} params
 * @param {string} params.cssProperty - The CSS property to be made responsive
 * @param {number} params.min - The smallest value of the CSS property
 * @param {number} params.max - The largest value of the CSS property
 * @param {string} [params.unit] - The unit to be used for the CSS property
 * @param {Array.number} [params.breakpoints]  - An array of breakpoints
 * @param {number} [params.alignStep] - Round scaled value to fall under this grid
 * @returns {Object} responsive styles for {params.cssProperty}
 */


function responsiveProperty({
  cssProperty,
  min,
  max,
  unit = 'rem',
  breakpoints = [600, 900, 1200],
  transform = null
}) {
  const output = {
    [cssProperty]: `${min}${unit}`
  };
  const factor = (max - min) / breakpoints[breakpoints.length - 1];
  breakpoints.forEach(breakpoint => {
    let value = min + factor * breakpoint;

    if (transform !== null) {
      value = transform(value);
    }

    output[`@media (min-width:${breakpoint}px)`] = {
      [cssProperty]: `${Math.round(value * 10000) / 10000}${unit}`
    };
  });
  return output;
}
});

var responsiveFontSizes_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = responsiveFontSizes;

var _extends2 = interopRequireDefault(_extends_1);





function responsiveFontSizes(themeInput, options = {}) {
  const {
    breakpoints = ['sm', 'md', 'lg'],
    disableAlign = false,
    factor = 2,
    variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline']
  } = options;
  const theme = (0, _extends2.default)({}, themeInput);
  theme.typography = (0, _extends2.default)({}, theme.typography);
  const typography = theme.typography; // Convert between CSS lengths e.g. em->px or px->rem
  // Set the baseFontSize for your project. Defaults to 16px (also the browser default).

  const convert = (0, cssUtils.convertLength)(typography.htmlFontSize);
  const breakpointValues = breakpoints.map(x => theme.breakpoints.values[x]);
  variants.forEach(variant => {
    const style = typography[variant];
    const remFontSize = parseFloat(convert(style.fontSize, 'rem'));

    if (remFontSize <= 1) {
      return;
    }

    const maxFontSize = remFontSize;
    const minFontSize = 1 + (maxFontSize - 1) / factor;
    let {
      lineHeight
    } = style;

    if (!(0, cssUtils.isUnitless)(lineHeight) && !disableAlign) {
      throw new Error( (0, esm$1.formatMuiErrorMessage)(6));
    }

    if (!(0, cssUtils.isUnitless)(lineHeight)) {
      // make it unitless
      lineHeight = parseFloat(convert(lineHeight, 'rem')) / parseFloat(remFontSize);
    }

    let transform = null;

    if (!disableAlign) {
      transform = value => (0, cssUtils.alignProperty)({
        size: value,
        grid: (0, cssUtils.fontGrid)({
          pixels: 4,
          lineHeight,
          htmlFontSize: typography.htmlFontSize
        })
      });
    }

    typography[variant] = (0, _extends2.default)({}, style, (0, cssUtils.responsiveProperty)({
      cssProperty: 'fontSize',
      min: minFontSize,
      max: maxFontSize,
      unit: 'rem',
      breakpoints: breakpointValues,
      transform
    }));
  });
  return theme;
}
});

var ThemeProvider = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return esm.ThemeProvider;
  }
});
});

var makeStyles_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeStyles;



function makeStyles() {
  throw new Error( (0, esm$1.formatMuiErrorMessage)(14));
}
});

var withStyles_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withStyles;



function withStyles() {
  throw new Error( (0, esm$1.formatMuiErrorMessage)(15));
}
});

var withTheme_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withTheme;



function withTheme() {
  throw new Error( (0, esm$1.formatMuiErrorMessage)(16));
}
});

var styles = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "StyledEngineProvider", {
  enumerable: true,
  get: function () {
    return esm.StyledEngineProvider;
  }
});
Object.defineProperty(exports, "ThemeProvider", {
  enumerable: true,
  get: function () {
    return _ThemeProvider.default;
  }
});
Object.defineProperty(exports, "adaptV4Theme", {
  enumerable: true,
  get: function () {
    return _adaptV4Theme.default;
  }
});
Object.defineProperty(exports, "alpha", {
  enumerable: true,
  get: function () {
    return esm.alpha;
  }
});
Object.defineProperty(exports, "createMuiTheme", {
  enumerable: true,
  get: function () {
    return _createTheme.createMuiTheme;
  }
});
Object.defineProperty(exports, "createStyles", {
  enumerable: true,
  get: function () {
    return _createStyles.default;
  }
});
Object.defineProperty(exports, "createTheme", {
  enumerable: true,
  get: function () {
    return _createTheme.default;
  }
});
Object.defineProperty(exports, "css", {
  enumerable: true,
  get: function () {
    return esm.css;
  }
});
Object.defineProperty(exports, "darken", {
  enumerable: true,
  get: function () {
    return esm.darken;
  }
});
Object.defineProperty(exports, "decomposeColor", {
  enumerable: true,
  get: function () {
    return esm.decomposeColor;
  }
});
Object.defineProperty(exports, "duration", {
  enumerable: true,
  get: function () {
    return createTransitions_1.duration;
  }
});
Object.defineProperty(exports, "easing", {
  enumerable: true,
  get: function () {
    return createTransitions_1.easing;
  }
});
Object.defineProperty(exports, "emphasize", {
  enumerable: true,
  get: function () {
    return esm.emphasize;
  }
});
Object.defineProperty(exports, "experimentalStyled", {
  enumerable: true,
  get: function () {
    return _styled.default;
  }
});
Object.defineProperty(exports, "experimental_sx", {
  enumerable: true,
  get: function () {
    return esm.experimental_sx;
  }
});
Object.defineProperty(exports, "getContrastRatio", {
  enumerable: true,
  get: function () {
    return esm.getContrastRatio;
  }
});
Object.defineProperty(exports, "getLuminance", {
  enumerable: true,
  get: function () {
    return esm.getLuminance;
  }
});
Object.defineProperty(exports, "hexToRgb", {
  enumerable: true,
  get: function () {
    return esm.hexToRgb;
  }
});
Object.defineProperty(exports, "hslToRgb", {
  enumerable: true,
  get: function () {
    return esm.hslToRgb;
  }
});
Object.defineProperty(exports, "keyframes", {
  enumerable: true,
  get: function () {
    return esm.keyframes;
  }
});
Object.defineProperty(exports, "lighten", {
  enumerable: true,
  get: function () {
    return esm.lighten;
  }
});
Object.defineProperty(exports, "makeStyles", {
  enumerable: true,
  get: function () {
    return _makeStyles.default;
  }
});
Object.defineProperty(exports, "recomposeColor", {
  enumerable: true,
  get: function () {
    return esm.recomposeColor;
  }
});
Object.defineProperty(exports, "responsiveFontSizes", {
  enumerable: true,
  get: function () {
    return _responsiveFontSizes.default;
  }
});
Object.defineProperty(exports, "rgbToHex", {
  enumerable: true,
  get: function () {
    return esm.rgbToHex;
  }
});
Object.defineProperty(exports, "styled", {
  enumerable: true,
  get: function () {
    return _styled.default;
  }
});
Object.defineProperty(exports, "unstable_createMuiStrictModeTheme", {
  enumerable: true,
  get: function () {
    return _createMuiStrictModeTheme.default;
  }
});
Object.defineProperty(exports, "unstable_getUnit", {
  enumerable: true,
  get: function () {
    return cssUtils.getUnit;
  }
});
Object.defineProperty(exports, "unstable_toUnitless", {
  enumerable: true,
  get: function () {
    return cssUtils.toUnitless;
  }
});
Object.defineProperty(exports, "useTheme", {
  enumerable: true,
  get: function () {
    return _useTheme.default;
  }
});
Object.defineProperty(exports, "useThemeProps", {
  enumerable: true,
  get: function () {
    return _useThemeProps.default;
  }
});
Object.defineProperty(exports, "withStyles", {
  enumerable: true,
  get: function () {
    return _withStyles.default;
  }
});
Object.defineProperty(exports, "withTheme", {
  enumerable: true,
  get: function () {
    return _withTheme.default;
  }
});

var _adaptV4Theme = interopRequireDefault(adaptV4Theme_1);



var _createTheme = _interopRequireWildcard(createTheme_1);

var _createMuiStrictModeTheme = interopRequireDefault(createMuiStrictModeTheme_1);

var _createStyles = interopRequireDefault(createStyles_1);



var _responsiveFontSizes = interopRequireDefault(responsiveFontSizes_1);



var _useTheme = interopRequireDefault(useTheme_1);

var _useThemeProps = interopRequireDefault(useThemeProps_1);

var _styled = interopRequireDefault(styled_1);

var _ThemeProvider = interopRequireDefault(ThemeProvider);

var _makeStyles = interopRequireDefault(makeStyles_1);

var _withStyles = interopRequireDefault(withStyles_1);

var _withTheme = interopRequireDefault(withTheme_1);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

export { styles as s };
