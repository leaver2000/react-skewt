import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-913f9c4a.js';
import { i as interopRequireDefault } from '../../common/green-31ac1fca.js';
import { o as objectWithoutPropertiesLoose, _ as _extends_1, p as propTypes, r as require$$4, u as useThemeProps_1, j as jsxRuntime } from '../../common/useThemeProps-5e0e9cb9.js';
import { r as react } from '../../common/index-c9e50cb4.js';
import { b as base } from '../../common/index-c891b4c7.js';
import { s as styled_1 } from '../../common/styled-f79f3650.js';
import { a as useForkRef, u as useControlled } from '../../common/useForkRef-e56f5a68.js';
import { R as RadioGroupContext_1, u as useRadioGroup_1 } from '../../common/useRadioGroup-f822b44d.js';
import { u as useId } from '../../common/useId-d205b07e.js';
import '../../common/index-c86b1a01.js';

var formGroupClasses_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getFormGroupUtilityClass = getFormGroupUtilityClass;



function getFormGroupUtilityClass(slot) {
  return (0, base.generateUtilityClass)('MuiFormGroup', slot);
}

const formGroupClasses = (0, base.generateUtilityClasses)('MuiFormGroup', ['root', 'row']);
var _default = formGroupClasses;
exports.default = _default;
});

var FormGroup_1 = createCommonjsModule(function (module, exports) {



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





const _excluded = ["className", "row"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes,
    row
  } = ownerState;
  const slots = {
    root: ['root', row && 'row']
  };
  return (0, base.unstable_composeClasses)(slots, formGroupClasses_1.getFormGroupUtilityClass, classes);
};

const FormGroupRoot = (0, _styled.default)('div', {
  name: 'MuiFormGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.row && styles.row];
  }
})(({
  ownerState
}) => (0, _extends2.default)({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap'
}, ownerState.row && {
  flexDirection: 'row'
}));
/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */

const FormGroup = /*#__PURE__*/React.forwardRef(function FormGroup(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiFormGroup'
  });
  const {
    className,
    row = false
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    row
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, jsxRuntime.jsx)(FormGroupRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other));
});
var _default = FormGroup;
exports.default = _default;
});

var FormGroup = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  formGroupClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _FormGroup.default;
  }
});
Object.defineProperty(exports, "formGroupClasses", {
  enumerable: true,
  get: function () {
    return _formGroupClasses.default;
  }
});

var _FormGroup = interopRequireDefault(FormGroup_1);

var _formGroupClasses = _interopRequireWildcard(formGroupClasses_1);

Object.keys(_formGroupClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formGroupClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formGroupClasses[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

var RadioGroup_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _FormGroup = interopRequireDefault(FormGroup);

var _useForkRef = interopRequireDefault(useForkRef);

var _useControlled = interopRequireDefault(useControlled);

var _RadioGroupContext = interopRequireDefault(RadioGroupContext_1);

var _useId = interopRequireDefault(useId);



const _excluded = ["actions", "children", "defaultValue", "name", "onChange", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const RadioGroup = /*#__PURE__*/React.forwardRef(function RadioGroup(props, ref) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions,
    children,
    defaultValue,
    name: nameProp,
    onChange,
    value: valueProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rootRef = React.useRef(null);
  const [value, setValueState] = (0, _useControlled.default)({
    controlled: valueProp,
    default: defaultValue,
    name: 'RadioGroup'
  });
  React.useImperativeHandle(actions, () => ({
    focus: () => {
      let input = rootRef.current.querySelector('input:not(:disabled):checked');

      if (!input) {
        input = rootRef.current.querySelector('input:not(:disabled)');
      }

      if (input) {
        input.focus();
      }
    }
  }), []);
  const handleRef = (0, _useForkRef.default)(ref, rootRef);

  const handleChange = event => {
    setValueState(event.target.value);

    if (onChange) {
      onChange(event, event.target.value);
    }
  };

  const name = (0, _useId.default)(nameProp);
  return /*#__PURE__*/(0, jsxRuntime.jsx)(_RadioGroupContext.default.Provider, {
    value: {
      name,
      onChange: handleChange,
      value
    },
    children: /*#__PURE__*/(0, jsxRuntime.jsx)(_FormGroup.default, (0, _extends2.default)({
      role: "radiogroup",
      ref: handleRef
    }, other, {
      children: children
    }))
  });
});
var _default = RadioGroup;
exports.default = _default;
});

var RadioGroup = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _RadioGroup.default;
  }
});
Object.defineProperty(exports, "useRadioGroup", {
  enumerable: true,
  get: function () {
    return _useRadioGroup.default;
  }
});

var _RadioGroup = interopRequireDefault(RadioGroup_1);

var _useRadioGroup = interopRequireDefault(useRadioGroup_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(RadioGroup);

export default __pika_web_default_export_for_treeshaking__;
