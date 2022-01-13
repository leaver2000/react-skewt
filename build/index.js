import React from "./_snowpack/pkg/react.js";
import ReactDOM from "./_snowpack/pkg/react-dom.js";
import Box from "./_snowpack/pkg/@mui/material/Box.js";
import Grid from "./_snowpack/pkg/@mui/material/Grid.js";
import Radio from "./_snowpack/pkg/@mui/material/Radio.js";
import RadioGroup from "./_snowpack/pkg/@mui/material/RadioGroup.js";
import FormControlLabel from "./_snowpack/pkg/@mui/material/FormControlLabel.js";
import FormControl from "./_snowpack/pkg/@mui/material/FormControl.js";
import FormLabel from "./_snowpack/pkg/@mui/material/FormLabel.js";
import CssBaseline from "./_snowpack/pkg/@mui/material/CssBaseline.js";
import Skewt, {useSkewt} from "./skewt.js";
import TemperatureController from "./components/temperature-controller/index.js";
import {datums} from "./data/index.js";
import "./styles/styles.css.proxy.js";
function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const skew = useSkewt();
  function ToggleDarkMode() {
    return /* @__PURE__ */ React.createElement(FormControl, {
      component: "fieldset"
    }, /* @__PURE__ */ React.createElement(FormLabel, {
      component: "legend"
    }, "Mode"), /* @__PURE__ */ React.createElement(RadioGroup, {
      row: true,
      "aria-label": "gender",
      name: "row-radio-buttons-group",
      value: darkMode ? "dark" : "light",
      onChange: () => setDarkMode((mode) => mode ? false : true)
    }, /* @__PURE__ */ React.createElement(FormControlLabel, {
      value: "light",
      control: /* @__PURE__ */ React.createElement(Radio, null),
      label: "light"
    }), /* @__PURE__ */ React.createElement(FormControlLabel, {
      value: "dark",
      control: /* @__PURE__ */ React.createElement(Radio, null),
      label: "dark"
    })));
  }
  const onMouseEvent = () => {
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CssBaseline, null), /* @__PURE__ */ React.createElement(Box, {
    sx: {bgcolor: "#cfe8fc", height: "100vh"}
  }, /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    direction: "row",
    justifyContent: "center",
    alignItems: "stretch",
    sx: {height: "100vh", width: "100vw", overflow: "auto"}
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(TemperatureController, {
    onMouseEvent
  })), /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(ToggleDarkMode, null)), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 11
  }, /* @__PURE__ */ React.createElement(Skewt, {
    datums,
    darkMode
  })))));
}
ReactDOM.render(/* @__PURE__ */ React.createElement(App, null), document.getElementById("root"));
export {default} from "./skewt.js";
export {default as useSkewt} from "./hooks/use-skewt.js";
export {default as TemperatureController} from "./components/temperature-controller/index.js";
