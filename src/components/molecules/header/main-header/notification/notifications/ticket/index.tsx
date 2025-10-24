import { Box, useTheme } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import { NotificationProps } from '../../../type';
import NewTicket from './new-ticket';
import EditedTicket from './edited-ticket';



const TicketNotification = ({ NotificationConvert, notificationRead, notification }: Partial<NotificationProps>) => {
	const theme = useTheme();
	const router = useRouter();

	const selectTicket = async (ticketId: number) => {
		await notificationRead?.(notification?.id as number);

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
					<NewTicket notificationRead={notificationRead} NotificationConvert={NotificationConvert} notification={notification} selectTicket={selectTicket} />
				) : (
					<EditedTicket NotificationConvert={NotificationConvert} notificationRead={notificationRead} notification={notification} selectTicket={selectTicket} />
				)}
			</>
		</Box>
	);
};

export default TicketNotification;
