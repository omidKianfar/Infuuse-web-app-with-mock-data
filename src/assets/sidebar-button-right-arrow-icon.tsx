import React from 'react';

const SidebarButtonRightArrowIcon = ({ width = '65', height = '40', fill = '#57b8d9' }) => {
	return (
		<svg
			id="Group_70145"
			data-name="Group 70145"
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 32 32"
		>
			<g id="logout">
				<path
					id="Vector"
					d="M6.029,13.308A1,1,0,0,0,7,14.313h7.12V25.65a1.146,1.146,0,0,1-1.13,1.153C5.34,26.8,0,21.295,0,13.4S5.34,0,12.993,0a1.135,1.135,0,0,1,1.117,1.153V12.316H7A.969.969,0,0,0,6.029,13.308Z"
					transform="translate(4.21 2.599)"
					fill={fill}
				/>
				<path
					id="Vector-2"
					data-name="Vector"
					d="M8.368,5.34l-3.69,3.7A.974.974,0,0,1,3.3,7.666L5.327,5.639H0V3.69H5.314L3.287,1.663a.98.98,0,0,1,0-1.377.972.972,0,0,1,1.377,0l3.69,3.7A.938.938,0,0,1,8.368,5.34Z"
					transform="translate(19.137 11.255)"
					fill={fill}
				/>
				<path
					id="Vector-3"
					data-name="Vector"
					d="M0,32H32V0H0Z"
					transform="translate(32 32) rotate(180)"
					fill="none"
					opacity="0"
				/>
			</g>
		</svg>
	);
};

export default SidebarButtonRightArrowIcon;
