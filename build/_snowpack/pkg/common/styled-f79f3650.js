import { c as createCommonjsModule } from './_commonjsHelpers-913f9c4a.js';
import { i as interopRequireDefault } from './green-31ac1fca.js';
import { B as defaultTheme_1, a as esm } from './useThemeProps-5e0e9cb9.js';

var styled_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slotShouldForwardProp = exports.rootShouldForwardProp = exports.default = void 0;



var _defaultTheme = interopRequireDefault(defaultTheme_1);

const rootShouldForwardProp = prop => (0, esm.shouldForwardProp)(prop) && prop !== 'classes';

exports.rootShouldForwardProp = rootShouldForwardProp;
const slotShouldForwardProp = esm.shouldForwardProp;
exports.slotShouldForwardProp = slotShouldForwardProp;
const styled = (0, esm.createStyled)({
  defaultTheme: _defaultTheme.default,
  rootShouldForwardProp
});
var _default = styled;
exports.default = _default;
});

export { styled_1 as s };
