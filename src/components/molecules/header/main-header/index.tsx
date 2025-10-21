import NotificationIcon from '@/assets/notification-icon';
import SettingIcon from '@/assets/setting-icon';
import { Box, Stack, Tooltip, Typography, styled, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { IconBoxBadge } from '../../sidebars/first-sidebar/styles';
import TicketIcon from '@/assets/ticket-icon';
import InternalChatIcon from '@/assets/internal-chat-icon';
import ContactIcon from '@/assets/contact-icon';
import SupportIcon from '@/assets/support-icon';
import PhonebookIcon from '@/assets/phonebook-icon';
import CalendarGoogleIcon from '@/assets/calendar-google-icon';
import { useSnapshot } from 'valtio';
import settingStore from '@/store/setting.store';
import NotificationsBox from './notification';
import {
	ConversationType,
	NotificationDocument,
	NotificationSubscription,
	SortEnumType,
	useConversation_GetListQuery,
	useConversationMessage_GetByConversationIdQuery,
	useConversationMessage_SetSeenStatusMutation,
	useNotification_GetListQuery,
	useSupportChat_GetListQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { subscribe } from '@/utils/subscription';
import { queryClient } from 'pages/_app';
import Support from './support';
import SearchIcon from '@/assets/search-icon';
import ModalContainer from '@/components/atoms/Modal';
import SearchModal from './modal';
import { SubscriptionLayoutContext } from '@/providers/socialMessageProvider';
import { responseDestructure } from '@/utils';

const MainHeader = () => {
	// -------------------------------tools
	const router = useRouter();
	const theme = useTheme();

	// -------------------------------state
	const [notificationState, setNotificationState] = useState(false);
	const [SupportState, setSupportState] = useState(false);
	const [MessagesUnSeenIds, setMessagesUnSeenIds] = useState([]);

	// --------------------------------state managment
	const { setting } = useSnapshot(settingStore);

	// --------------------------------context
	const { lastMessageSubscription } = useContext(SubscriptionLayoutContext);

	// ----------------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;
	const userId = User?.user_getCurrentUser?.result?.user?.id;

	// query options
	const queryOptions = {
		skip: 0,
		take: 10000,
		where: {
			and: [
				{
					isSeen: {
						eq: false,
					},
				},
				{
					userId: {
						eq: Number(CurrentUser?.user?.id),
					},
				},
			],
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	};

	// query key
	const queryKey = ['notification_getList', queryOptions];

	// nofications list
	const { data: notification } = useNotification_GetListQuery(queryOptions);
	const NotificationData = notification?.notification_getList?.result;


	// query key 
	const variables = {
		take: 10000,
		skip: 0,
	}

	// list of conversations have unseen  message
	const { data: ConversationsUnSeenList } = useConversation_GetListQuery({
		take: 10000,
		skip: 0,
		where: {
			and: [
				{
					lastMessage: {
						conversationMember: {
							userId: {
								neq: Number(userId)
							}
						}
					}
				}, {
					type: {
						eq: ConversationType?.InternalChat
					}
				}
			]

		}
	})

	const ConversationsUnSeenListData = ConversationsUnSeenList?.conversation_getList?.result

	// get support conversations
	const { data: supportChat } = useSupportChat_GetListQuery({
		skip: 0,
		take: 1,
	});
	const SupportChatData = supportChat?.supportChat_getList?.result;

	// get unseen message support
	const { data: conversationMessagesUnSeen } = useConversationMessage_GetByConversationIdQuery({
		conversationId: Number(SupportChatData?.items[0]?.id),
		skip: 0,
		take: 100000,
		where: {
			isSeen: {
				eq: false
			}
		}
	}, {
		enabled: !!SupportChatData?.items[0]?.id
	});
	const conversationMessageDataUnSeen = conversationMessagesUnSeen?.conversationMessage_getByConversationId?.result;

	// set seen message
	const { mutate: seenMessages } = useConversationMessage_SetSeenStatusMutation()

	// ------------------------------------notification subscription
	// notification
	useEffect(() => {
		if (typeof userId !== 'number') return;
		const unSubscribe = subscribe(NotificationDocument, { userId }, subscriptionUnSendMessageListener);

		return () => {
			if (typeof unSubscribe !== 'function') return;

			unSubscribe();
		};
	}, [userId]);

	function subscriptionUnSendMessageListener(event) {
		const data = JSON.parse(event.data);

		if (data.type === 'ka') return;
		const payload: NotificationSubscription = data?.payload?.data;

		if (typeof payload === 'undefined') return;

		queryClient.invalidateQueries(queryKey);
	}

	const internalCHatHandler = () => {
		settingStore.setting = false;
		router.push('/internal-chat');
	};

	// --------------------------------functions
	// update last message data
	useEffect(() => {
		if (lastMessageSubscription) {
			refetchQueries()
		}
	}, [lastMessageSubscription])

	// set messages ids to state
	useEffect(() => {
		if (conversationMessageDataUnSeen) {
			conversationMessageDataUnSeen.items?.map((message) => {
				setMessagesUnSeenIds((prevState) => ([...prevState, message?.id]))
			})
		}
	}, [conversationMessageDataUnSeen])


	const conversationUnseenHandler = () => {
		if (MessagesUnSeenIds.length >= 1) {
			seenMessages(
				{
					ints: MessagesUnSeenIds,
				},
				{
					onSuccess: async (data) => {
						const { status } = responseDestructure(data);
						if (status.code == 1) {
							await setMessagesUnSeenIds([])
							await refetchQueries()
						}
					}
				},
			);
		}
	}

	// refetch queries
	const refetchQueries = async () => {
		await queryClient.invalidateQueries(['supportChat_getList'])
		await queryClient.invalidateQueries(['conversation_getList'])
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	}

	// set notification satte
	const notificationHandler = () => {
		setNotificationState(!notificationState);
	};

	// set support satte
	const supportHandler = async () => {
		await setSupportState(!SupportState);

		if (SupportState) {
			await conversationUnseenHandler()
			await refetchQueries()
		}
	};


	const InternalChatConversationUnSeenListDataLenght = ConversationsUnSeenListData?.items?.map((conversation) =>
		conversation?.numberOfUnreadMessages
	)?.reduce((a, b) =>
		a + b, 0)

	const SupportConversationUnSeenListDataLenght = conversationMessageDataUnSeen?.items?.filter((message) =>
		Number(message?.conversationMember?.userId) !== Number(userId)
	).length

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	return (
		<Header direction={'row'} justifyContent={'end'} alignItems={'center'}>
			<>
				{!router?.pathname?.includes('/admin') && (
					<>

						<Box sx={{ cursor: 'pointer' }} onClick={handelModal}>
							<SearchIcon fill={open ? theme?.palette?.infuuse?.blue100 : theme?.palette?.infuuse?.gray500} />
						</Box>

						<ModalContainer open={open} handleClose={handleClose}>
							<SearchModal handleClose={handleClose} />
						</ModalContainer>
						{/* -------------------------------support */}
						<Tooltip title="Support">
							<Box onClick={supportHandler} sx={{ cursor: 'pointer', ml: 2, position: 'relative' }}>
								{!SupportState && SupportConversationUnSeenListDataLenght >= 1 ? (
									<IconBoxBadge>
										<Typography color={theme?.palette?.common?.white}>
											{SupportConversationUnSeenListDataLenght}
										</Typography>
									</IconBoxBadge>
								) : null}
								<SupportIcon
									fill={
										SupportState
											? theme?.palette?.infuuse.orange300
											: theme?.palette?.infuuse.gray500
									}
								/>
							</Box>
						</Tooltip>
						{SupportState ? <Support supportHandler={supportHandler} SupportChatData={SupportChatData} userId={userId} /> : null}

						{/* -------------------------------contacts */}
						<Tooltip title="Contacts">
							<Box onClick={() => router.push('/contacts')} sx={{ cursor: 'pointer', ml: 2 }}>
								<ContactIcon
									fill={
										router?.pathname.includes('/contacts')
											? theme?.palette?.infuuse.red100
											: theme?.palette?.infuuse.gray500
									}
								/>
							</Box>
						</Tooltip>
						{/* -------------------------------phonebook */}
						<Tooltip title="Phone Book">
							<Box onClick={() => router.push('/phonebook')} sx={{ cursor: 'pointer', ml: 2 }}>
								<PhonebookIcon
									fill={
										router?.pathname.includes('/phonebook')
											? theme?.palette?.infuuse.blueLight600
											: theme?.palette?.infuuse.gray500
									}
								/>
							</Box>
						</Tooltip>
						{/* -------------------------------internal chats */}
						<Tooltip title="Internal Chat">
							<Box onClick={internalCHatHandler} sx={{ cursor: 'pointer', ml: 2, position: 'relative' }}>
								{InternalChatConversationUnSeenListDataLenght >= 1 ? (
									<IconBoxBadge>
										<Typography color={theme?.palette?.common?.white}>
											{InternalChatConversationUnSeenListDataLenght}
										</Typography>
									</IconBoxBadge>
								) : null}
								<InternalChatIcon
									fill={
										router?.pathname.includes('/internal-chat')
											? theme?.palette?.infuuse.porple200
											: theme?.palette?.infuuse.gray500
									}
								/>
							</Box>
						</Tooltip>
						{/* -------------------------------calendar */}
						<Tooltip title="Calendar">
							<Box onClick={() => router.push('/calendar')} sx={{ cursor: 'pointer', ml: 2 }}>
								<CalendarGoogleIcon
									fill={
										router?.pathname.includes('/calendar')
											? {
												fill1: '#1e88e5',
												fill2: '#fbc02d',
												fill3: '#4caf50',
												fill4: '#e53935',
												fill5: '#1565c0',
											}
											: theme?.palette?.infuuse.gray500
									}
								/>
							</Box>
						</Tooltip>
						{/* -------------------------------ticket */}
						<Tooltip title="Ticket">
							<Box onClick={() => router.push('/ticket')} sx={{ cursor: 'pointer', ml: 2 }}>
								<TicketIcon
									fill={
										router?.pathname.includes('/ticket')
											? theme?.palette?.infuuse.blue400
											: theme?.palette?.infuuse.gray500
									}
								/>
							</Box>
						</Tooltip>{' '}
					</>
				)}
			</>

			{/* -------------------------------notification */}
			<Tooltip title="Notification">
				<Box onClick={notificationHandler} sx={{ cursor: 'pointer', ml: 2, position: 'relative' }}>
					{NotificationData?.items?.length && NotificationData?.items?.length > 0 ? (
						<IconBoxBadge>
							<Typography color={theme?.palette?.common?.white}>
								{NotificationData?.items?.length}
							</Typography>
						</IconBoxBadge>
					) : null}
					<NotificationIcon
						fill={
							NotificationData?.items?.length > 0
								? theme?.palette?.infuuse.orange300
								: theme?.palette?.infuuse.gray500
						}
					/>
				</Box>
			</Tooltip>

			{notificationState && (
				<NotificationsBox
					NotificationData={NotificationData}
					setNotificationState={setNotificationState}
				/>
			)}

			{/* -------------------------------setting */}
			<Tooltip title="Setting">
				<Box onClick={() => (settingStore.setting = !setting)} sx={{ cursor: 'pointer', ml: 2 }}>
					<SettingIcon fill={setting ? theme?.palette?.infuuse.green400 : theme?.palette?.infuuse.gray500} />
				</Box>
			</Tooltip>
		</Header>
	);
};

export default MainHeader;

// -------------------------------style
const Header = styled(Stack)({
	width: '100%',
	height: '80px',
});
