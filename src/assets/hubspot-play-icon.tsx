import React from 'react';
import { IconProps } from './type';

const HubspotPlayIcon:React.FC<IconProps> = ({ width = '24', height = '24', fill = '#f7bd42' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
			<g id="vuesax_bold_arrow-right" data-name="vuesax/bold/arrow-right" transform="translate(-492 -316)">
				<g id="arrow-right">
					<path
						id="Vector"
						d="M0,3.724v5.34c0,3.32,2.35,4.67,5.22,3.02l1.28-.74a1,1,0,0,0,.5-.87V2.314a1,1,0,0,0-.5-.87L5.22.7C2.35-.946,0,.4,0,3.724Z"
						transform="translate(498 321.606)"
						fill={fill}
					/>
					<path
						id="Vector-2"
						data-name="Vector"
						d="M0,.506v6.43a.5.5,0,0,0,.75.43l1.1-.64c2.87-1.65,2.87-4.37,0-6.02L.75.066A.5.5,0,0,0,0,.506Z"
						transform="translate(506 324.284)"
						fill={fill}
					/>
					<path
						id="Vector-3"
						data-name="Vector"
						d="M0,0H24V24H0Z"
						transform="translate(516 340) rotate(180)"
						fill="none"
						opacity="0"
					/>
				</g>
			</g>
		</svg>
	);
};

export default HubspotPlayIcon;
