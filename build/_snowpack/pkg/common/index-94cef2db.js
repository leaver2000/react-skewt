import { c as createCommonjsModule, g as getDefaultExportFromCjs } from './_commonjsHelpers-913f9c4a.js';
import { i as interopRequireDefault } from './green-31ac1fca.js';
import { o as objectWithoutPropertiesLoose, _ as _extends_1, p as propTypes, r as require$$4, u as useThemeProps_1, j as jsxRuntime } from './useThemeProps-5e0e9cb9.js';
import { r as react } from './index-c9e50cb4.js';
import { b as base } from './index-c891b4c7.js';
import { s as styled_1 } from './styled-f79f3650.js';
import { c as capitalize } from './capitalize-f2e3e429.js';
import { i as isMuiElement } from './isMuiElement-d16e209f.js';
import { F as FormControlContext_1, u as useFormControl_1 } from './useFormControl-2684f4d4.js';

var utils = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasValue = hasValue;
exports.isAdornedStart = isAdornedStart;
exports.isFilled = isFilled;

// Supports determination of isControlled().
// Controlled input accepts its current value as a prop.
//
// @see https://facebook.github.io/react/docs/forms.html#controlled-components
// @param value
// @returns {boolean} true if string (including '') or number (including zero)
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
} // Determine if field is empty or filled.
// Response determines if label is presented above field or as placeholder.
//
// @param obj
// @param SSR
// @returns {boolean} False when not present or empty string.
//                    True when any number or string with length.


function isFilled(obj, SSR = false) {
  return obj && (hasValue(obj.value) && obj.value !== '' || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== '');
} // Determine if an Input is adorned on start.
// It's corresponding to the left with LTR.
//
// @param obj
// @returns {boolean} False when no adornments.
//                    True when adorned at the start.


function isAdornedStart(obj) {
  return obj.startAdornment;
}
});

var formControlClasses_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getFormControlUtilityClasses = getFormControlUtilityClasses;



function getFormControlUtilityClasses(slot) {
  return (0, base.generateUtilityClass)('MuiFormControl', slot);
}

const formControlClasses = (0, base.generateUtilityClasses)('MuiFormControl', ['root', 'marginNone', 'marginNormal', 'marginDense', 'fullWidth', 'disabled']);
var _default = formControlClasses;
exports.default = _default;
});

var FormControl_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);

var _extends2 = interopRequireDefault(_extends_1);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);



var _useThemeProps = interopRequireDefault(useThemeProps_1);

var _styled = interopRequireDefault(styled_1);



var _capitalize = interopRequireDefault(capitalize);

var _isMuiElement = interopRequireDefault(isMuiElement);

var _FormControlContext = interopRequireDefault(FormControlContext_1);





const _excluded = ["children", "className", "color", "component", "disabled", "error", "focused", "fullWidth", "hiddenLabel", "margin", "required", "size", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes,
    margin,
    fullWidth
  } = ownerState;
  const slots = {
    root: ['root', margin !== 'none' && `margin${(0, _capitalize.default)(margin)}`, fullWidth && 'fullWidth']
  };
  return (0, base.unstable_composeClasses)(slots, formControlClasses_1.getFormControlUtilityClasses, classes);
};

const FormControlRoot = (0, _styled.default)('div', {
  name: 'MuiFormControl',
  slot: 'Root',
  overridesResolver: ({
    ownerState
  }, styles) => {
    return (0, _extends2.default)({}, styles.root, styles[`margin${(0, _capitalize.default)(ownerState.margin)}`], ownerState.fullWidth && styles.fullWidth);
  }
})(({
  ownerState
}) => (0, _extends2.default)({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  // Reset fieldset default style.
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: 'top'
}, ownerState.margin === 'normal' && {
  marginTop: 16,
  marginBottom: 8
}, ownerState.margin === 'dense' && {
  marginTop: 8,
  marginBottom: 4
}, ownerState.fullWidth && {
  width: '100%'
}));
/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 *
 * You can find one composition example below and more going to [the demos](/components/text-fields/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `InputBase` can be used within a FormControl because it create visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 */

const FormControl = /*#__PURE__*/React.forwardRef(function FormControl(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiFormControl'
  });
  const {
    children,
    className,
    color = 'primary',
    component = 'div',
    disabled = false,
    error = false,
    focused: visuallyFocused,
    fullWidth = false,
    hiddenLabel = false,
    margin = 'none',
    required = false,
    size = 'medium',
    variant = 'outlined'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    color,
    component,
    disabled,
    error,
    fullWidth,
    hiddenLabel,
    margin,
    required,
    size,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const [adornedStart, setAdornedStart] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialAdornedStart = false;

    if (children) {
      React.Children.forEach(children, child => {
        if (!(0, _isMuiElement.default)(child, ['Input', 'Select'])) {
          return;
        }

        const input = (0, _isMuiElement.default)(child, ['Select']) ? child.props.input : child;

        if (input && (0, utils.isAdornedStart)(input.props)) {
          initialAdornedStart = true;
        }
      });
    }

    return initialAdornedStart;
  });
  const [filled, setFilled] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialFilled = false;

    if (children) {
      React.Children.forEach(children, child => {
        if (!(0, _isMuiElement.default)(child, ['Input', 'Select'])) {
          return;
        }

        if ((0, utils.isFilled)(child.props, true)) {
          initialFilled = true;
        }
      });
    }

    return initialFilled;
  });
  const [focusedState, setFocused] = React.useState(false);

  if (disabled && focusedState) {
    setFocused(false);
  }

  const focused = visuallyFocused !== undefined && !disabled ? visuallyFocused : focusedState;
  let registerEffect;

  const onFilled = React.useCallback(() => {
    setFilled(true);
  }, []);
  const onEmpty = React.useCallback(() => {
    setFilled(false);
  }, []);
  const childContext = {
    adornedStart,
    setAdornedStart,
    color,
    disabled,
    error,
    filled,
    focused,
    fullWidth,
    hiddenLabel,
    size,
    onBlur: () => {
      setFocused(false);
    },
    onEmpty,
    onFilled,
    onFocus: () => {
      setFocused(true);
    },
    registerEffect,
    required,
    variant
  };
  return /*#__PURE__*/(0, jsxRuntime.jsx)(_FormControlContext.default.Provider, {
    value: childContext,
    children: /*#__PURE__*/(0, jsxRuntime.jsx)(FormControlRoot, (0, _extends2.default)({
      as: component,
      ownerState: ownerState,
      className: (0, _clsx.default)(classes.root, className),
      ref: ref
    }, other, {
      children: children
    }))
  });
});
var _default = FormControl;
exports.default = _default;
});

var FormControl = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useFormControl: true,
  formControlClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _FormControl.default;
  }
});
Object.defineProperty(exports, "formControlClasses", {
  enumerable: true,
  get: function () {
    return _formControlClasses.default;
  }
});
Object.defineProperty(exports, "useFormControl", {
  enumerable: true,
  get: function () {
    return _useFormControl.default;
  }
});

var _FormControl = interopRequireDefault(FormControl_1);

var _useFormControl = interopRequireDefault(useFormControl_1);

var _formControlClasses = _interopRequireWildcard(formControlClasses_1);

Object.keys(_formControlClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formControlClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formControlClasses[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(FormControl);

export { FormControl as F, __pika_web_default_export_for_treeshaking__ as _ };
