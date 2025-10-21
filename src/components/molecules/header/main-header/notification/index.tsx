import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import {
	NotificationCollectionSegment,
	NotificationType,
	useNotification_SetReadStatusMutation,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import CloseIconBox from '@/assets/close-icon-box';
import TicketNotification from './ticket';
import AssignMemberNotification from './assign-member';

interface Props {
	NotificationData: NotificationCollectionSegment;
	setNotificationState: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationsBox = ({ setNotificationState, NotificationData }: Props) => {
	// ------------------------------------tools
	const theme = useTheme();

	// ------------------------------------state
	const [notifIds, setNotifIds] = React.useState(null);

	// ------------------------------------query
	const { mutate: ReadNotifications } = useNotification_SetReadStatusMutation();

	// ------------------------------------functions
	React.useEffect(() => {
		const ids = [];
		if (NotificationData) {
			NotificationData?.items?.map((notif) => ids?.push(notif?.id));
		}
		setNotifIds(ids);
	}, [NotificationData]);

	const notificationsRead = () => {
		ReadNotifications(
			{
				ids: notifIds,
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						// enqueueSnackbar(status.description, { variant: 'success' });
						queryClient.invalidateQueries(['notification_getList'])
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	const notificationRead = (id: number) => {
		ReadNotifications(
			{
				ids: [id],
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						// enqueueSnackbar(status.description, { variant: 'success' });
						queryClient.invalidateQueries(['notification_getList'])
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<>
			{NotificationData && NotificationData?.items?.length > 0 ? (
				<Stack
					position={'absolute'}
					top={'70px'}
					right={'32px'}
					height={'100%'}
					maxHeight={'350px'}
					overflow={'auto'}
					width={'400px'}
					bgcolor={theme?.palette?.common?.white}
					p={'12px '}
					borderRadius={4}
					zIndex={10000}
					boxShadow={4}
				>
					<Stack mb={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
							<Stack mr={1} ml={1} fontWeight={'bold'}>
								Notifications
							</Stack>
							<Button
								onClick={notificationsRead}
								sx={{
									fontSize: '14px',
									borderRadius: 2,
									color: theme?.palette?.infuuse?.blue500,
								}}
							>
								Read All
							</Button>
						</Stack>

						<Box sx={{ cursor: 'pointer' }} onClick={() => setNotificationState(false)}>
							<CloseIconBox />
						</Box>
					</Stack>

					{NotificationData?.items?.map((notification) => {
						const NotificationConvert = JSON.parse(notification?.content);
						console.log('NotificationConvert', NotificationConvert);

						return (
							<Stack>
								{notification?.type === NotificationType?.Ticket ? (
									<TicketNotification
										NotificationConvert={NotificationConvert}
										notificationRead={notificationRead}
										notification={notification}
									/>
								) : notification?.type === NotificationType?.AssignMemberToConversation
									? <AssignMemberNotification
										NotificationConvert={NotificationConvert}
										notificationRead={notificationRead}
										notification={notification}
									/> : null
								}
							</Stack>
						);
					})}
				</Stack>
			) : (
				<Stack
					position={'absolute'}
					top={'70px'}
					right={'32px'}
					height={'100%'}
					maxHeight={'150px'}
					overflow={'auto'}
					width={'400px'}
					bgcolor={theme?.palette?.common?.white}
					p={'12px '}
					borderRadius={4}
					zIndex={10000}
					boxShadow={4}
				>
					<Stack mb={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
						<Stack mr={1} ml={1} fontWeight={'bold'}>
							Notifications
						</Stack>

						<Box sx={{ cursor: 'pointer' }} onClick={() => setNotificationState(false)}>
							<CloseIconBox />
						</Box>
					</Stack>

					<Stack justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'}>
						<Typography color={theme?.palette?.infuuse?.blueDark500} fontWeight={'bold'} fontSize={'20px'}>
							No Notification
						</Typography>
					</Stack>
				</Stack>
			)}
		</>
	);
};

export default NotificationsBox;
