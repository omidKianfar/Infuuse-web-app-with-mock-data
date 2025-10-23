import React from 'react';
import { IconProps } from './type';

const SearchIcon:React.FC<IconProps>  = ({ width = '32', height = '32', fill = '#c3cad9' }) => {
	return (
		<svg
			id="vuesax_bold_search-normal"
			data-name="vuesax/bold/search-normal"
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 32 32"
		>
			<g id="search-normal">
				<path id="Vector" d="M0,0H32V32H0Z" transform="translate(32 32) rotate(180)" fill="none" opacity={0} />
				<path
					id="Path_14315"
					data-name="Path 14315"
					d="M2,12.527A10.472,10.472,0,0,1,12.415,2,10.359,10.359,0,0,1,19.78,5.083a10.584,10.584,0,0,1,3.051,7.444,10.416,10.416,0,1,1-20.83,0Zm20.658,8.481,3.1,2.5h.054a1.637,1.637,0,0,1,0,2.3,1.6,1.6,0,0,1-2.273,0l-2.574-2.95a1.316,1.316,0,0,1,0-1.851A1.2,1.2,0,0,1,22.658,21.008Z"
					transform="translate(1.858 1.858)"
					fill={fill}
					fillRule="evenodd"
				/>
			</g>
		</svg>
	);
};

export default SearchIcon;
