import React from 'react';
import { IconProps } from './type';

const VideoIcon: React.FC<IconProps> = ({ width = '24', height = '24', fill = '#99a6bf' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<g id="vuesax_bold_video" data-name="vuesax/bold/video" transform="translate(-108 -252)">
				<g id="video">
					<path
						id="Vector"
						d="M19.4,2.92a2.249,2.249,0,0,0-2.44.37L15.49,4.33C15.38,1.22,14.03,0,10.75,0h-6C1.33,0,0,1.33,0,4.75v8A4.415,4.415,0,0,0,4.75,17.5h6c3.28,0,4.63-1.22,4.74-4.33l1.47,1.04a2.752,2.752,0,0,0,1.59.58,1.819,1.819,0,0,0,.85-.21,2.257,2.257,0,0,0,1.1-2.21V5.13A2.257,2.257,0,0,0,19.4,2.92ZM9.25,8.13a1.88,1.88,0,1,1,1.88-1.88A1.884,1.884,0,0,1,9.25,8.13Z"
						transform="translate(109.75 255.25)"
						fill={fill}
					/>
					<path
						id="Vector-2"
						data-name="Vector"
						d="M0,0H24V24H0Z"
						transform="translate(108 252)"
						fill="none"
						opacity="0"
					/>
				</g>
			</g>
		</svg>
	);
};

export default VideoIcon;
