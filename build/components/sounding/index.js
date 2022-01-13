import React from "../../_snowpack/pkg/react.js";
import useCTX from "../../hooks/use-ctx.js";
import Temperature from "./temperature.js";
import Dewpoint from "./dewpoint.js";
export default function Sounding() {
  const ctx = useCTX();
  const datums = React.useMemo(() => [ctx.datums.filter((d) => d.temp > -1e3 && d.dwpt > -1e3)], [ctx.datums]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Temperature, {
    datums
  }), /* @__PURE__ */ React.createElement(Dewpoint, {
    datums
  }));
}
