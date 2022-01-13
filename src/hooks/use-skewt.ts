import React from 'react';
import useCTX from 'hooks/use-ctx';
export default function useSkewt() {
	const [_state, _setState] = React.useState({});
	const ctx = useCTX();

	const getPointerState = React.useCallback(() => {
		return { ctx };
	}, [ctx]);

	return { getPointerState, ...ctx };
}
