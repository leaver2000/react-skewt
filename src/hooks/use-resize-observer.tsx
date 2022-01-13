import React from 'react';
import { select } from 'd3';
/**
 * ```
 * function App(){
 *   const ref = useResizeObserver<HTMLDivElement>(([entry]) => {
 *      const { borderBoxSize, contentBoxSize, contentRect, target } = entry
 * ...
 *  })
 *   return <div ref={ref} />
 * }
 * ```
 */
export default function useResizeObserver<T extends Element>(observerCallback: (element: T, entry: ResizeObserverEntry[]) => void, options?: ResizeObserverOptions) {
	const ref = React.useRef<T>(null);
	React.useEffect(() => {
		if (!!ref && !!ref.current) {
			const element = ref.current;
			new ResizeObserver((entry) => observerCallback(element, entry)).observe(element, options);
		}
	}, []);

	return ref;
}
// type ObserverElemement<T> = HTMLElement | SVGElement;
// export type BaseType = Element;
// type FatElement extends Element<T>export type BaseType = Element | Document | Window | null;
// type SkewtObserverCallback<T> =(element:T entry:ResizeObserverEntry[])=>void
