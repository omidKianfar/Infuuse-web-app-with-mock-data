import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { CartBodyDate } from '../styles';
import TicketIcon from '@/assets/ticket-icon';

interface Props {
	NotificationConvert: any;
}

const TicketNotificationCart = ({ NotificationConvert }: Props) => {
	const theme = useTheme();

	return (
		<CartBodyDate width={'100%'}>
			{NotificationConvert?.ChangeStatus > 0 ? (
				<Stack
					width={'100%'}
					bgcolor={theme?.palette?.infuuse?.gray200}
					p={'8px 16px'}
					borderRadius={2}
					boxShadow={2}
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
						<Box mr={1}>
							<TicketIcon fill={theme?.palette?.infuuse?.blue100} />
						</Box>

						<Typography
							fontSize={'18px'}
							mr={'4px'}
							fontWeight={'bold'}
							color={theme?.palette?.infuuse?.blueDark500}
						>
							Ticket number{' '}
							<span
								style={{
									color: theme?.palette?.infuuse?.blue500,
								}}
							>
								{NotificationConvert?.TicketNumber}{' '}
							</span>
							status changed to{' '}
							<span
								style={{
									color:
										NotificationConvert?.ChangeStatus == 2
											? theme?.palette?.infuuse?.green300
											: theme?.palette?.infuuse?.orange200,
								}}
							>
								{NotificationConvert?.ChangeStatus == 2 ? 'resolved' : 'unresolved'}
							</span>{' '}
						</Typography>
					</Stack>

					<Stack>
						<Typography
							fontSize={'14px'}
							mr={'4px'}
							fontWeight={'bold'}
							color={theme?.palette?.infuuse?.blueDark500}
						>
							Creator:{' '}
							<span style={{ color: theme?.palette?.infuuse?.blue500 }}>
								{NotificationConvert?.Creator?.FullName}
							</span>
						</Typography>
					</Stack>
				</Stack>
			) : (
				<Stack
					width={'100%'}
					bgcolor={theme?.palette?.infuuse?.gray200}
					p={'8px 16px'}
					borderRadius={2}
					boxShadow={2}
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
						<Box mr={1}>
							<TicketIcon fill={theme?.palette?.infuuse?.blue100} />
						</Box>

						{NotificationConvert?.OperationType == 1 ? (
							<Typography
								fontSize={'18px'}
								mr={'4px'}
								fontWeight={'bold'}
								color={theme?.palette?.infuuse?.blueDark500}
							>
								Ticket number{' '}
								<span
									style={{
										color: theme?.palette?.infuuse?.blue500,
									}}
								>
									{NotificationConvert?.TicketNumber}{' '}
								</span>
								<span
									style={{
										color: theme?.palette?.infuuse?.blue100,
									}}
								>
									edited
								</span>{' '}
							</Typography>
						) : (
							<Typography
								fontSize={'18px'}
								mr={'4px'}
								fontWeight={'bold'}
								color={theme?.palette?.infuuse?.blueDark500}
							>
								You have a{' '}
								<span
									style={{
										color: theme?.palette?.infuuse?.green300,
									}}
								>
									new
								</span>{' '}
								ticket number{' '}
								<span
									style={{
										color: theme?.palette?.infuuse?.blue500,
									}}
								>
									{NotificationConvert?.TicketNumber}{' '}
								</span>
							</Typography>
						)}
					</Stack>

					<Stack>
						<Typography
							fontSize={'14px'}
							mr={'4px'}
							fontWeight={'bold'}
							color={theme?.palette?.infuuse?.blueDark500}
						>
							Creator:{' '}
							<span style={{ color: theme?.palette?.infuuse?.blue500 }}>
								{NotificationConvert?.Creator?.FullName}
							</span>
						</Typography>
					</Stack>
				</Stack>
			)}
		</CartBodyDate>
	);
};

export default TicketNotificationCart;
