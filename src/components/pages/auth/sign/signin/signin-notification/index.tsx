import { Stack, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import Header from './header';
import { NextButton } from '@/components/atoms/Button';
import { useRouter } from 'next/router';
import NoResponsive from '@/components/molecules/no-responsive';
import { Cart, CartBody, CartHeader, No_Notification } from './styles';
import {
	NotificationType,
	SortEnumType,
	useNotification_GetListQuery,
	UserType,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import TicketNotificationCart from './notification-cart/ticket';
import AssignConversationNotificationCart from './notification-cart/assign-conversation';
import { MockData } from './mock-notification';

const SigninNotification = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const router = useRouter();

	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	const { data: notificationUnread } = useNotification_GetListQuery({
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
	});

	const notificationUnreadData = notificationUnread?.notification_getList?.result;

	const finishHandler = async () => {
		CurrentUser?.user?.userType === UserType?.Administrator
			? router?.push('/admin/customer-list')
			: router?.push('/inbox');
	};

	const unreadCount = Array.isArray(notificationUnreadData?.items) && notificationUnreadData.items.length >= 1;

	return (
		<>
			{isMobile ? (
				<NoResponsive />
			) : (
				<Stack bgcolor={theme?.palette?.infuuse.gray100}>
					<Cart direction="row">
						<CartHeader boxShadow="3">
							<Header CurrentUser={CurrentUser} />
							{process.env.NEXT_PUBLIC_MOCK ? (
								<CartBody>
									{MockData.map((notification, index) => {
										const NotificationConvert =
											typeof notification === 'string' ? JSON.parse(notification) : notification;

										return (
											<Stack
												key={index}
												justifyContent="center"
												alignItems="center"
												width="100%"
												p={1}
											>
												<TicketNotificationCart NotificationConvert={NotificationConvert} />
											</Stack>
										);
									})}
								</CartBody>
							) : unreadCount ? (
								<CartBody>
									{Array.isArray(notificationUnreadData?.items) &&
										notificationUnreadData?.items?.map((notification) => {
											let NotificationConvert = {};
											if (notification?.content) {
												try {
													NotificationConvert = JSON.parse(notification?.content);
												} catch (err) {
													console.log('Error: ', err);
												}
											}

											return (
												<Stack
													justifyContent={'center'}
													alignItems={'center'}
													width={'100%'}
													height={'100%'}
													p={1}
												>
													{notification?.type === NotificationType?.Ticket ? (
														<TicketNotificationCart
															NotificationConvert={NotificationConvert}
														/>
													) : notification?.type ===
													  NotificationType?.AssignMemberToConversation ? (
														<AssignConversationNotificationCart
															NotificationConvert={NotificationConvert}
														/>
													) : null}
												</Stack>
											);
										})}
								</CartBody>
							) : (
								<CartBody>
									<No_Notification direction={'row'}>You have no reminders for today</No_Notification>
								</CartBody>
							)}
							<Stack
								direction={'row'}
								justifyContent={'center'}
								alignItems={'center'}
								width={'100%'}
								mt={2}
							>
								<NextButton onClick={finishHandler} sx={{ width: '278px' }}>
									Next
								</NextButton>
							</Stack>
						</CartHeader>
					</Cart>
				</Stack>
			)}
		</>
	);
};

export default SigninNotification;
