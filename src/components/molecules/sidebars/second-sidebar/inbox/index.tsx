import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AllChannelTab from '@/components/pages/left-sidebar/inbox/all-channel/allchannel-tab';
import AssignTab from '@/components/pages/left-sidebar/inbox/assign/assign-tab';
import {
	NotificationDocument,
	NotificationSubscription,
	NotificationType,
	SortEnumType,
	useNotification_GetListQuery,
	useNotification_SetReadStatusMutation,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { subscribe } from '@/utils/subscription';
import { queryClient } from 'pages/_app';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';

const InboxSidebar = () => {
	const theme = useTheme();
	const router = useRouter();

	const [value, setValue] = useState(router?.pathname?.includes('/assign-chats') ? '2' : '1');

	const [notifIds, setNotifIds] = React.useState<number[] | null>(null);

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const { data: User } = useUser_GetCurrentUserQuery();
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
					type: {
						eq: NotificationType?.AssignMemberToConversation,
					},
				},
				{
					userId: {
						eq: Number(userId),
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

	const { mutate: ReadNotifications } = useNotification_SetReadStatusMutation();

	React.useEffect(() => {
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

	React.useEffect(() => {
		const ids: number[] = [];
		if (notification) {
			NotificationData?.items?.map((notif) => ids?.push(notif?.id as number));
		}
		setNotifIds(ids);
	}, [notification]);

	const notificationLength = NotificationData?.items?.length || 0;

	const notificationsRead = () => {
		if (notificationLength > 0) {
			ReadNotifications(
				{
					ids: notifIds,
				},
				{
					onSuccess: (data) => {
						const { status } = responseDestructure(data);
						if (status.code == 1) {
							setNotifIds(null);
							queryClient.invalidateQueries(['notification_getList']);
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}
	};

	return (
		<Stack>
			<TabContext value={value}>
				<Stack width="100%">
					<TabList
						onChange={handleChange}
						aria-label="inbox tabs"
						TabIndicatorProps={{
							sx: {
								backgroundColor: theme?.palette?.infuuse.blue200,
								height: '3px',
							},
						}}
					>
						<Tab
							value="1"
							label={
								<Typography
									sx={{
										fontWeight: value === '1' ? 600 : 400,
										color: theme?.palette?.infuuse.blue200,
										textTransform: 'none',
									}}
								>
									All Channels
								</Typography>
							}
						/>

						<Tab
							value="2"
							onClick={notificationsRead}
							label={
								<Stack position="relative">
									{notificationLength > 0 && (
										<Box
											bgcolor={theme?.palette?.infuuse.orange200}
											borderRadius="360px"
											p="2px 8px"
											position="absolute"
											top="14px"
											right="-10px"
										>
											{notificationLength}
										</Box>
									)}

									<Typography
										sx={{
											fontWeight: value === '2' ? 600 : 400,
											color: theme?.palette?.infuuse.blue200,
											textTransform: 'none',
										}}
									>
										Assigned
									</Typography>
								</Stack>
							}
						/>
					</TabList>

					<TabPanel value="1" sx={{ p: 0 }}>
						<AllChannelTab />
					</TabPanel>

					<TabPanel value="2" sx={{ p: 0 }}>
						<AssignTab />
					</TabPanel>
				</Stack>
			</TabContext>
		</Stack>
	);
};

export default InboxSidebar;
