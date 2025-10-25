import AddIcon from '@/assets/add-icon';
import ModalContainer from '@/components/atoms/Modal';
import AdminInternalChatMessageBox from '@/components/pages/left-sidebar/admin/internal-chat/internal-chat-message-box.tsx';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import AddGroup from './modal/add-group';
import { useConversationMessage } from '@/hooks/cache-conversations/use-conversation-message-cache';
import { adminInternalChatVariables } from '../../sidebar-variables';
import { AdminInternalChatSidebarContainer } from '../../styles';

const AdminInternalChatSidebar = () => {
	const theme = useTheme();

	const { conversations } = useConversationMessage(adminInternalChatVariables);

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	return (
		<AdminInternalChatSidebarContainer>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
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
					<AddIcon />
				</Box>
			</Stack>

			{conversations?.map((conversation) => (
				<Stack key={conversation?.id}>
					{/* -------------------------------message box */}
					<AdminInternalChatMessageBox conversation={conversation} />
				</Stack>
			))}

			<ModalContainer open={open} handleClose={handleClose}>
				<AddGroup handleClose={handleClose} />
			</ModalContainer>
		</AdminInternalChatSidebarContainer>
	);
};

export default AdminInternalChatSidebar;
