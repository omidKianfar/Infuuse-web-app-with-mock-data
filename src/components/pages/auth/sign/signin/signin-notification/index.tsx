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
	const mockData = true;
	// -------------------------------tools
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const router = useRouter();

	// -------------------------------query
	// current user
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

	return (
		<>
			{isMobile ? (
				// ------------------------------- No responsive
				<NoResponsive />
			) : (
				<Stack bgcolor={theme?.palette?.infuuse.gray100}>
					<Cart direction="row">
						<CartHeader boxShadow="3">
							{/*------------------------------- header*/}
							<Header CurrentUser={CurrentUser} />

							{/*------------------------------- body*/}
							{mockData ? (
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
							) : notificationUnreadData?.items?.length >= 1 ? (
								<CartBody>
									{notificationUnreadData?.items?.map((notification) => {
										const NotificationConvert = JSON.parse(notification?.content);

										return (
											<Stack
												justifyContent={'center'}
												alignItems={'center'}
												width={'100%'}
												height={'100%'}
												p={1}
											>
												{notification?.type === NotificationType?.Ticket ? (
													<TicketNotificationCart NotificationConvert={NotificationConvert} />
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

							{/* -------------------------------button */}
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
