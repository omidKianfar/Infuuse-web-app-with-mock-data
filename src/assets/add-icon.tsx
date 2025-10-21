import React from 'react';

const AddIcon = ({ width = '24', height = '24', fill = '#57b8d9' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
			<g id="add-square" transform="translate(-620 -252)">
				<path
					id="Vector"
					d="M14.19,0H5.81C2.17,0,0,2.17,0,5.81v8.37C0,17.83,2.17,20,5.81,20h8.37c3.64,0,5.81-2.17,5.81-5.81V5.81C20,2.17,17.83,0,14.19,0ZM14,10.75H10.75V14a.75.75,0,0,1-1.5,0V10.75H6a.75.75,0,0,1,0-1.5H9.25V6a.75.75,0,0,1,1.5,0V9.25H14a.75.75,0,0,1,0,1.5Z"
					transform="translate(622 254)"
					fill={fill}
				/>
				<path
					id="Vector-2"
					data-name="Vector"
					d="M0,0H24V24H0Z"
					transform="translate(644 276) rotate(180)"
					fill="none"
					opacity="0"
				/>
			</g>
		</svg>
	);
};

export default AddIcon;
