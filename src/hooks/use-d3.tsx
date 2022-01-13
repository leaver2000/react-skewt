import React from 'react';
import { select } from 'd3-selection';

/**
 *
 * @param render
 * @param deps
 * @returns
 */
export default function useD3<GElement extends Element>(render: (element: d3.Selection<GElement, any, any, any>) => void, deps: React.DependencyList = []) {
	const ref = React.useRef<GElement>(null);
	React.useEffect(() => (!!ref && !!ref.current ? render(select(ref.current)) : void 0), deps);
	return ref;
}
