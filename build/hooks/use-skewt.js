import React from "../_snowpack/pkg/react.js";
import useCTX from "./use-ctx.js";
export default function useSkewt() {
  const [_state, _setState] = React.useState({});
  const ctx = useCTX();
  const getPointerState = React.useCallback(() => {
    return {ctx};
  }, [ctx]);
  return {getPointerState, ...ctx};
}
