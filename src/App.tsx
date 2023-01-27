/**
 * The Model Integrated TAF Environment (MITE)
 * inspired by the Integrated Development Environment (IDE)
 * is a web application that provides a interactive environment
 * for the creation and editing of TAFs.
 *
 * Consider the following key words... [Point Based, Over Time]
 *
 * A TAF is a Point Based forecast for a 5 nautical mile radius, valid for 30 hours. -> [Point Based, Over Time]
 *
 * TARP is Forecast Model is Point Based valid for 144hrs. -> [Point Based, Over Time]
 * Visualizing TARP:
 * - Meteogram -> [Point Based, Over Time]
 * - Skew-T -> [Point Based]
 */
import React from "react";

import {
  SkewTProvider,
  SkewTDiagram,
  IsoTherms,
  IsoBars,
  EnvironmentalLapseRate,
  DryAdibats,
  MoistAdiabats,
  Temperature,
  DewPoint,
} from "./components/skew-t";

// time control components
// import { tarpToSkewTDataset } from "./components/skew-t/util";
import TemporalControl from "./components/time-control";
import { unpackDatasetAtLevel } from "./components/time-control/util";
import type { ControlData } from "./components/time-control/util";
import { SURFACE_PARAMETERS, type SurfaceParameterValue } from "./tarp";
import { getSecondaryParameters, tarpToSkewTDataset } from "./util";
import { usePartialState } from "./hooks";
// sharing data state between components
const DEFAULT_DATA_STATE = { timeIndex: 0, pressureLevel: 1000 as Millibar };
type DataState = typeof DEFAULT_DATA_STATE;
type DataStatePartialDispatch = React.Dispatch<Partial<DataState>>;

/**
 * The Profile wraps the diagram and internal components.
 * into a single component that can be used in the app.
 * @returns {JSX.Element} the SkewT profile component
 */
function SkewTProfile(props: {
  onChange: DataStatePartialDispatch;
}): JSX.Element {
  return (
    <SkewTDiagram //
      onClick={props.onChange}
      onMouseMove={({ pressureLevel }, e) =>
        e.ctrlKey ? props.onChange({ pressureLevel }) : void 0
      }
      fill="white"
    >
      {/* background components */}
      <EnvironmentalLapseRate
        stroke="purple"
        fill="none"
        strokeOpacity={0.5}
        strokeWidth={1}
      />
      <IsoBars stroke="gold" fill="none" strokeOpacity={0.5} />
      <IsoTherms stroke="red" strokeOpacity={0.25} fill="none" />
      {/* isohumes */}
      <DryAdibats
        stroke="orange"
        strokeDasharray="2 3"
        strokeOpacity={0.5}
        fill="none"
      />
      <MoistAdiabats
        stroke="green"
        strokeDasharray="2 3"
        strokeWidth={0.75}
        strokeOpacity={0.5}
        fill="none"
      />
      {/* sounding */}
      <Temperature stroke="red" strokeOpacity={1} strokeWidth={2} fill="none" />
      <DewPoint
        stroke="steelblue"
        strokeOpacity={1}
        strokeWidth={2}
        fill="none"
      />
    </SkewTDiagram>
  );
}

function Container(props: React.PropsWithChildren<{}>) {
  return (
    <div>{props.children}</div>
    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid container spacing={0.5}>
    //     {props.children}
    //   </Grid>
    // </Box>
  );
}

const DEFAULT_SECONDARY_PARAMETERS = [
  SURFACE_PARAMETERS.TEMPERATURE,
  SURFACE_PARAMETERS.WET_BULB_TEMPERATURE,
] as Pair<SurfaceParameterValue>;

