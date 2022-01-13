import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CssBaseline from '@mui/material/CssBaseline';
//
import Skewt, { useSkewt } from './skewt';
import TemperatureController from 'components/temperature-controller';
import './styles/styles.css';
// for testing
import { datums, dataset } from './data';
import { sampleAt } from 'lib/calc';
function App() {
	const [darkMode, setDarkMode] = React.useState(false);
	const skew = useSkewt();

	function ToggleDarkMode() {
		return (
			<FormControl component='fieldset'>
				<FormLabel component='legend'>Mode</FormLabel>
				<RadioGroup row aria-label='gender' name='row-radio-buttons-group' value={darkMode ? 'dark' : 'light'} onChange={() => setDarkMode((mode) => (mode ? false : true))}>
					<FormControlLabel value='light' control={<Radio />} label='light' />
					<FormControlLabel value='dark' control={<Radio />} label='dark' />
				</RadioGroup>
			</FormControl>
		);
	}
	const onMouseEvent = () => {};
	const [datasetIndex, setDatasetIndex] = React.useState(0);

	const handleChange = () => setDatasetIndex((i) => i + 1);

	return (
		<React.Fragment>
			<CssBaseline />
			<Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
				<Grid container direction='row' justifyContent='center' alignItems='stretch' sx={{ height: '100vh', width: '100vw', overflow: 'auto' }}>
					<Grid item>
						<button onClick={handleChange}>sadsad</button>
						<TemperatureController onMouseEvent={onMouseEvent} />
					</Grid>
					<Grid item>
						<ToggleDarkMode />
					</Grid>
					<Grid item xs={11}>
						<Skewt data={dataset} datasetIndex={datasetIndex} darkMode={darkMode} />
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
///
export { default } from './skewt';
export { default as useSkewt } from 'hooks/use-skewt';
export { default as TemperatureController } from 'components/temperature-controller';
