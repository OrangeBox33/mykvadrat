import { FC, useEffect, useState } from 'react';
import { socket } from '../../socket';
import { Main } from '../Main';

export const Root: FC = () => {
	const [render, setRender] = useState(0);

	useEffect(() => {
		if (render < 30) {
			if (socket.readyState === 1) {
				socket.send(JSON.stringify({ type: 'getGrid' }));
			} else {
				setTimeout(() => {
					setRender(prevRender => prevRender + 1);
				}, 500);
			}
		}
	}, [render]);

	return <Main />;
};
