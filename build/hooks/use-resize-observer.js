import React from "../_snowpack/pkg/react.js";
export default function useResizeObserver(observerCallback, options) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!!ref && !!ref.current) {
      const element = ref.current;
      new ResizeObserver((entry) => observerCallback(element, entry)).observe(element, options);
    }
  }, []);
  return ref;
}
