import React from 'react';
// local imports
import Temperature from './temperature';
import Dewpoint from './dewpoint';
/** Environmental Sounding */
export default function Sounding() {
	return (
		<React.Fragment>
			<Temperature />
			<Dewpoint />
		</React.Fragment>
	);
}
