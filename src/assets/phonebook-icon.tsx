import React from 'react';
import { IconProps } from './type';

const PhonebookIcon:React.FC<IconProps>  = ({ width = '32', height = '32', fill = '#c3cad9' }) => {
	return (
		<svg
			id="Group_70149"
			data-name="Group 70149"
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 32 32"
		>
			<g id="mobile">
				<path
					id="Vector"
					d="M16.32,0H5.013C1.333,0,0,1.333,0,5.08V21.587c0,3.747,1.333,5.08,5.013,5.08H16.307c3.693,0,5.027-1.333,5.027-5.08V5.08C21.333,1.333,20,0,16.32,0ZM10.667,23.067A2.333,2.333,0,1,1,13,20.733,2.345,2.345,0,0,1,10.667,23.067Zm2.667-17.4H8a1,1,0,0,1,0-2h5.333a1,1,0,0,1,0,2Z"
					transform="translate(5.333 2.667)"
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

export default PhonebookIcon;
