import React from 'react'
import useCTX from 'hooks/use-ctx'
import useD3 from 'hooks/use-d3'
export default function SVGSkewt() {
    const ref = useD3((element) => { }, [])
    const { dims, margin } = useCTX()
    //     margin:{"top":30,"right":40,"bottom":20,"left":35}
    // dims:{"height":1669,"width":1719}
    return (
        <svg transform={`translate(${margin.left}, ${margin.top})`} width={dims.width} height={dims.height}>
            {/* <g transform={`translate(${left}, ${top})`}> */}
            <Clipper width={dims.width} height={dims.height} />
            {/* <Diagram />
            <Sounding /> */}
            {/* </g> */}
        </svg>
    );
}
const Clipper = ({ ...props }) => (
    <clipPath id='clipper'>
        <rect x='30px' y='10px' {...props} />
    </clipPath>
);