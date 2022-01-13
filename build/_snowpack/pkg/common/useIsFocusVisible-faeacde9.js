import { c as createCommonjsModule } from './_commonjsHelpers-913f9c4a.js';
import { e as esm, _ as _extends_1, o as objectWithoutPropertiesLoose, p as propTypes, r as require$$4, u as useThemeProps_1, j as jsxRuntime } from './useThemeProps-5e0e9cb9.js';
import { i as interopRequireDefault } from './green-31ac1fca.js';
import { r as react } from './index-c9e50cb4.js';
import { b as base } from './index-c891b4c7.js';
import { c as capitalize } from './capitalize-f2e3e429.js';
import { s as styled_1 } from './styled-f79f3650.js';

var createChainedFunction = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = esm.unstable_createChainedFunction;
exports.default = _default;
});

var svgIconClasses_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getSvgIconUtilityClass = getSvgIconUtilityClass;



function getSvgIconUtilityClass(slot) {
  return (0, base.generateUtilityClass)('MuiSvgIcon', slot);
}

const svgIconClasses = (0, base.generateUtilityClasses)('MuiSvgIcon', ['root', 'colorPrimary', 'colorSecondary', 'colorAction', 'colorError', 'colorDisabled', 'fontSizeInherit', 'fontSizeSmall', 'fontSizeMedium', 'fontSizeLarge']);
var _default = svgIconClasses;
exports.default = _default;
});

var SvgIcon_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);



var _capitalize = interopRequireDefault(capitalize);

var _useThemeProps = interopRequireDefault(useThemeProps_1);

var _styled = interopRequireDefault(styled_1);





const _excluded = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    color,
    fontSize,
    classes
  } = ownerState;
  const slots = {
    root: ['root', color !== 'inherit' && `color${(0, _capitalize.default)(color)}`, `fontSize${(0, _capitalize.default)(fontSize)}`]
  };
  return (0, base.unstable_composeClasses)(slots, svgIconClasses_1.getSvgIconUtilityClass, classes);
};

const SvgIconRoot = (0, _styled.default)('svg', {
  name: 'MuiSvgIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== 'inherit' && styles[`color${(0, _capitalize.default)(ownerState.color)}`], styles[`fontSize${(0, _capitalize.default)(ownerState.fontSize)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$palette$ownerS, _theme$palette$ownerS2;

  return {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
    transition: theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter
    }),
    fontSize: {
      inherit: 'inherit',
      small: theme.typography.pxToRem(20),
      medium: theme.typography.pxToRem(24),
      large: theme.typography.pxToRem(35)
    }[ownerState.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (_theme$palette$ownerS = (_theme$palette$ownerS2 = theme.palette[ownerState.color]) == null ? void 0 : _theme$palette$ownerS2.main) != null ? _theme$palette$ownerS : {
      action: theme.palette.action.active,
      disabled: theme.palette.action.disabled,
      inherit: undefined
    }[ownerState.color]
  };
});
const SvgIcon = /*#__PURE__*/React.forwardRef(function SvgIcon(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiSvgIcon'
  });
  const {
    children,
    className,
    color = 'inherit',
    component = 'svg',
    fontSize = 'medium',
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = '0 0 24 24'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    color,
    component,
    fontSize,
    inheritViewBox,
    viewBox
  });
  const more = {};

  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }

  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, jsxRuntime.jsxs)(SvgIconRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState,
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? undefined : true,
    role: titleAccess ? 'img' : undefined,
    ref: ref
  }, more, other, {
    children: [children, titleAccess ? /*#__PURE__*/(0, jsxRuntime.jsx)("title", {
      children: titleAccess
    }) : null]
  }));
});
SvgIcon.muiName = 'SvgIcon';
var _default = SvgIcon;
exports.default = _default;
});

var SvgIcon = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  svgIconClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _SvgIcon.default;
  }
});
Object.defineProperty(exports, "svgIconClasses", {
  enumerable: true,
  get: function () {
    return _svgIconClasses.default;
  }
});

var _SvgIcon = interopRequireDefault(SvgIcon_1);

var _svgIconClasses = _interopRequireWildcard(svgIconClasses_1);

Object.keys(_svgIconClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _svgIconClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _svgIconClasses[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

var createSvgIcon_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSvgIcon;

var _extends2 = interopRequireDefault(_extends_1);

var React = _interopRequireWildcard(react);

var _SvgIcon = interopRequireDefault(SvgIcon);



function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Private module reserved for @mui packages.
 */
function createSvgIcon(path, displayName) {
  const Component = (props, ref) => /*#__PURE__*/(0, jsxRuntime.jsx)(_SvgIcon.default, (0, _extends2.default)({
    "data-testid": `${displayName}Icon`,
    ref: ref
  }, props, {
    children: path
  }));

  Component.muiName = _SvgIcon.default.muiName;
  return /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Component));
}
});

var useEventCallback = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = esm.unstable_useEventCallback;
exports.default = _default;
});

var useIsFocusVisible = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = esm.unstable_useIsFocusVisible;
exports.default = _default;
});

export { createSvgIcon_1 as a, useIsFocusVisible as b, createChainedFunction as c, useEventCallback as u };
