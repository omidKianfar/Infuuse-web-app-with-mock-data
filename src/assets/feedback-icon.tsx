import React from 'react';
import { IconProps } from './type';

const FeedbackIcon:React.FC<IconProps> = ({ width = '32', height = '32', fill = '#c3cad9' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32">
			<g id="Group_70145" data-name="Group 70145" transform="translate(-8 -8)">
				<g id="messages" transform="translate(8 8)">
					<path id="Vector" d="M0,0H32V32H0Z" fill="none" opacity="0" />
					<g
						id="vuesax_bold_message-text"
						data-name="vuesax/bold/message-text"
						transform="translate(-744.8 -312.8)"
					>
						<g id="message-text" transform="translate(748 316)">
							<path id="Vector-2" data-name="Vector" d="M0,0H25.6V25.6H0Z" fill="none" opacity="0" />
							<path
								id="Vector-3"
								data-name="Vector"
								d="M15.12,0H6.48Q0,0,0,6.48v14.04A1.083,1.083,0,0,0,1.08,21.6H15.12q6.48,0,6.48-6.48V6.48Q21.6,0,15.12,0ZM12.96,14.31H5.4a.81.81,0,1,1,0-1.62h7.56a.81.81,0,1,1,0,1.62Zm3.24-5.4H5.4a.81.81,0,1,1,0-1.62H16.2a.81.81,0,0,1,0,1.62Z"
								transform="translate(2 2)"
								fill={fill}
							/>
						</g>
					</g>
				</g>
			</g>
		</svg>
	);
};

export default FeedbackIcon;
