import Avatar from '@/components/atoms/avatar';
import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { DrawerLayout, IconContainer } from './styles';
import DealIcon from '@/assets/deal-icon';
import NoteIcon from '@/assets/note-icon';
import SidebarButtonRightArrowIcon from '@/assets/sidebar-button-right-arrow-icon';
import SidebarButtonLeftArrowIcon from '@/assets/sidebar-button-left-arrow-icon';
import { useSnapshot } from 'valtio';
import chatStore from '@/store/chat.store';
import AddNote from './add-note';
import ModalContainer from '@/components/atoms/Modal';
import {
	DealStatus,
	TypeContactNetwork,
	useContact_GetByContactIdQuery,
	useContactNetwork_GetListByContactIdQuery,
	useConversationMessage_GetByConversationIdQuery,
	useSupportChat_GetListQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { useRouter } from 'next/router';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import AddTwilioVideoCall from './add-video-call';
import InternalChatIcon from '@/assets/internal-chat-icon';
import { getFullImageUrl } from '@/utils';

const ChatHeader = () => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const contactId = router.query.contactId;
	const conversationId = router.query.conversationId;

	// -------------------------------state management
	const { chatSidebar, dealSidebar } = useSnapshot(chatStore);

	// ------------------------------- query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// get contact
	const { data: CurrentContact } = useContact_GetByContactIdQuery({
		contactId: Number(contactId),
	});
	const CurrentContactData = CurrentContact?.contact_getByContactId?.result;

	// network emails
	const NetworkEmails = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(contactId),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.Email,
			},
		},
	});

	const NetworkEmailsData = NetworkEmails?.data?.contactNetwork_getListByContactId?.result;

	// get conversation
	const { data: Conversation } = useConversationMessage_GetByConversationIdQuery({
		conversationId: Number(conversationId),
		skip: 0,
		take: 1,
	}, { enabled: !!conversationId });

	const conversationData = Conversation?.conversationMessage_getByConversationId?.result

	// -------------------------------functions
	const chatDrowerHandeler = () => {
		chatStore.chatSidebar = !chatSidebar;
		chatStore.dealSidebar = false;
	};

	const handeldealDrower = () => {
		chatStore.chatSidebar = true;
		chatStore.dealSidebar = !dealSidebar;
		chatStore.dealId = null;
	};

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
				{/* -------------------------------right section */}
				{router?.pathname?.includes('/internal-chat')
					? <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} height={'100%'}>
						<Box display={'flex'} justifyContent={'start'} alignItems={'center'} height={'80px'} width={'100%'} pl={2}>
							<Box display={'flex'} justifyContent={'center'} alignItems={'center'} mr={2} bgcolor={theme?.palette?.infuuse?.gray400} borderRadius={'360px'} p={'4px'}>
								<InternalChatIcon width="32px" height="32px" fill={theme?.palette?.infuuse?.porple200} />
							</Box>
							<Typography color={theme?.palette?.infuuse?.blue500} fontSize={'18px'} fontWeight={'bold'}>{conversationData?.items[0]?.conversation?.title}</Typography>

						</Box>
					</Stack>

					: router?.pathname?.includes('/admin/support')
						? <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} p={1} height={'100%'}>
							<Avatar src={getFullImageUrl(conversationData?.items[0]?.conversation?.conversationMembers?.filter((member) => member?.userId !== CurrentUser?.user?.id)[0]?.user?.photoUrl)} width={'60px'} height={'60px'} />

							<Stack>
								<Typography
									fontSize={'16px'}
									color={theme?.palette?.infuuse?.blue500}
									fontWeight={'bold'}
									ml={2}
									mb={1}
									mt={1}
								>
									{conversationData?.items[0]?.conversation?.conversationMembers?.filter((member) => member?.userId !== CurrentUser?.user?.id)[0]?.user?.fullName
										? conversationData?.items[0]?.conversation?.conversationMembers?.filter((member) => member?.userId !== CurrentUser?.user?.id)[0]?.user?.fullName
										: conversationData?.items[0]?.conversation?.conversationMembers?.filter((member) => member?.userId !== CurrentUser?.user?.id)[0]?.user?.email}
								</Typography>


							</Stack>
						</Stack>
						: <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} p={1} height={'100%'}>
							<Avatar src={getFullImageUrl(CurrentContactData?.photoUrl)} width={'60px'} height={'60px'} />

							<Stack>
								<Typography
									fontSize={'16px'}
									color={theme?.palette?.infuuse?.blue500}
									fontWeight={'bold'}
									ml={2}
									mb={1}
									mt={1}
								>
									{CurrentContactData?.fullName
										? CurrentContactData?.fullName
										: NetworkEmailsData?.items[0]?.value}
								</Typography>

								{router?.pathname?.includes('/internal-chat') ? null : router?.pathname?.includes(
									'/support'
								) ? null : (
									<Box ml={2}>
										<Typography
											fontWeight={'bold'}
											color={theme?.palette?.infuuse?.blue100}
											fontSize={'14px'}
										>
											{CurrentContactData?.dealStatus === DealStatus?.ClosedWon
												? 'Closed Won'
												: CurrentContactData?.dealStatus === DealStatus?.AppointmentScheduled
													? 'Appointment Scheduled'
													: 'Lead'}
										</Typography>
									</Box>
								)}
							</Stack>
						</Stack>}

				{/* -------------------------------left section */}
				{router?.pathname?.includes('/internal-chat') ? null : router?.pathname?.includes('/support') ? null : (
					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
						<Tooltip title="Send video call link">
							<IconContainer onClick={() => handelModal(2)}>
								<VideocamRoundedIcon
									sx={{ fontSize: '40px', fill: theme?.palette?.infuuse?.blueLight400 }}
								/>
							</IconContainer>
						</Tooltip>

						<Tooltip title="Add Note">
							<IconContainer onClick={() => handelModal(1)}>
								<NoteIcon />
							</IconContainer>
						</Tooltip>

						<Tooltip title="Add Deal">
							<IconContainer onClick={handeldealDrower}>
								<DealIcon />
							</IconContainer>
						</Tooltip>

						{/* <IconContainer>
						<CheckedIcon fill={theme?.palette?.infuuse?.green200} />
					</IconContainer> */}

						<DrawerLayout onClick={chatDrowerHandeler}>
							{chatSidebar || dealSidebar ? (
								<SidebarButtonRightArrowIcon fill={theme?.palette?.infuuse?.blue200} />
							) : (
								<SidebarButtonLeftArrowIcon />
							)}
						</DrawerLayout>
					</Stack>
				)}
			</Stack>

			<ModalContainer open={open} handleClose={handleClose}>
				{modalCounter === 1 ? (
					<AddNote handleClose={handleClose} contactId={contactId} />
				) : (
					<AddTwilioVideoCall handleClose={handleClose} contactId={contactId} />
				)}
			</ModalContainer>
		</Stack>
	);
};

export default ChatHeader;
