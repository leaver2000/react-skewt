import React from "./_snowpack/pkg/react.js";
import {createTheme, ThemeProvider} from "./_snowpack/pkg/@mui/material/styles.js";
import useCTX, {SkewtCTX} from "./hooks/use-ctx.js";
import DEFAULT_THEME from "./lib/SVGElements.js";
import Container from "./components/container.js";
export default function Skewt({datums, defaultTheme = DEFAULT_THEME, darkMode, derivedParameters}) {
  const ctx = useCTX();
  const theme = React.useMemo(() => createTheme({
    ...defaultTheme,
    palette: {mode: darkMode ? "dark" : "light"}
  }), [darkMode]);
  React.useEffect(() => ctx.setState({datums}), [datums]);
  React.useEffect(() => ctx.setState({darkMode: !!darkMode}), [darkMode]);
  return /* @__PURE__ */ React.createElement(SkewtCTX.Provider, {
    value: () => ctx
  }, /* @__PURE__ */ React.createElement(ThemeProvider, {
    theme
  }, /* @__PURE__ */ React.createElement(Container, null)));
}
export {default as useSkewt} from "./hooks/use-skewt.js";
