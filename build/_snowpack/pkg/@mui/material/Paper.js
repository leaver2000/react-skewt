import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-913f9c4a.js';
import { i as interopRequireDefault } from '../../common/green-31ac1fca.js';
import { o as objectWithoutPropertiesLoose, _ as _extends_1, p as propTypes, r as require$$4, u as useThemeProps_1, a as esm, j as jsxRuntime } from '../../common/useThemeProps-5e0e9cb9.js';
import { r as react } from '../../common/index-c9e50cb4.js';
import { b as base } from '../../common/index-c891b4c7.js';
import { s as styled_1 } from '../../common/styled-f79f3650.js';
import { u as useTheme_1 } from '../../common/useTheme-e7ed256e.js';
import '../../common/index-c86b1a01.js';

var paperClasses_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getPaperUtilityClass = getPaperUtilityClass;



function getPaperUtilityClass(slot) {
  return (0, base.generateUtilityClass)('MuiPaper', slot);
}

const paperClasses = (0, base.generateUtilityClasses)('MuiPaper', ['root', 'rounded', 'outlined', 'elevation', 'elevation0', 'elevation1', 'elevation2', 'elevation3', 'elevation4', 'elevation5', 'elevation6', 'elevation7', 'elevation8', 'elevation9', 'elevation10', 'elevation11', 'elevation12', 'elevation13', 'elevation14', 'elevation15', 'elevation16', 'elevation17', 'elevation18', 'elevation19', 'elevation20', 'elevation21', 'elevation22', 'elevation23', 'elevation24']);
var _default = paperClasses;
exports.default = _default;
});

var Paper_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);

var _extends2 = interopRequireDefault(_extends_1);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);







var _styled = interopRequireDefault(styled_1);

var _useThemeProps = interopRequireDefault(useThemeProps_1);

var _useTheme = interopRequireDefault(useTheme_1);





const _excluded = ["className", "component", "elevation", "square", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Inspired by https://github.com/material-components/material-components-ios/blob/bca36107405594d5b7b16265a5b0ed698f85a5ee/components/Elevation/src/UIColor%2BMaterialElevation.m#L61
const getOverlayAlpha = elevation => {
  let alphaValue;

  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }

  return (alphaValue / 100).toFixed(2);
};

const useUtilityClasses = ownerState => {
  const {
    square,
    elevation,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, !square && 'rounded', variant === 'elevation' && `elevation${elevation}`]
  };
  return (0, base.unstable_composeClasses)(slots, paperClasses_1.getPaperUtilityClass, classes);
};

const PaperRoot = (0, _styled.default)('div', {
  name: 'MuiPaper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], !ownerState.square && styles.rounded, ownerState.variant === 'elevation' && styles[`elevation${ownerState.elevation}`]];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: theme.transitions.create('box-shadow')
}, !ownerState.square && {
  borderRadius: theme.shape.borderRadius
}, ownerState.variant === 'outlined' && {
  border: `1px solid ${theme.palette.divider}`
}, ownerState.variant === 'elevation' && (0, _extends2.default)({
  boxShadow: theme.shadows[ownerState.elevation]
}, theme.palette.mode === 'dark' && {
  backgroundImage: `linear-gradient(${(0, esm.alpha)('#fff', getOverlayAlpha(ownerState.elevation))}, ${(0, esm.alpha)('#fff', getOverlayAlpha(ownerState.elevation))})`
})));
const Paper = /*#__PURE__*/React.forwardRef(function Paper(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiPaper'
  });
  const {
    className,
    component = 'div',
    elevation = 1,
    square = false,
    variant = 'elevation'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    component,
    elevation,
    square,
    variant
  });
  const classes = useUtilityClasses(ownerState);

  return /*#__PURE__*/(0, jsxRuntime.jsx)(PaperRoot, (0, _extends2.default)({
    as: component,
    ownerState: ownerState,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other));
});
var _default = Paper;
exports.default = _default;
});

var Paper = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  paperClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Paper.default;
  }
});
Object.defineProperty(exports, "paperClasses", {
  enumerable: true,
  get: function () {
    return _paperClasses.default;
  }
});

var _Paper = interopRequireDefault(Paper_1);

var _paperClasses = _interopRequireWildcard(paperClasses_1);

Object.keys(_paperClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _paperClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _paperClasses[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(Paper);

export default __pika_web_default_export_for_treeshaking__;
