import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AllChannelTab from '@/components/pages/left-sidebar/inbox/all-channel/allchannel-tab';
import AssignTab from '@/components/pages/left-sidebar/inbox/assign/assign-tab';
import { NotificationDocument, NotificationSubscription, NotificationType, SortEnumType, useNotification_GetListQuery, useNotification_SetReadStatusMutation, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { subscribe } from '@/utils/subscription';
import { queryClient } from 'pages/_app';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';

const InboxSidebar = () => {
	const theme = useTheme();
	const router = useRouter();

	// -------------------------------states
	const [value, setValue] = useState(router?.pathname?.includes('/assign-chats') ? 2 : 1);

	const [notifIds, setNotifIds] = React.useState(null);

	// -------------------------------functions
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;
	const userId = User?.user_getCurrentUser?.result?.user?.id;

	// -------------------------------query options
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
						eq: NotificationType?.AssignMemberToConversation
					}
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

	// -------------------------------query key
	const queryKey = ['notification_getList', queryOptions];

	// -------------------------------query
	// notifications
	const { data: notification } = useNotification_GetListQuery(queryOptions);
	const NotificationData = notification?.notification_getList?.result;

	const { mutate: ReadNotifications } = useNotification_SetReadStatusMutation();

	// ------------------------------notification subscription
	React.useEffect(() => {
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


	// ------------------------------ functions
	// get un read notifications ids
	React.useEffect(() => {
		const ids = [];
		if (notification) {
			NotificationData?.items?.map((notif) => ids?.push(notif?.id));
		}
		setNotifIds(ids);
	}, [notification]);

	// read notifications
	const notificationsRead = () => {
		if (NotificationData?.items?.length > 0) {
			ReadNotifications(
				{
					ids: notifIds,
				},
				{
					onSuccess: (data) => {
						const { status } = responseDestructure(data);
						if (status.code == 1) {
							setNotifIds(null)
							// queryClient.invalidateQueries(queryKey);
							queryClient.invalidateQueries(['notification_getList'])
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
			<Tabs sx={{ width: '100%' }}>
				<Box sx={{ width: '100%' }}>
					<TabContext value={value}>
						{/* -------------------------------tab container */}
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
							{/* -------------------------------tabs */}
							<TabList
								textColor={theme?.palette?.infuuse.blue200}
								width={'100%'}
								TabIndicatorProps={{
									sx: {
										backgroundColor: theme?.palette?.infuuse.blue200,
										height: '3px',
									},
								}}
								onChange={handleChange}
								aria-label="lab API tabs example"
								sx={{ width: '100%' }}
							>
								{/* ------------------------------- tab */}
								<Tab
									sx={{ mr: '40px' }}
									label={
										<Typography
											sx={{
												textTransform: 'none',
												fontSize: value === 1 ? '16px' : '16px',
												fontWeight: value === 1 ? 600 : 400,
												position: 'relative',
												color: theme?.palette?.infuuse.blue200,
											}}
										>
											All Channels
										</Typography>
									}
									value={1}
								>
								</Tab>

								{/* -------------------------------tab */}
								<Tab
									onClick={notificationsRead}
									label={
										<Stack position={'relative'}>
											{NotificationData?.items?.length > 0 &&
												<Box
													bgcolor={theme?.palette?.infuuse?.orange200}
													borderRadius={'360px'}
													p={'2px 8px'}
													display={'flex'}
													justifyContent={'center'}
													alignItems={'center'} position={'absolute'} top={'14px'} right={'-10px'} zIndex={10000}>
													{NotificationData?.items?.length}
												</Box>}

											<Typography
												sx={{
													textTransform: 'none',
													fontSize: value === 2 ? '16px' : '16px',
													fontWeight: value === 2 ? 600 : 400,
													color: theme?.palette?.infuuse.blue200,
												}}
											>
												Assigned
											</Typography>
										</Stack>

									}
									value={2}
								/>
							</TabList>
						</Stack>

						{/* ------------------------------- tabs compnents*/}
						<TabPanel value={1} sx={{ px: 0 }}>
							<AllChannelTab />{' '}
						</TabPanel>

						<TabPanel value={2} sx={{ px: 0 }}>
							<AssignTab />
						</TabPanel>
					</TabContext>
				</Box>
			</Tabs>
		</Stack>
	);
};

export default InboxSidebar;
