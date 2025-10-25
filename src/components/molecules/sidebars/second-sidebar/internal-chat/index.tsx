import AddIcon from '@/assets/add-icon';
import ModalContainer from '@/components/atoms/Modal';
import InternalChatMessageBox from '@/components/pages/main-header/internal-chat/internal-chat-message-box.tsx';
import { Box, Stack, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import AddGroup from './modal/add-group';

import { useConversationMessage } from '@/hooks/cache-conversations/use-conversation-message-cache';
import { internalChatVariables } from '../sidebar-variables';

const InternalChatSidebar = () => {
	const theme = useTheme();

	const { conversations } = useConversationMessage(internalChatVariables);

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	return (
		<Stack position={'relative'} width={'100%'} height={'100%'}>
			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				position={'absolute'}
				right={0}
				top={0}
				zIndex={1000}
				bgcolor={theme?.palette?.infuuse?.gray200}
				width={'100%'}
			>
				<Typography fontSize={'24px'} fontWeight={'bold'} color={theme?.palette?.infuuse?.blue100}>
					Internal
				</Typography>

				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					sx={{ cursor: 'pointer' }}
					onClick={handelModal}
				>
					<AddIcon fill={theme?.palette?.infuuse?.blue100} />
				</Box>
			</Stack>

			<InternalChatSidebarContainer>
				{conversations?.map((conversation) => (
					<Stack key={conversation?.id}>
						<InternalChatMessageBox conversation={conversation} />
					</Stack>
				))}
			</InternalChatSidebarContainer>
			<ModalContainer open={open} handleClose={handleClose}>
				<AddGroup handleClose={handleClose} />
			</ModalContainer>
		</Stack>
	);
};

export default InternalChatSidebar;

export const InternalChatSidebarContainer = styled(Stack)({
	width: '100%',
	height: '100%',
	maxHeight: '80vh',
	overflowY: 'auto',
	paddingTop: '60px',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});
