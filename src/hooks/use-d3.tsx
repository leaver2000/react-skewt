import React from 'react'
import { select } from 'd3'
export default function useD3(render: USED3.RENDER, deps: USED3.DEPS = []) {
    const ref: React.MutableRefObject<any> = React.useRef();

    React.useEffect(() => {
        if (!!ref && !!ref.current) {
            const element = select(ref.current)
            render(element)

        }
    }, deps)
    // (render(select(ref.current)): void 0)}, [])




    return ref
}