import React from 'react';
import { IconProps } from './type';


const AssignIcon: React.FC<IconProps> = ({ width = '32', height = '32', fill = '#c3cad9' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
			<g id="Group_70148" data-name="Group 70148" transform="translate(-4.016 -4)">
				<g id="profile-add" transform="translate(4.016 4)">
					<path
						id="Vector"
						d="M4.611,0a4.607,4.607,0,0,0-.116,9.213.783.783,0,0,1,.214,0h.068A4.608,4.608,0,0,0,4.611,0Z"
						transform="translate(7.389 1.942)"
						fill={fill}
					/>
					<path
						id="Vector-2"
						data-name="Vector"
						d="M12.369,1.354a10.581,10.581,0,0,0-10.359,0A3.807,3.807,0,0,0,0,4.49,3.776,3.776,0,0,0,2,7.606,9.793,9.793,0,0,0,7.185,8.975a9.793,9.793,0,0,0,5.184-1.369,3.8,3.8,0,0,0,2-3.136A3.8,3.8,0,0,0,12.369,1.354ZM9.226,5.218H7.95V6.432a.766.766,0,0,1-1.531,0V5.218H5.144a.753.753,0,0,1-.765-.728.753.753,0,0,1,.765-.728H6.419V2.548a.766.766,0,0,1,1.531,0V3.762H9.226a.753.753,0,0,1,.765.728A.753.753,0,0,1,9.226,5.218Z"
						transform="translate(4.815 13.083)"
						fill={fill}
					/>
					<path
						id="Vector-3"
						data-name="Vector"
						d="M0,0H24V24H0Z"
						transform="translate(24 24) rotate(180)"
						fill="none"
						opacity="0"
					/>
				</g>
			</g>
		</svg>
	);
};

export default AssignIcon;
