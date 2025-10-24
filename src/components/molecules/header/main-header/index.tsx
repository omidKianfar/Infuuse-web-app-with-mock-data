import {  Stack,  styled } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import settingStore from '@/store/setting.store';
import NotificationsBox from './notification';
import {
	ConversationCollectionSegment,
	NotificationCollectionSegment,
	NotificationDocument,
	NotificationSubscription,
	SortEnumType,
	useConversationMessage_SetSeenStatusMutation,
	useNotification_GetListQuery,
	useSupportChat_GetListQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { subscribe } from '@/utils/subscription';
import { queryClient } from 'pages/_app';
import Support from './items/support/support';
import { responseDestructure } from '@/utils';
import SupportItem from './items/support';
import ContactsItem from './items/contacts';
import PhoneBookItem from './items/phone-book';
import SearchItem from './items/search';
import InternalChatItem from './items/internal-chat';
import CalendarItem from './items/calendar';
import TicketItem from './items/ticket';
import NotificationItem from './items/notification';
import SettingItem from './items/setting';

const MainHeader = () => {
	const router = useRouter();

	const [notificationState, setNotificationState] = useState<boolean>(false);
	const [SupportState, setSupportState] = useState<boolean>(false);
	const [MessagesUnSeenIds, setMessagesUnSeenIds] = useState<number[]>([]);

	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;
	const userId = User?.user_getCurrentUser?.result?.user?.id;

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

	const queryKey = ['notification_getList', queryOptions];

	const { data: notification } = useNotification_GetListQuery(queryOptions);
	const NotificationData = notification?.notification_getList?.result;

	const { mutate: seenMessages } = useConversationMessage_SetSeenStatusMutation();

	const { data: supportChat } = useSupportChat_GetListQuery({
		skip: 0,
		take: 1,
	});

	const SupportChatData = supportChat?.supportChat_getList?.result;

	useEffect(() => {
		if (typeof userId !== 'number') return;
		const unSubscribe = subscribe(NotificationDocument, { userId }, subscriptionUnSendMessageListener);

		return () => {
			if (typeof unSubscribe !== 'function') return;

			unSubscribe();
		};
	}, [userId]);

	function subscriptionUnSendMessageListener(event: MessageEvent) {
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
							await setMessagesUnSeenIds([]);
							await refetchQueries();
						}
					},
				}
			);
		}
	};

	const refetchQueries = async () => {
		await queryClient.invalidateQueries(['supportChat_getList']);
		await queryClient.invalidateQueries(['conversation_getList']);
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId']);
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	};

	const notificationHandler = () => {
		setNotificationState(!notificationState);
	};

	const supportHandler = async () => {
		await setSupportState(!SupportState);

		if (SupportState) {
			await conversationUnseenHandler();
			await refetchQueries();
		}
	};

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
						<SearchItem handelModal={handelModal} handleClose={handleClose} open={open} />
						<SupportItem
							refetchQueries={refetchQueries}
							setMessagesUnSeenIds={setMessagesUnSeenIds}
							supportHandler={supportHandler}
							SupportState={SupportState}
							SupportChatData={SupportChatData as ConversationCollectionSegment}
							userId={userId}
						/>
						<ContactsItem />
						<PhoneBookItem />
						<InternalChatItem internalCHatHandler={internalCHatHandler} userId={userId} />
						<CalendarItem />
						<TicketItem />
					</>
				)}
			</>

			<NotificationItem
				notificationHandler={notificationHandler}
				NotificationData={NotificationData as NotificationCollectionSegment}
			/>

			<SettingItem />

			{SupportState && (
				<Support
					supportHandler={supportHandler}
					SupportChatData={SupportChatData as ConversationCollectionSegment}
					userId={userId}
				/>
			)}

			{notificationState && (
				<NotificationsBox NotificationData={NotificationData as NotificationCollectionSegment} setNotificationState={setNotificationState} />
			)}
		</Header>
	);
};

export default MainHeader;

const Header = styled(Stack)({
	width: '100%',
	height: '80px',
});
