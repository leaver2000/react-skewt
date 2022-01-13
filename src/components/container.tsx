import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
//	hooks
import useCTX from 'hooks/use-ctx';
import useResizeObserver from 'hooks/use-resize-observer';
//	components
import Diagram from './diagram';
import Sounding from './sounding';
import WindStaff from './wind-staff';
//

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));
export default function Container() {
	const { setState, isSized } = useCTX();

	React.useEffect(() => window.addEventListener('resize', () => setState({ isSized: false })), []);

	const ref = useResizeObserver<HTMLDivElement>((element) => {
		const height = element.offsetWidth;
		const width = element.offsetHeight;

		// console.log({ width, height });
	});

	return (
		<Box ref={ref} sx={{ flexGrow: 1 }}>
			<Grid container alignItems='stretch'>
				<Grid item xs={10}>
					<Item>xs=10</Item>
				</Grid>
				<Grid item xs={2}>
					<Item>xs=2</Item>
				</Grid>
				{/* TOP ROW */}
				<Grid container item direction='row' alignItems='stretch' sx={{ border: '2px solid red', borderRadius: '5px' }}>
					{/* Ref -> setDim -> isSize = True */}
					<Grid item xs={10} sx={{ border: ' 2px solid black', borderRadius: '5px' }}>
						<Diagram>
							<Sounding />
						</Diagram>
					</Grid>
					<Grid item xs={2} sx={{ border: ' 2px solid black', borderRadius: '5px' }}>
						{isSized ? <WindStaff /> : null}
					</Grid>
				</Grid>
				{/*  */}
			</Grid>
		</Box>
	);
}
