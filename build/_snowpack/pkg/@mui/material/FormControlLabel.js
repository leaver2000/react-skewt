import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-913f9c4a.js';
import { i as interopRequireDefault } from '../../common/green-31ac1fca.js';
import { o as objectWithoutPropertiesLoose, _ as _extends_1, p as propTypes, r as require$$4, u as useThemeProps_1, a as esm, j as jsxRuntime } from '../../common/useThemeProps-5e0e9cb9.js';
import { r as react } from '../../common/index-c9e50cb4.js';
import { b as base } from '../../common/index-c891b4c7.js';
import { F as FormControl } from '../../common/index-94cef2db.js';
import { s as styled_1 } from '../../common/styled-f79f3650.js';
import { c as capitalize } from '../../common/capitalize-f2e3e429.js';
import '../../common/index-c86b1a01.js';
import '../../common/isMuiElement-d16e209f.js';
import '../../common/useFormControl-2684f4d4.js';

var typographyClasses_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTypographyUtilityClass = getTypographyUtilityClass;



function getTypographyUtilityClass(slot) {
  return (0, base.generateUtilityClass)('MuiTypography', slot);
}

const typographyClasses = (0, base.generateUtilityClasses)('MuiTypography', ['root', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit', 'button', 'caption', 'overline', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify', 'noWrap', 'gutterBottom', 'paragraph']);
var _default = typographyClasses;
exports.default = _default;
});

var Typography_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TypographyRoot = void 0;

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);

var _extends2 = interopRequireDefault(_extends_1);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);





var _styled = interopRequireDefault(styled_1);

var _useThemeProps = interopRequireDefault(useThemeProps_1);

var _capitalize = interopRequireDefault(capitalize);





const _excluded = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    align,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, ownerState.align !== 'inherit' && `align${(0, _capitalize.default)(align)}`, gutterBottom && 'gutterBottom', noWrap && 'noWrap', paragraph && 'paragraph']
  };
  return (0, base.unstable_composeClasses)(slots, typographyClasses_1.getTypographyUtilityClass, classes);
};

const TypographyRoot = (0, _styled.default)('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.variant && styles[ownerState.variant], ownerState.align !== 'inherit' && styles[`align${(0, _capitalize.default)(ownerState.align)}`], ownerState.noWrap && styles.noWrap, ownerState.gutterBottom && styles.gutterBottom, ownerState.paragraph && styles.paragraph];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  margin: 0
}, ownerState.variant && theme.typography[ownerState.variant], ownerState.align !== 'inherit' && {
  textAlign: ownerState.align
}, ownerState.noWrap && {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}, ownerState.gutterBottom && {
  marginBottom: '0.35em'
}, ownerState.paragraph && {
  marginBottom: 16
}));
exports.TypographyRoot = TypographyRoot;
const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p'
}; // TODO v6: deprecate these color values in v5.x and remove the transformation in v6

const colorTransformations = {
  primary: 'primary.main',
  textPrimary: 'text.primary',
  secondary: 'secondary.main',
  textSecondary: 'text.secondary',
  error: 'error.main'
};

const transformDeprecatedColors = color => {
  return colorTransformations[color] || color;
};

const Typography = /*#__PURE__*/React.forwardRef(function Typography(inProps, ref) {
  const themeProps = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiTypography'
  });
  const color = transformDeprecatedColors(themeProps.color);
  const props = (0, esm.unstable_extendSxProp)((0, _extends2.default)({}, themeProps, {
    color
  }));
  const {
    align = 'inherit',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  });
  const Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, jsxRuntime.jsx)(TypographyRoot, (0, _extends2.default)({
    as: Component,
    ref: ref,
    ownerState: ownerState,
    className: (0, _clsx.default)(classes.root, className)
  }, other));
});
var _default = Typography;
exports.default = _default;
});

var Typography = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  typographyClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Typography.default;
  }
});
Object.defineProperty(exports, "typographyClasses", {
  enumerable: true,
  get: function () {
    return _typographyClasses.default;
  }
});

var _Typography = interopRequireDefault(Typography_1);

var _typographyClasses = _interopRequireWildcard(typographyClasses_1);

