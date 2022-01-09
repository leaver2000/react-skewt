import React from 'react'
// import JSONTree from 'react-json-tree';
// import { select } from 'd3'

import useD3 from 'hooks/use-d3'
import useCTX, { SkewtCTX } from 'hooks/use-ctx'
import Container from 'components/container'
import SVGSkewt from 'components/SVGSkewt'
import { ThemeProvider } from '@mui/material/styles';
// const useCTX = () => React.useContext(SkewtCTX)()

// import type { THEME } from 'lib/theme'
import type { Theme } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles';
import { green, purple, grey, blue, pink, orange, common, blueGrey, cyan, indigo, red } from '@mui/material/colors';
// 
import defaultTheme from 'lib/theme'

export default function Skewt({ datums, theme = defaultTheme }: { datums: SKEWT.DATUMS, theme?: Theme }) {
    const ctx = useCTX()

    React.useEffect(() => ctx.setState({ datums }), [datums])

    return (
        <SkewtCTX.Provider value={() => ctx}>
            <ThemeProvider theme={theme}>
                <Container >
                    {Object.entries(ctx).map(([key, value]) => {
                        return <div>{`${key}:${JSON.stringify(value)}`}</div>
                    })}
                    <SVGSkewt />
                </Container>
            </ThemeProvider>
        </SkewtCTX.Provider>
    )
}
type SVGGLine = {
    light: string
    dark: string
}

declare module '@mui/material/styles' {
    type Theme = {
        temperature: SVGGLine
        dewpoint: SVGGLine
        isobars: SVGGLine
        isotherms: SVGGLine
        envLapseRate: SVGGLine
        isohumes: SVGGLine
        moistAdiabats: SVGGLine
        dryAdiabats: SVGGLine
    }
    interface ThemeOptions {
        temperature: SVGGLine
        dewpoint: SVGGLine
        isobars: SVGGLine
        isotherms: SVGGLine
        envLapseRate: SVGGLine
        isohumes: SVGGLine
        moistAdiabats: SVGGLine
        dryAdiabats: SVGGLine
    }
}
