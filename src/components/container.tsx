import React from 'react'
import JSONTree from 'react-json-tree';
// import { select } from 'd3'
import Box from '@mui/material/Box';
import { scaleLinear, range as arrange, select } from 'd3';
import { makeScales, makeLines, makeAxes } from 'lib/make';
import useD3 from 'hooks/use-d3'
import useCTX, { SkewtCTX } from 'hooks/use-ctx'

export default function Container({ ...props }) {
    const ctx = useCTX()
    const [shouldResize, setShouldResize] = React.useState(true);
    React.useEffect(() => window.addEventListener('resize', () => setShouldResize(true)), []);


    const ref = useD3((element) => {
        if (shouldResize) {


            resize(parseInt(element.style('width'), 10) - 10)

            ctx.setState({ initialized: true })
        }
    }, [shouldResize])

    const resize = React.useCallback(
        (width: number) => {
            setShouldResize(false);
            const { margin } = ctx

            let height = width; //to fix
            width = width - margin.left - margin.right;
            height = width - margin.top - margin.bottom;

            const scales = makeScales(width, height, ctx.T, ctx.P);
            const axes = makeAxes(scales, ctx.P);
            const lineGen = makeLines(scales, ctx.P);
            ctx.setState({ initialized: true, dims: { height, width }, axes, lineGen, scales })


        }, [ctx])


    return <Box ref={ref} sx={{ backgroundColor: 'primary.dark', borderRadius: '5px' }} {...(ctx.initialized ? props : [null])} />;

}
