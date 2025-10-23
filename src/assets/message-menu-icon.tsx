import React from 'react';
import { IconProps } from './type';

const MessageMenuIcon:React.FC<IconProps> = ({ width = '24', height = '24' }) => {
	return (
		<svg id="call" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
			<g id="Group_696" data-name="Group 696" transform="translate(0 24) rotate(-90)">
				<path
					id="Path_14324"
					data-name="Path 14324"
					d="M0,2A2,2,0,1,0,2,0,2,2,0,0,0,0,2ZM9,4a2,2,0,1,1,2-2A2,2,0,0,1,9,4Zm7,0a2,2,0,1,1,2-2A2,2,0,0,1,16,4Z"
					transform="translate(3 10)"
					fill="#57b8d9"
					fill-rule="evenodd"
				/>
				<g id="Group_695" data-name="Group 695">
					<rect id="Rectangle_4439" data-name="Rectangle 4439" width="24" height="24" fill="none" />
				</g>
			</g>
		</svg>
	);
};

export default MessageMenuIcon;
