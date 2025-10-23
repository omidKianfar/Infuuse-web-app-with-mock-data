import React from 'react';
import { IconProps } from './type';

const FileAttachmentIcon:React.FC<IconProps> = ({ width = '32', height = '32', fill = '#c3cad9' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 19.99 20">
			<path
				id="Vector"
				d="M14.19,0H5.81C2.17,0,0,2.17,0,5.81v8.37C0,17.83,2.17,20,5.81,20h8.37c3.64,0,5.81-2.17,5.81-5.81V5.81C20,2.17,17.83,0,14.19,0Zm.18,12.35-2.22,2.22a2.744,2.744,0,1,1-3.88-3.88L9.68,9.28a.75.75,0,0,1,1.06,1.06L9.33,11.75a1.234,1.234,0,0,0-.37.88,1.217,1.217,0,0,0,.37.88,1.249,1.249,0,0,0,1.77,0l2.22-2.22a3.253,3.253,0,0,0-4.6-4.6L6.3,9.11a2.656,2.656,0,0,0,0,3.78.75.75,0,0,1-1.06,1.06A4.051,4.051,0,0,1,4,11.01,4.151,4.151,0,0,1,5.22,8.05L7.64,5.63a4.755,4.755,0,0,1,6.73,6.72Z"
				fill={fill}
			/>
		</svg>
	);
};

export default FileAttachmentIcon;
