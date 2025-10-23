import React from 'react';
import { IconProps } from './type';

const LogoutIcon:React.FC<IconProps> = ({ width = '32', height = '32', fill = '#3f5073' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32">
			<g id="vuesax_bold_logout" data-name="vuesax/bold/logout" transform="translate(-748 -444)">
				<g id="logout" transform="translate(748 444)">
					<path
						id="Vector"
						d="M10.8,0H7.2C2.77,0,0,2.646,0,6.879v5.358H8.657a.993.993,0,1,1,0,1.984H0V19.58c0,4.233,2.77,6.879,7.2,6.879h3.588c4.433,0,7.2-2.646,7.2-6.879V6.879C18.008,2.646,15.237,0,10.8,0Z"
						transform="translate(11.222 2.77)"
						fill={fill}
					/>
					<path
						id="Vector-2"
						data-name="Vector"
						d="M3.543,4.637,6.41,1.77a1.027,1.027,0,0,0,.3-.734A1,1,0,0,0,6.41.3,1.045,1.045,0,0,0,4.942.3L.3,4.942A1.045,1.045,0,0,0,.3,6.41l4.64,4.64A1.038,1.038,0,0,0,6.41,9.582L3.543,6.715h6.15V4.637Z"
						transform="translate(2.774 10.324)"
						fill={fill}
					/>
					<path
						id="Vector-3"
						data-name="Vector"
						d="M0,0H32V32H0Z"
						transform="translate(32 32) rotate(180)"
						fill="none"
						opacity="0"
					/>
				</g>
			</g>
		</svg>
	);
};

export default LogoutIcon;
