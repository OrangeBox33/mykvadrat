import { useState, useEffect } from 'react';

export const useDeviceType = () => {
	const [device, setDevice] = useState(1);

	useEffect(() => {
		const height = window.outerHeight;
		const width = window.outerWidth;

		if (height > width) {
			setDevice(1);
		} else if (height < 500) {
			setDevice(2);
		} else setDevice(0);
	}, [window.outerHeight]);

	return device;
};