interface SelectionProps {
  value: SurfaceParameterValue;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

function Select({ value, onChange }: SelectionProps) {
  return (
    <div style={{ marginLeft: 2, marginRight: 2 }}>
      <select value={value} onChange={onChange}>
        {Object.entries(SURFACE_PARAMETERS).map(([key, value]) => (
          <option key={key} value={value}>
            {key.toLowerCase().replace(/_/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
}

enum FieldPosition {
  ONE,
  TWO,
}

interface NavbarProps {
  fieldOne: SurfaceParameterValue;
  fieldTwo: SurfaceParameterValue;
  setSecondaryParameters: React.Dispatch<
    React.SetStateAction<Pair<SurfaceParameterValue>>
  >;
  //
  validTime: string;
  stationId: string;
  pressureLevel: number;
}

function TemporalNavbar(props: NavbarProps): JSX.Element {
  const { pressureLevel, stationId, validTime, fieldOne, fieldTwo } = props;
  // flip the parameters - this function is needed because the same parameter can't be selected twice
  const flipParams = () => props.setSecondaryParameters(([p1, p2]) => [p2, p1]);
  // event handler factory
  const parameterDispatchFactory =
    (position: FieldPosition) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      // the new parameter value
      const value = e.target.value as SurfaceParameterValue;
      // don't allow the same parameter to be selected twice
      if (value === fieldOne || value === fieldTwo) return flipParams();
      props.setSecondaryParameters((params) => {
        const newParams = [...params] as Pair<SurfaceParameterValue>;
        newParams[position] = value;
        console.log(params);
        return newParams;
      });
    };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* drop down menu for SURFACE PARAMETERS */}
      <div style={{ display: "flex", padding: 2 }}>
        <div
          style={{
            display: "flex",
            padding: 2,
            fontFamily: "monospace",
            fontSize: 14,
          }}
        >
          <b>MITE</b>
        </div>
        <Select
          value={fieldOne}
          onChange={parameterDispatchFactory(FieldPosition.ONE)}
        />
        <Select
          value={fieldTwo}
          onChange={parameterDispatchFactory(FieldPosition.TWO)}
        />
        <button onClick={flipParams}>flip</button>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              lineHeight: "5px",
              fontFamily: "monospace",
              fontSize: 10,
              padding: 0,
            }}
          >{`Station ID: ${stationId} | Valid Time ${validTime} |  Pressure Level: ${pressureLevel}mb `}</p>
        </div>
      </div>
    </div>
  );
}

interface ControlBarProps extends ControlData {
  tarp: TARP.Dataset;
  validTime: string;
  validTimes: string[];
  pressureLevel: number;
  setDataState: DataStatePartialDispatch;
}

function MeteogramControl({
  tarp,
  setDataState,
  ...props
}: ControlBarProps): JSX.Element {
  // unpack the props
  // some state to manage the secondary parameters
  const [[parameterOne, parameterTwo], setSecondaryParameters] = React.useState<
    Pair<SurfaceParameterValue>
  >(DEFAULT_SECONDARY_PARAMETERS);
  // when either of the secondary parameters change, we need to update the secondary data, so we memoize the secondary data
  const secondaryData = React.useMemo(
    () => getSecondaryParameters(tarp.data, parameterOne, parameterTwo),
    [tarp, parameterOne, parameterTwo]
  );

  return (
    <>
      <TemporalNavbar
        // the secondary parameters can be selected from the navbar
        fieldOne={parameterOne}
        fieldTwo={parameterTwo}
        setSecondaryParameters={setSecondaryParameters}
        // display some of the stateful data in the navbar on the right side of the display
        stationId={tarp.metadata!.station.id}
        validTime={props.validTime}
        pressureLevel={props.pressureLevel}
      />
      <TemporalControl // a interactive control to change the time index on the skew-t diagram
        // validTimes={validTimes}
        // the onClick and onMouseMove handlers are used to update the state of the skew-t diagram
        // from actions taken in the temporal control
        onClick={setDataState}
        onMouseMove={(state, e) => (e.ctrlKey ? setDataState(state) : void 0)}
        //
        secondaryData={secondaryData}
        {...props}
        invertY
      />
    </>
  );
}

/**
 * a single page application that merges the state of 3 independent components
 * - a skew-t diagram
 * - a temporal control system
 * - a text area connected to a NLP Machine Learning model
 */
export default function MITE({ tarp }: { tarp: TARP.Dataset }) {
  // use a reducer to manage the state of the skew-t diagram and the control bar
  // the SkewT uses the timeIndex and sets the pressureLevel
  // the TemporalControl uses the pressureLevel and sets the timeIndex
  const [dataState, setPartialDataState] = usePartialState(DEFAULT_DATA_STATE);

  // re format the tarp data into a dataset that is compatible with the skew-t diagram
  const dataset = tarpToSkewTDataset(tarp.data);
  // map the valid times to the dataset
  const validTimes = dataset.map((d) => d.validTime);
  //
  const controlData = React.useMemo(
    () => unpackDatasetAtLevel(dataset, dataState.pressureLevel),
    [dataset, dataState.pressureLevel]
  );
  return (
    <Container>
      <div>
        <div>
          <MeteogramControl
            // the control data is the primary data displayed into control bar
            validTimes={validTimes}
            // this setStateAction is used to update the temporal state of the skew-t diagram
            setDataState={setPartialDataState}
            tarp={tarp} // todo: remove the direct tarp dependency and re-map the secondary data
            // validTime and the current pressure level are displayed in the navbar
            validTime={validTimes[dataState.timeIndex]}
            pressureLevel={dataState.pressureLevel}
            {...controlData}
          />
        </div>
      </div>
      <SkewTProvider //
        dataset={dataset}
        metadata={tarp.metadata}
        timeIndex={dataState.timeIndex}
      >
        <div>
          <div>
            <SkewTProfile onChange={setPartialDataState} />
          </div>
        </div>
        {/* the text area */}
        <div>
          {/* todo: remove the dependency of the skew-t provider from this text area */}
        </div>
      </SkewTProvider>
    </Container>
  );
}
