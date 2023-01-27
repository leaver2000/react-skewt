import React from "react";
import * as d3 from "d3";

export function useResizeObserver<T extends HTMLElement>(
  callback: (entry: ResizeObserverEntry) => void,
  deps: React.DependencyList = []
) {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => entries.forEach(callback));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, ...deps]);

  return ref;
}

/**
 * a hook that returns a ref to an element and a function that renders a d3 selection
 *
 * usage:
 * ```
 * const ref = useD3((g) => {
 *    g.selectAll('g').data(data).enter().append('path')
 * })
 * return <g ref={ref} />
 * ```
 */
export function useD3<GElement extends Element, D3Datum = unknown>(
  callback: (element: d3.Selection<GElement, D3Datum, any, any>) => void,
  deps: React.DependencyList,
  options: { clearOnUpdate?: boolean } = {}
) {
  const ref = React.useRef<GElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const el = d3.select(ref.current) as d3.Selection<
        GElement,
        D3Datum,
        any,
        any
      >;
      if (options.clearOnUpdate) el.selectAll("*").remove();
      // el.selectAll("*").remove();
      callback(el);
    }
    return () => {};
  }, [ref, ref.current, options, ...deps]);

  return ref;
}

export function usePartialState<T = object>(initialState: T) {
  return React.useReducer(
    (state: T, partial: Partial<T>) => ({ ...state, ...partial } as T),
    initialState
  );
}
