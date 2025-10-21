import { Stack, useTheme } from '@mui/material';
import React from 'react';
import BaseSidebar from './base-sidebar';
import { useSnapshot } from 'valtio';
import chatStore from '@/store/chat.store';
import DealSidebar from './deal-sidebar';

const ChatSidebar = () => {
	// -------------------------------tools
	const theme = useTheme();

	// -------------------------------state management
	const { dealSidebar } = useSnapshot(chatStore);

	return (
		<Stack width={'380px'} height={'100%'} bgcolor={theme?.palette?.infuuse?.gray100}>
			<Stack width={'100%'} height={'100%'} p={'0 0 0 16px '}>
				{dealSidebar ? <DealSidebar /> : <BaseSidebar />}
			</Stack>
		</Stack>
	);
};

export default ChatSidebar;
