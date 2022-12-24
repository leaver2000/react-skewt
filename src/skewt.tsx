import React from 'react';
//	mui
// import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
// local imports
import useCTX, { SkewtCTX } from 'hooks/use-ctx';
import DEFAULT_THEME from 'lib/SVGElements';
import Container from 'components/container';

interface Props {
	data: Skewt.Datum[] | Skewt.Datum[][];
	defaultTheme?: Theme;
	darkMode?: boolean;
	derivedParameters?: DerivedParameters;
	datasetIndex?: number;
}
/**
 *
 *
 * ### `base data type = Datum`
 *
 * a single datum
 *
 * ```
 * type Datum = {
 *   pressure: number;
 *   height: number;
 *   temperature: number;
 *   dewPoint: number;
 *   windDirection: number;
 *   windSpeed: number;
 * }
 * ```
 *
 * ## data param
 *
 * the data param is either
 *
 * ### Datum Types
 *
 * `Datums = Datum[] || Dataset = Datum[][]`
 *
 * if passing a Dataset the datasetIndex can be passed to force a render to the sounding
 *
 * aditional methods and features are avialaible when using a dataset
 *
 *
 */
export default function Skewt({ data, defaultTheme = DEFAULT_THEME, datasetIndex = 0, darkMode, derivedParameters }: Props) {
	// create context instance
	const ctx = useCTX();
	// generate theme object
	const theme = React.useMemo(
		() =>
			createTheme({
				...defaultTheme,
				palette: { mode: darkMode ? 'dark' : 'light' },
			}),
		[darkMode]
	);
	// check if data type is dataset datum[][] if true index by the datasetIndex
	const datums = React.useMemo(() => (data[datasetIndex] instanceof Array ? (data[datasetIndex] as Skewt.Datum[]) : (data as Skewt.Datum[])), [data, datasetIndex]);
	// set the datums to state
	React.useEffect(() => {
		if (!!datums) ctx.setState({ datums });
	}, [datums]);
	// toggle state for darkmode
	React.useEffect(() => ctx.setState({ darkMode: !!darkMode }), [darkMode]);
	//
	// TODO: derivedParametr options
	React.useEffect(() => {
		if (!!derivedParameters) {
		}
	}, [derivedParameters]);
	return (
		<SkewtCTX.Provider value={() => ctx}>
			<ThemeProvider theme={theme}>
				<Container />
			</ThemeProvider>
		</SkewtCTX.Provider>
	);
}

interface DerivedParameters {
	BRN: boolean;
	CAP: boolean;
	CAPE: boolean;
	CCL: boolean;
}
export { default as useSkewt } from 'hooks/use-skewt';
