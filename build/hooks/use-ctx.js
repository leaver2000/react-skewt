import React from "../_snowpack/pkg/react.js";
let scales;
let axes;
let datums;
let dims;
let darkMode;
export const SkewtCTX = React.createContext(() => {
  const [state, dispatch] = React.useState(() => ({datums, scales, axes, isSized: false, dims, darkMode}));
  const setState = React.useCallback((newState) => {
    dispatch(({...old}) => ({...old, ...newState}));
  }, []);
  return {...state, setState};
});
const useCTX = () => React.useContext(SkewtCTX)();
export default useCTX;
