import React from 'react';
import { IconProps } from './type';


const CheckedIcon: React.FC<IconProps> = ({ width = '32', height = '32', fill = '#c3cad9' }) => {
	return (
		<svg
			id="Group_70144"
			data-name="Group 70144"
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 32 32"
		>
			<g id="tick-square">
				<path
					id="Vector"
					d="M19.869,0H8.135C3.038,0,0,3.038,0,8.134V19.852C0,24.962,3.038,28,8.135,28h11.72c5.1,0,8.135-3.038,8.135-8.134V8.134C28,3.038,24.966,0,19.869,0Zm.826,10.78-7.939,7.938a1.048,1.048,0,0,1-1.484,0L7.309,14.756a1.049,1.049,0,0,1,1.484-1.484l3.22,3.22,7.2-7.2a1.049,1.049,0,0,1,1.484,1.484Z"
					transform="translate(2 2)"
					fill={fill}
				/>
				<path
					id="Vector-2"
					data-name="Vector"
					d="M0,0H32V32H0Z"
					transform="translate(32 32) rotate(180)"
					fill="none"
					opacity="0"
				/>
			</g>
		</svg>
	);
};

export default CheckedIcon;
