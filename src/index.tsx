import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

// document.body.addEventListener(
// 	'touchmove',
// 	function (event) {
// 		event.preventDefault();
// 	},
// 	{ passive: false }
// );
// window.resiz

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

// , maximum-scale=1, minimum-scale=1, user-scalable=0
