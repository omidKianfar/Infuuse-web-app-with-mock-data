import React from 'react';
import { IconProps } from './type';

const StarGoldIcon:React.FC<IconProps>  = ({ width = '32', height = '30.836' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 30.836">
			<g id="Group_22587" data-name="Group 22587" transform="translate(-570.852 -278)">
				<path
					id="Star-Filled"
					d="M22.719,5.649,23.857,9.1a3.879,3.879,0,0,0,3.672,2.689h3.585a3.861,3.861,0,0,1,2.275,7l-2.948,2.137a3.879,3.879,0,0,0-1.413,4.327L30.166,28.7a3.861,3.861,0,0,1-5.947,4.378l-2.9-2.155a3.878,3.878,0,0,0-4.551,0l-2.9,2.155A3.861,3.861,0,0,1,7.93,28.747L9.067,25.3a3.878,3.878,0,0,0-1.413-4.327L4.637,18.8a3.861,3.861,0,0,1,2.344-7.016h3.585a3.878,3.878,0,0,0,3.672-2.655l1.138-3.447a3.861,3.861,0,0,1,7.343-.034Z"
					transform="translate(567.852 275)"
					fill="#f6bd07"
				/>
			</g>
		</svg>
	);
};

export default StarGoldIcon;
