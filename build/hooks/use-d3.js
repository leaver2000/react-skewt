import React from "../_snowpack/pkg/react.js";
import {select} from "../_snowpack/pkg/d3-selection.js";
export default function useD3(render, deps = []) {
  const ref = React.useRef(null);
  React.useEffect(() => !!ref && !!ref.current ? render(select(ref.current)) : void 0, deps);
  return ref;
}
