import React from "../_snowpack/pkg/react.js";
import {styled} from "../_snowpack/pkg/@mui/material/styles.js";
import Box from "../_snowpack/pkg/@mui/material/Box.js";
import Paper from "../_snowpack/pkg/@mui/material/Paper.js";
import Grid from "../_snowpack/pkg/@mui/material/Grid.js";
import useCTX from "../hooks/use-ctx.js";
import useResizeObserver from "../hooks/use-resize-observer.js";
import Diagram from "./diagram/index.js";
import Sounding from "./sounding/index.js";
import WindStaff from "./wind-staff/index.js";
const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));
export default function Container() {
  const {setState, isSized} = useCTX();
  React.useEffect(() => window.addEventListener("resize", () => setState({isSized: false})), []);
  const ref = useResizeObserver((element) => {
    const height = element.offsetWidth;
    const width = element.offsetHeight;
    console.log({width, height});
  });
  return /* @__PURE__ */ React.createElement(Box, {
    ref,
    sx: {flexGrow: 1}
  }, /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    alignItems: "stretch"
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 10
  }, /* @__PURE__ */ React.createElement(Item, null, "xs=10")), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 2
  }, /* @__PURE__ */ React.createElement(Item, null, "xs=2")), /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    item: true,
    direction: "row",
    alignItems: "stretch",
    sx: {border: "2px solid red", borderRadius: "5px"}
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 10,
    sx: {border: " 2px solid black", borderRadius: "5px"}
  }, /* @__PURE__ */ React.createElement(Diagram, null, /* @__PURE__ */ React.createElement(Sounding, null))), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 2,
    sx: {border: " 2px solid black", borderRadius: "5px"}
  }, isSized ? /* @__PURE__ */ React.createElement(WindStaff, null) : null))));
}
