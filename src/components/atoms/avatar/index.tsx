import { Stack, useTheme } from '@mui/material';
import React from 'react';
import Image from '../Image';
import { getFullImageUrl } from '@/utils';

interface Props {
	src?: string;
	width?: any;
	height?: any;
}

const Avatar = ({ src, width = '48px', height = '48px' }: Props) => {
	const theme = useTheme();
	return (
		<Stack
			width={width}
			height={height}
			borderRadius="360px"
			direction={'row'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			{src ? (
				<Image
					src={getFullImageUrl(src)}
					sx={{
						objectFit: 'cover',
						width: width,
						height: height,
						borderRadius: '360px',
					}}
				/>
			) : (
				<Image
					src="/images/avatar.png"
					sx={{
						objectFit: 'cover',
						width: width,
						height: height,
						borderRadius: '360px',
					}} />
			)}
		</Stack>
	);
};

export default Avatar;


