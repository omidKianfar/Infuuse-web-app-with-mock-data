import AddIcon from '@/assets/add-icon';
import ModalContainer from '@/components/atoms/Modal';
import AdminInternalChatMessageBox from '@/components/pages/left-sidebar/admin/internal-chat/internal-chat-message-box.tsx';
import { Box, Stack, styled, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import AddGroup from './modal/add-group';
import { useSnapshot } from 'valtio';
import userSubscriptionStore from '@/store/user-subscription.store';
import { ConversationType, SortEnumType, useConversation_GetListQuery } from '@/graphql/generated';
import { queryKeyManager } from '@/utils/queryKeys';

const AdminInternalChatSidebar = () => {
	//  -------------------------------tools
	const theme = useTheme();

	// -------------------------------query
	const { conversationIds } = useSnapshot(userSubscriptionStore);

	const variables = {
		skip: 0,
		take: 10000,
		where: {
			type: {
				eq: ConversationType?.InternalChat
			}
		},
		order: {
			lastMessage: {
				createdDate: SortEnumType?.Desc
			}
		},
	}

	// get agency conversations
	const { data: Conversation } = useConversation_GetListQuery(variables);

	useEffect(() => {
		queryKeyManager.addKey('conversationList', ['conversation_getList', variables]);
	}, []);

	const ConversationData = Conversation?.conversation_getList?.result;

	useEffect(() => {
		const ConversationIds = [];
		if (ConversationData) {
			ConversationData?.items?.map((conversation) => {
				ConversationIds.push(conversation?.id);
			});
			userSubscriptionStore.conversationIds = ConversationIds;
		}
	}, [ConversationData]);

	// ------------------------------- modal
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

			{ConversationData?.items?.map((conversation) => (
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

//  -------------------------------style
export const AdminInternalChatSidebarContainer = styled(Stack)({
	width: '100%',
	height: '100%',
	maxHeight: '68vh',
	overflowY: 'auto',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});
