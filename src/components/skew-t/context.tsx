import React from "react";
import { usePartialState } from "../../hooks";
export const SkewTContext = React.createContext<SkewT.Context | null>(null);

type ProviderProps = React.PropsWithChildren<{
  metadata?: TARP.Metadata;
  dataset: SkewT.Dataset;
  timeIndex: number;
}>;

export default function SkewTProvider({
  dataset,
  metadata,
  timeIndex = 0,
  children,
}: ProviderProps): JSX.Element {
  const { datums, validTime } = dataset[timeIndex];
  const pressureLevels = datums.map(({ pressure }) => pressure);
  const validTimes = dataset.map((d) => new Date(d.validTime));

  const [state, setPartialState] = usePartialState({
    datums,
    dataset,
    metadata,
  });
  React.useEffect(() => setPartialState({ datums }), [validTime]);

  return (
    <SkewTContext.Provider
      value={{
        ...state,
        pressureLevels,
        validTimes,
        setPartialState,
      }}
    >
      {children}
    </SkewTContext.Provider>
  );
}
