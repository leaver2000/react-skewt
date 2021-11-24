import { useMemo, useState } from 'react';

export default function usePrint() {
	const [data, setState] = useState<AnyObject | null>(null);

	return useMemo(
		() => ({
			data,
			print: (d: AnyObject) => setState(d),
		}),
		[data]
	);
}
