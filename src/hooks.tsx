import React from 'react';
import * as d3 from 'd3';
import { SkewTContext } from './context';

enum DataAction {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}
type DataActions = typeof DataAction[keyof typeof DataAction] & DataAction;
const DATA_AXIS = {
  TIME : 'timeIndex',
  LEVEL : 'levelIndex',
} as const;

type DataAxis = typeof DATA_AXIS[keyof typeof DATA_AXIS];
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
function useD3<T extends Element>(render: (element: d3.Selection<T, any, any, any>) => void, deps: React.DependencyList = []) {
  const ref = React.useRef<T>(null);
  React.useEffect(() => {
    if (ref.current) render(d3.select(ref.current));
  }, deps);
  return ref;
}
/**
 * NOTE: don't use use useEffect inside this hook. a useEffect will be called every time a component calls this hook.
 * this hook primarily returns the context state and some helper function to manage the state.
 */
function useSkewT() {
  const ctx = React.useContext(SkewTContext);
  if (!ctx) {
    throw new Error('useSkewT must be used within a SkewTProvider');
  }
  const setPartialState = React.useCallback(
    (partialState: Partial<SkewT.State>) => {
      ctx.setState((state) => ({ ...state, ...partialState }));
    },
    [ctx.setState]
  );
  const setPartialDataState = React.useCallback(
    (dataState: Partial<SkewT.DataState>) => {
      ctx.setState((state) => ({ ...state, dataState: { ...state.dataState, ...dataState } }));
    },
    [ctx.setState]
  );
  const datums = ctx.dataset[ctx.dataState.timeIndex];

  /** callback function to increment or decrement the Z and T axis */
  const dispatchDataState = React.useCallback(
    (action: DataActions, axis: DataAxis) => {
      ctx.setState((state) => {
        let { dataset, dataState } = state;
        let i = state.dataState[axis];
        if (action === DataAction.INCREMENT) {
          i = Math.min(i + 1, dataset.length - 1);
        } else if (action === DataAction.DECREMENT) {
          i = Math.max(i - 1, 0);
        }
        console.log(state)
        return {...state, dataState: {...dataState, [axis]: i} };
      });
    },
    [setPartialState]
  );

  const mouseEventDispatcher = React.useCallback(
    (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      const { clientX, clientY } = event;
      const x = ctx.scales.xLinear.invert(clientX);

      const y = ctx.scales.yLogarithmic.invert(clientY);
      const { height } = ctx.dimensions;
      console.log('y', y);
      // const { y: y2 } = ctx.scales.y.invert(height - clientY);
      // const { datums } = ctx;
      // const datum = datums.find((d) => d.x === x && d.y === y2);
      // if (datum) {
      //     const { x: x2, y: y3 } = ctx.scales.x(datum.x);
      //     const { height: height2 } = ctx.dimensions;
      //     const { y: y4 } = ctx.scales.y(height2 - datum.y);
      //     const { x: x3, y: y5 } = ctx.scales.x.invert(x2);
      //     const { height: height3 } = ctx.dimensions;
      //     const { y: y6 } = ctx.scales.y.invert(height3 - y4);
      //     const { datums: datums2 } = ctx;
      //     const datum2 = datums2.find((d) => d.x === x3 && d.y === y6);
      // }
    },
    [ctx]
  );
    // console.log(datums)

  return { ...ctx, ...datums, setPartialState, mouseEventDispatcher, setPartialDataState,  };
}

export { useD3, useSkewT };
