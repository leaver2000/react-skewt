import React from 'react';
// import SVGContainer from './SVG-container';
import useCTX from 'hooks/use-ctx';
// import { useController } from 'controller';
// import type { TEMP_CTRL } from '@types';

export default function TemperatureController({ onMouseEvent }: { onMouseEvent: (e: any) => void }) {
	const ctx = useCTX();
	// const { data } = useCTX();
	// const tmpData = data.frame.sfc['2_m_agl_tmp'];
	// const dptData = data.frame.sfc['2_m_agl_dpt'];
	return <React.Fragment />;
	// return !!tmpData && !!dptData ? <SVGContainer tmpData={tmpData} dptData={dptData} onMouseEvent={onMouseEvent} /> : <React.Fragment />;
}
