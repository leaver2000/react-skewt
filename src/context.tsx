import React from "react"


const DEFAULT_STATE: SkewT.State = {
    datums: [],
    scales: {
        xLinear: 0,
        yLogarithmic: 0,
    },
    axes: {
        x0: 0,
        x1: 0,
        y0: 0,
        y1: 0,
    },
    dimensions: {
        width: 0,
        height: 0,
    },
    dataset: [],
    // data: [],
    dataState: {
        timeIndex: 0,
        pressureLevel: 1000, // mBar
    }
}

type ProviderProps = React.PropsWithChildren<{
    metadata?: TARP.Metadata
    dataset: SkewT.Dataset
}>

export const SkewTContext = React.createContext<SkewT.Context | null>(null);

/** */
export default function ({ dataset, children, metadata=undefined }: ProviderProps): JSX.Element {
    // const datums = dataset[0].data
    const [state, setState] = React.useState<SkewT.State>({ ...DEFAULT_STATE, dataset, metadata })

    return (
        <SkewTContext.Provider value={{ ...state, setState }}>
            {children}
        </SkewTContext.Provider>
    )
}


