import React from 'react';
import ReactDOM from 'react-dom';
// import Router from './route/router';
// import Controller from './controller/use-controller';
import './css/style.css';
import './css/skewt.less';
import './css/skewt.css';
// // import MySVG from './skewt';
import Skewt from './app';

// import run from './test/skewt';
// run();
// import Skewt from './app';
// hm();
// Skewt();
// ReactDOM.render(
// 	<React.StrictMode>
// 		<Controller>
// 			<Router />
// 		</Controller>
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );
ReactDOM.render(<Skewt />, document.getElementById('root'));
