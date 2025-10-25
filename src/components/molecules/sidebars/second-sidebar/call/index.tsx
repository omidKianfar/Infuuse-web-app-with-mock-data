import { Box, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';
import DilarIcon from '@/assets/dilar-icon';
import Dilar from './dilar';

import MessageCart from '@/components/pages/left-sidebar/message-card';
import { callVariables } from '../sidebar-variables';
import { useConversationMessage } from '@/hooks/cache-conversations/use-conversation-message-cache';
import { SidebarContainer } from '../styles';

const CallSidebar = () => {
	const theme = useTheme();
	const [dilar, setDilar] = useState<boolean>(false);

	const { conversations } = useConversationMessage(callVariables);

	return (
		<SidebarContainer>
			<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} mb={1} p={'4px'}>
				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					bgcolor={theme?.palette?.infuuse?.gray100}
					width={'32px'}
					height={'32px'}
					borderRadius={'360px'}
					boxShadow={4}
					sx={{ cursor: 'pointer' }}
					onClick={() => setDilar(!dilar)}
				>
					<DilarIcon width="18px" height="18px" />
				</Box>
			</Stack>
			<Stack>
				{dilar ? (
					<Dilar />
				) : (
					<Stack
						sx={{
							maxHeight: '75vh',
							overflowY: 'auto',
							paddingTop: '24px',
							'&::-webkit-scrollbar': {
								display: 'none',
							},
							scrollbarWidth: 'none',
							scrollbarColor: 'transparent transparent',
						}}
					>
						{conversations?.map((conversation) => (
							<Stack key={conversation?.id}>
								<MessageCart conversation={conversation} />
							</Stack>
						))}
					</Stack>
				)}
			</Stack>
		</SidebarContainer>
	);
};

export default CallSidebar;
