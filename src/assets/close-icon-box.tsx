import React from 'react';
import { IconProps } from './type';

const CloseIconBox:React.FC<IconProps> = ({ width = '24', height = '24', fill = '#f33' }) => {
	return (
		<svg id="close-square" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32">
			<g id="Group_70144" data-name="Group 70144">
				<path
					id="Vector"
					d="M18.92,0H7.747C2.893,0,0,2.893,0,7.747v11.16c0,4.867,2.893,7.76,7.747,7.76h11.16c4.853,0,7.747-2.893,7.747-7.747V7.747C26.667,2.893,23.773,0,18.92,0Z"
					transform="translate(2.667 2.667)"
					fill={fill}
				/>
			</g>
			<path
				id="Vector-2"
				data-name="Vector"
				d="M6.183,4.77,9.25,1.7A1,1,0,0,0,7.837.29L4.77,3.357,1.7.29A1,1,0,0,0,.29,1.7L3.357,4.77.29,7.837a1.006,1.006,0,0,0,0,1.413,1,1,0,0,0,1.413,0L4.77,6.183,7.837,9.25a1,1,0,0,0,1.413,0,1.006,1.006,0,0,0,0-1.413Z"
				transform="translate(11.23 11.23)"
				fill="#fff"
			/>
			<path id="Vector-3" data-name="Vector" d="M0,0H32V32H0Z" fill="none" opacity="0" />
		</svg>
	);
};

export default CloseIconBox;
