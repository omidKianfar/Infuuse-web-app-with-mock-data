import { Stack, useTheme } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import ModalContainer from '@/components/atoms/Modal';
import { useConversationMessage_GetByConversationIdQuery } from '@/graphql/generated';
import { useRouter } from 'next/router';
import InternalChatHeader from './left-items/internal-chat';
import ChatBoxHeader from './left-items/chat-box';
import AdminSupportChatHeader from './left-items/admin-support';
import HeaderRightSection from './right-items';
import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';

const AddNote = lazy(() => import('./left-items/add-note'));
const AddTwilioVideoCall = lazy(() => import('./left-items/add-video-call'));

const ChatHeader = () => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const contactId = router.query.contactId;
	const conversationId = router.query.conversationId;

	// -------------------------------state management

	const { data: Conversation } = useConversationMessage_GetByConversationIdQuery(
		{
			conversationId: Number(conversationId),
			skip: 0,
			take: 1,
		},
		{ enabled: !!conversationId }
	);

	const conversationData = Conversation?.conversationMessage_getByConversationId?.result;

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);
	const [modalCounter, setModalCounter] = React.useState(0);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = (num: number) => {
		setModalCounter(num);
		handleOpen();
	};

	return (
		<Stack width={'100%'} height={'80px'} borderBottom={`2px solid ${theme?.palette?.infuuse?.gray100}`}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				{router?.pathname?.includes('/internal-chat') ? (
					<InternalChatHeader conversationData={conversationData} />
				) : router?.pathname?.includes('/admin/support') ? (
					<AdminSupportChatHeader conversationData={conversationData} />
				) : (
					<ChatBoxHeader contactId={contactId} />
				)}

				{router?.pathname?.includes('/internal-chat') ? null : router?.pathname?.includes('/support') ? null : (
					<HeaderRightSection handelModal={handelModal} />
				)}
			</Stack>

			<ModalContainer open={open} handleClose={handleClose}>
				<Suspense fallback={<LoadingProgress />}>
				{modalCounter === 1 ? (
					<AddNote handleClose={handleClose} contactId={contactId} />
				) : (
					<AddTwilioVideoCall handleClose={handleClose} />
				)}
				</Suspense>
			</ModalContainer>
		</Stack>
	);
};

export default ChatHeader;
