import React from 'react';
let scales: Skewt.Scales;
let axes: Skewt.Axes;
let datums: Skewt.Datum[];
let dims: Skewt.Dims;
let darkMode: boolean;

export const SkewtCTX = React.createContext(() => {
	const [state, dispatch] = React.useState(() => ({ datums, scales, axes, isSized: false, dims, darkMode }));

	const setState = React.useCallback((newState: Skewt.Dispatch) => {
		dispatch(({ ...old }) => ({ ...old, ...newState }));
	}, []);

	return { ...state, setState };
});
const useCTX = () => React.useContext(SkewtCTX)();
export default useCTX;
