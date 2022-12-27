import React from 'react'

const GElement = React.forwardRef<SVGGElement, SkewT.GElementProps>((props, ref) => {
    if (props.hidden) return null
    return <g ref={ref} {...props} />
})


export {
    GElement
}