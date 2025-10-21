import { Stack, styled, useTheme } from '@mui/material';
import React from 'react';
import Image from '../Image';

const NoChatPage = () => {
	return (
		<NodataPage>
			<Stack>
				<Image src={'/images/empty-chat.png'} style={{ width: '100%', height: '100%' }} />
			</Stack>
		</NodataPage>
	);
};

export default NoChatPage;

export const NodataPage = styled(Stack)(({ theme }) => ({
	width: '100%',
	height: '100%',
	borderRadius: '16px',
	background: theme?.palette?.infuuse.gray200,
	padding: '16px ',
	justifyContent: 'center',
	alignItems: 'center',
}));