Object.keys(_typographyClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _typographyClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _typographyClasses[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

var formControlLabelClasses_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getFormControlLabelUtilityClasses = getFormControlLabelUtilityClasses;



function getFormControlLabelUtilityClasses(slot) {
  return (0, base.generateUtilityClass)('MuiFormControlLabel', slot);
}

const formControlLabelClasses = (0, base.generateUtilityClasses)('MuiFormControlLabel', ['root', 'labelPlacementStart', 'labelPlacementTop', 'labelPlacementBottom', 'disabled', 'label']);
var _default = formControlLabelClasses;
exports.default = _default;
});

var FormControlLabel_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FormControlLabelRoot = void 0;

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);

var _extends2 = interopRequireDefault(_extends_1);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);







var _Typography = interopRequireDefault(Typography);

var _capitalize = interopRequireDefault(capitalize);

var _styled = interopRequireDefault(styled_1);

var _useThemeProps = interopRequireDefault(useThemeProps_1);

var _formControlLabelClasses = _interopRequireWildcard(formControlLabelClasses_1);



const _excluded = ["checked", "className", "componentsProps", "control", "disabled", "disableTypography", "inputRef", "label", "labelPlacement", "name", "onChange", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes,
    disabled,
    labelPlacement
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', `labelPlacement${(0, _capitalize.default)(labelPlacement)}`],
    label: ['label', disabled && 'disabled']
  };
  return (0, base.unstable_composeClasses)(slots, _formControlLabelClasses.getFormControlLabelUtilityClasses, classes);
};

const FormControlLabelRoot = (0, _styled.default)('label', {
  name: 'MuiFormControlLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${_formControlLabelClasses.default.label}`]: styles.label
    }, styles.root, styles[`labelPlacement${(0, _capitalize.default)(ownerState.labelPlacement)}`]];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'transparent',
  marginLeft: -11,
  marginRight: 16,
  // used for row presentation of radio/checkbox
  [`&.${_formControlLabelClasses.default.disabled}`]: {
    cursor: 'default'
  }
}, ownerState.labelPlacement === 'start' && {
  flexDirection: 'row-reverse',
  marginLeft: 16,
  // used for row presentation of radio/checkbox
  marginRight: -11
}, ownerState.labelPlacement === 'top' && {
  flexDirection: 'column-reverse',
  marginLeft: 16
}, ownerState.labelPlacement === 'bottom' && {
  flexDirection: 'column',
  marginLeft: 16
}, {
  [`& .${_formControlLabelClasses.default.label}`]: {
    [`&.${_formControlLabelClasses.default.disabled}`]: {
      color: theme.palette.text.disabled
    }
  }
}));
/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */

exports.FormControlLabelRoot = FormControlLabelRoot;
const FormControlLabel = /*#__PURE__*/React.forwardRef(function FormControlLabel(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiFormControlLabel'
  });
  const {
    className,
    componentsProps = {},
    control,
    disabled: disabledProp,
    disableTypography,
    label,
    labelPlacement = 'end'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const muiFormControl = (0, FormControl.useFormControl)();
  let disabled = disabledProp;

  if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
    disabled = control.props.disabled;
  }

  if (typeof disabled === 'undefined' && muiFormControl) {
    disabled = muiFormControl.disabled;
  }

  const controlProps = {
    disabled
  };
  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(key => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });
  const ownerState = (0, _extends2.default)({}, props, {
    disabled,
    label,
    labelPlacement
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, jsxRuntime.jsxs)(FormControlLabelRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/React.cloneElement(control, controlProps), label.type === _Typography.default || disableTypography ? label : /*#__PURE__*/(0, jsxRuntime.jsx)(_Typography.default, (0, _extends2.default)({
      component: "span",
      className: classes.label
    }, componentsProps.typography, {
      children: label
    }))]
  }));
});
var _default = FormControlLabel;
exports.default = _default;
});

var FormControlLabel = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  formControlLabelClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _FormControlLabel.default;
  }
});
Object.defineProperty(exports, "formControlLabelClasses", {
  enumerable: true,
  get: function () {
    return _formControlLabelClasses.default;
  }
});

var _FormControlLabel = interopRequireDefault(FormControlLabel_1);

var _formControlLabelClasses = _interopRequireWildcard(formControlLabelClasses_1);

Object.keys(_formControlLabelClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formControlLabelClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formControlLabelClasses[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(FormControlLabel);

export default __pika_web_default_export_for_treeshaking__;
