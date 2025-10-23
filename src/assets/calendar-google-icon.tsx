import React from 'react';
import { GoogleProps } from './type';

const CalendarGoogleIcon: React.FC<GoogleProps> = ({ width = '32', height = '32', fill = '#c3cad9' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={width} height={height} fill={'#fff'}>
			<rect width="22" height="22" x="13" y="13" />
			<polygon
				fill={fill?.fill1 ? fill?.fill1 : fill}
				points="25.68,20.92 26.688,22.36 28.272,21.208 28.272,29.56 30,29.56 30,18.616 28.56,18.616"
			/>
			<path
				fill={fill?.fill1 ? fill?.fill1 : fill}
				d="M22.943,23.745c0.625-0.574,1.013-1.37,1.013-2.249c0-1.747-1.533-3.168-3.417-3.168 c-1.602,0-2.972,1.009-3.33,2.453l1.657,0.421c0.165-0.664,0.868-1.146,1.673-1.146c0.942,0,1.709,0.646,1.709,1.44 c0,0.794-0.767,1.44-1.709,1.44h-0.997v1.728h0.997c1.081,0,1.993,0.751,1.993,1.64c0,0.904-0.866,1.64-1.931,1.64 c-0.962,0-1.784-0.61-1.914-1.418L17,26.802c0.262,1.636,1.81,2.87,3.6,2.87c2.007,0,3.64-1.511,3.64-3.368 C24.24,25.281,23.736,24.363,22.943,23.745z"
			/>
			<polygon fill={fill?.fill2 ? fill?.fill2 : fill} points="34,42 14,42 13,38 14,34 34,34 35,38" />
			<polygon fill={fill?.fill3 ? fill?.fill3 : fill} points="38,35 42,34 42,14 38,13 34,14 34,34" />
			<path fill={fill?.fill1 ? fill?.fill1 : fill} d="M34,14l1-4l-1-4H9C7.343,6,6,7.343,6,9v25l4,1l4-1V14H34z" />
			<polygon fill={fill?.fill4 ? fill?.fill4 : fill} points="34,34 34,42 42,34" />
			<path fill={fill?.fill5 ? fill?.fill5 : fill} d="M39,6h-5v8h8V9C42,7.343,40.657,6,39,6z" />
			<path fill={fill?.fill5 ? fill?.fill5 : fill} d="M9,42h5v-8H6v5C6,40.657,7.343,42,9,42z" />
		</svg>
	);
};

export default CalendarGoogleIcon;
