

import Provider from "./context"

import Diagram, {
  IsoTherms,
  IsoBars,
  IsoHumes,
  EnvironmentalLapseRate,
  DryAdibats,
  MoistAdiabats,
  Temperature,
  DewPoint,
} from "./components/diagram"
import Control from "./components/control"
import Tarp from "./tarp"

/**
 * The diagram is a svg element wrapped in a div that performs some resizing to scale the svg
 */
function Profile() {

  return (
    <Diagram>
      {/* background components */}
      <EnvironmentalLapseRate stroke='purple' fill='none' strokeWidth={2.0} />
      <IsoBars stroke="gold" fill='none' />
      <IsoTherms stroke='red' strokeOpacity={0.2} fill='none' />
      <IsoHumes fill='none' />
      {/*  */}
      <DryAdibats stroke="red" strokeOpacity={0.2} fill='none' />
      <MoistAdiabats stroke="green" strokeOpacity={0.2} fill='none' />
      {/* sounding */}
      <Temperature stroke="red" strokeOpacity={1} strokeWidth={2} fill='none' />
      <DewPoint stroke="blue" strokeOpacity={1} strokeWidth={2} fill='none' />
    </Diagram>
  )
}

export default function(props: {tarp:TARP.Dataset}) {
  const tarp = new Tarp(props.tarp.metadata, props.tarp.data)

  return (
    <Provider metadata={tarp.metadata} dataset={tarp.toSkewT()}>
      <div style={{ border: "solid red", height: "100%" }}>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", gridTemplateColumns: "1fr", height: "100%" }}>
          <div style={{ border: "solid blue", gridRow: "1", gridColumn: "1 / span 2" }}>
            <Control />
          </div>
          <div style={{ border: "solid green", gridRow: "2", gridColumn: "1 / span 2" }}>
            <Profile />
          </div>
          <div style={{ border: "solid green", gridRow: "2", gridColumn: "2" }}>
            <Profile />
          </div>
        </div>
      </div>
    </Provider>
  )
}
