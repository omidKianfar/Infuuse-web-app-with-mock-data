import { Notification } from '@/graphql/generated';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TicketIcon from '@/assets/ticket-icon';
import Avatar from '@/components/atoms/avatar';
import { useRouter } from 'next/router';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import { getFullImageUrl } from '@/utils';

interface Props {
	NotificationConvert: any;
	notificationRead: (id: number) => void;
	notification: Notification;
}

const TicketNotification = ({ NotificationConvert, notificationRead, notification }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	const selectTicket = async (ticketId: number) => {
		await notificationRead(notification?.id as number);

		router?.push({
			pathname: '/ticket',
			query: {
				ticketId: ticketId,
			},
		});
	};

	return (
		<Box border={`2px solid ${theme?.palette?.infuuse?.gray400}`} p={'8px'} borderRadius={2} mb={1} width={'100%'}>
			<>
				{NotificationConvert?.ChangeStatus > 0 ? (
					<Stack>
						<Stack
							direction={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
							flexWrap={'wrap'}
						>
							<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} flexWrap={'wrap'}>
								<Box mr={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
									<TicketIcon height="28px" width="28px" fill={theme?.palette?.infuuse?.blue100} />
								</Box>

								<Box display={'flex'} justifyContent={'center'} alignItems={'center'} pt={'6px'}>
									<Typography
										color={theme?.palette?.infuuse?.blueDark500}
										fontWeight={'bold'}
										fontSize={'14px'}
									>
										Ticket Number:{' '}
										<span style={{ color: theme?.palette?.infuuse?.blue500 }}>
											{NotificationConvert?.TicketNumber}
										</span>
									</Typography>
								</Box>
							</Stack>

							<Box
								onClick={() => notificationRead(notification?.id as number)}
								display={'flex'}
								justifyContent={'center'}
								alignItems={'center'}
								pt={'6px'}
								sx={{ cursor: 'pointer' }}
							>
								<CloseIcon />
							</Box>
						</Stack>

						<Divider sx={{ color: theme?.palette?.infuuse?.gray100, mb: 1, mt: 1 }} />

						<Stack
							onClick={() => selectTicket(NotificationConvert?.TicketNumber)}
							sx={{ cursor: 'pointer' }}
						>
							<Typography
								color={theme?.palette?.infuuse?.blueDark500}
								fontWeight={'bold'}
								fontSize={'14px'}
							>
								Status changed to{' '}
								<span
									style={{
										color:
											NotificationConvert?.ChangeStatus == 2
												? theme?.palette?.infuuse?.green300
												: theme?.palette?.infuuse?.orange100,
									}}
								>
									{NotificationConvert?.ChangeStatus == 2 ? 'resolved' : 'unresolved'}
								</span>
							</Typography>
						</Stack>
					</Stack>
				) : (
					<>
						<Stack
							direction={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
							flexWrap={'wrap'}
						>
							<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} flexWrap={'wrap'}>
								<Box mr={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
									<TicketIcon height="28px" width="28px" fill={theme?.palette?.infuuse?.blue100} />
								</Box>

								<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
									{NotificationConvert?.OperationType == 1 ? (
										<Typography
											color={theme?.palette?.infuuse?.blueDark500}
											mr={'4px'}
											fontWeight={'bold'}
										>
											Ticket number{' '}
											<span
												style={{
													color: theme?.palette?.infuuse?.blue500,
												}}
											>
												{NotificationConvert?.TicketNumber}
											</span>{' '}
											edited
										</Typography>
									) : (
										<>
											<span
												style={{
													marginRight: '8px',
													color: theme?.palette?.infuuse?.blueDark500,
													fontWeight: 'bold',
												}}
											>
												Ticket number:
											</span>
											<Typography
												color={theme?.palette?.infuuse?.blue500}
												mr={1}
												fontWeight={'bold'}
											>
												{NotificationConvert?.TicketNumber}
											</Typography>
										</>
									)}{' '}
								</Stack>
							</Stack>

							<Box
								onClick={() => notificationRead(notification?.id as number)}
								display={'flex'}
								justifyContent={'center'}
								alignItems={'center'}
								pt={'6px'}
								sx={{ cursor: 'pointer' }}
							>
								<CloseIcon />
							</Box>
						</Stack>

						<Divider sx={{ color: theme?.palette?.infuuse?.gray100, mb: 1, mt: 1 }} />

						<Stack
							onClick={() => selectTicket(NotificationConvert?.TicketNumber)}
							sx={{ cursor: 'pointer' }}
						>
							<Stack mb={1}>
								{NotificationConvert?.Creator && (
									<Stack
										direction={'row'}
										justifyContent={'start'}
										alignItems={'center'}
										flexWrap={'wrap'}
										mb={1}
									>
										<Avatar src={getFullImageUrl(NotificationConvert?.Creator?.PhotoUrl)} />
										<Typography
											color={theme?.palette?.infuuse?.blueDark500}
											fontWeight={'bold'}
											fontSize={'14px'}
											ml={1}
										>
											{NotificationConvert?.Creator?.FullName}
										</Typography>
									</Stack>
								)}

								{NotificationConvert?.Contact && (
									<Stack
										direction={'row'}
										justifyContent={'start'}
										alignItems={'center'}
										flexWrap={'wrap'}
										mb={1}
									>
										<Avatar src={getFullImageUrl(NotificationConvert?.Contact?.PhotoUrl)} />
										<Typography
											color={theme?.palette?.infuuse?.blueDark500}
											fontWeight={'bold'}
											fontSize={'14px'}
											ml={1}
										>
											{NotificationConvert?.Creator?.FullName}
										</Typography>
									</Stack>
								)}
							</Stack>

							<Stack mb={1}>
								<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
									<span
										style={{
											marginRight: '8px',
											color: theme?.palette?.infuuse?.blueDark500,
											fontWeight: 'bold',
										}}
									>
										Summery:
									</span>

									<Typography color={theme?.palette?.infuuse?.blue500} mr={1} fontWeight={'bold'}>
										{stringSlicer(NotificationConvert?.Summary, 50)}
									</Typography>
								</Stack>
							</Stack>

							<Stack >
								<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} mb={1}>
									<span
										style={{
											marginRight: '8px',
											color: theme?.palette?.infuuse?.blueDark500,
											fontWeight: 'bold',
										}}
									>
										Start:
									</span>

									<Typography color={theme?.palette?.infuuse?.blue500} mr={1} fontWeight={'bold'}>
										{dayjs(NotificationConvert?.StartDate).format('MM/DD/YYYY hh:mm A')}
									</Typography>
								</Stack>

								<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
									<span
										style={{
											marginRight: '8px',
											color: theme?.palette?.infuuse?.blueDark500,
											fontWeight: 'bold',
										}}
									>
										End:
									</span>

									<Typography color={theme?.palette?.infuuse?.blue500} mr={1} fontWeight={'bold'}>
										{dayjs(NotificationConvert?.EndDate).format('MM/DD/YYYY hh:mm A')}
									</Typography>
								</Stack>
							</Stack>
						</Stack>
					</>
				)}
			</>
		</Box>
	);
};

export default TicketNotification;
