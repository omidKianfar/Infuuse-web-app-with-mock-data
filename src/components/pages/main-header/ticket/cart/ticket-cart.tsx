import EditIcon from '@/assets/edit-icon';
import Avatar from '@/components/atoms/avatar';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import { DealStatus, Ticket, TicketStatus, useContact_GetByContactIdQuery } from '@/graphql/generated';
import ticketStore from '@/store/ticket.store';
import { getFullImageUrl } from '@/utils';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';

interface Props {
	ticket?: Ticket;
}

const TicketCart = ({ ticket }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	const TicketId = router?.query?.ticketId;

	const lastWeek = dayjs().subtract(1, 'week');
	const nextWeek = dayjs().add(1, 'week');

	// -------------------------------state managment
	const { ticketSidebar } = useSnapshot(ticketStore);

	// ------------------------------- query
	// contact
	const { data: CurrentContact } = useContact_GetByContactIdQuery({
		contactId: Number(ticket?.contact?.id),
	});

	const CurrentContactData = CurrentContact?.contact_getByContactId?.result;

	const editTicketHandler = (ticket: Ticket) => {
		ticketStore.ticketSidebar = true;
		ticketStore.ticketId = ticket?.id;
	};

	const endMessageRef = useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		endMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		if (TicketId == ticket?.id) {
			scrollToBottom();
		}
	}, [TicketId]);

	return (
		<>
			<div ref={endMessageRef} />
			<Stack
				bgcolor={theme?.palette?.common?.white}
				width={'100%'}
				height={'100%'}
				mb={2}
				p={2}
				borderRadius={2}
				border={TicketId == ticket?.id ? `2px solid ${theme?.palette?.infuuse?.green300}` : 'transparent'}
			>
				{/* ---------------------------------header */}
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'start'}
					flexWrap={'wrap'}
					sx={{ gap: '16px 0' }}
				>
					<Stack
						direction={'row'}
						justifyContent={'start'}
						alignItems={'center'}
						flexWrap={'wrap'}
						sx={{ gap: '16px 0' }}
					>
						{/* ---------------------------------assigned to */}
						<Stack
							direction={'row'}
							justifyContent={'start'}
							alignItems={'center'}
							mr={2}
							flexWrap={'wrap'}
							sx={{ gap: '16px 0' }}
						>
							<Avatar src={getFullImageUrl(ticket?.assignUser?.photoUrl)} />

							<Stack ml={1} flexWrap={'wrap'} sx={{ gap: '16px 0' }}>
								<Typography color={theme?.palette?.infuuse?.blue500}>Assigned To:</Typography>

								<Typography
									color={theme?.palette?.infuuse?.blueDark500}
									title={ticket?.assignUser?.fullName as string}
								>
									{stringSlicer(ticket?.assignUser?.fullName, 30)}
								</Typography>
							</Stack>
						</Stack>

						{/* ---------------------------------created by */}
						<Stack
							direction={'row'}
							justifyContent={'start'}
							alignItems={'center'}
							flexWrap={'wrap'}
							sx={{ gap: '16px 0' }}
						>
							<Avatar src={getFullImageUrl(ticket?.creator?.photoUrl)} />

							<Stack ml={1} flexWrap={'wrap'} sx={{ gap: '16px 0' }}>
								<Typography color={theme?.palette?.infuuse?.blue500}>Created By:</Typography>

								<Typography
									color={theme?.palette?.infuuse?.blueDark500}
									title={ticket?.creator?.fullName as string}
								>
									{stringSlicer(ticket?.creator?.fullName, 30)}
								</Typography>
							</Stack>
						</Stack>
					</Stack>

					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
						<Typography color={theme?.palette?.infuuse?.blueDark500}>TK {ticket?.id}</Typography>
						<Box sx={{ cursor: 'pointer', ml: 2 }} onClick={() => editTicketHandler(ticket as Ticket)}>
							<EditIcon width="28px" height="28px" fill={theme?.palette?.infuuse?.blue100} />
						</Box>
					</Stack>
				</Stack>

				{/* --------------------------------- body */}
				<Stack mt={4}>
					<Typography color={theme?.palette?.infuuse?.blue500} fontSize={'16px'} mb={2}>
						Summery: {ticket?.summary}
					</Typography>

					<Typography color={theme?.palette?.infuuse?.blueDark500} fontSize={'14px'}>
						Description: {ticket?.description}
					</Typography>
				</Stack>
				{/* --------------------------------- footer */}
				<Divider sx={{ my: 2 }} />

				<Stack>
					<Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
							{/* ---------------------------------assigned to */}
							<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} mr={2}>
								<Avatar src={getFullImageUrl(ticket?.contact?.photoUrl)} />

								<Stack ml={1}>
									<Typography color={theme?.palette?.infuuse?.blue500}>
										{stringSlicer(ticket?.contact?.fullName, 30)}
									</Typography>

									<Typography color={theme?.palette?.infuuse?.blueDark500} title="Johnson">
										{CurrentContactData?.dealStatus === DealStatus?.ClosedWon
											? 'Closed Won'
											: CurrentContactData?.dealStatus === DealStatus?.AppointmentScheduled
											? 'Appointment Scheduled'
											: 'Lead'}{' '}
									</Typography>
								</Stack>
							</Stack>
						</Stack>

						<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
							<Box
								sx={{
									bgcolor:
										ticket?.status === TicketStatus?.Resolved
											? 'rgba(37, 211, 102,0.2)'
											: ticket?.status === TicketStatus?.Unresolved &&
											  dayjs(ticket?.endDate) >= dayjs()
											? 'rgba(252, 175, 69,0.2)'
											: 'rgba(255, 51, 51,0.2)',

									color:
										ticket?.status === TicketStatus?.Resolved
											? theme?.palette?.infuuse?.green300
											: ticket?.status === TicketStatus?.Unresolved &&
											  dayjs(ticket?.endDate) >= dayjs()
											? theme?.palette?.infuuse?.orange100
											: theme?.palette?.infuuse?.red300,
									p: '8px 16px',
									borderRadius: 2,
								}}
							>
								{ticket?.status === TicketStatus?.Resolved ? (
									<Typography fontWeight={'bold'}>Done</Typography>
								) : ticket?.status === TicketStatus?.Unresolved &&
								  dayjs(ticket?.endDate) > lastWeek &&
								  dayjs(ticket?.endDate) < dayjs() ? (
									<Box display={'flex'}>
										{timeHoursFormater(ticket?.endDate)}{' '}
										<Typography ml={'4px'} fontWeight={'bold'}>
											ago
										</Typography>
									</Box>
								) : ticket?.status === TicketStatus?.Unresolved &&
								  dayjs(ticket?.endDate) < nextWeek &&
								  dayjs(ticket?.endDate) > dayjs() ? (
									<Box display={'flex'}>
										{timeHoursFormater(ticket?.endDate)}{' '}
										<Typography ml={'4px'} fontWeight={'bold'}>
											later
										</Typography>
									</Box>
								) : (
									<Typography fontWeight={'bold'}>
										{dayjs(ticket?.endDate).format('DD/MM/YYYY')}
									</Typography>
								)}
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
};

export default TicketCart;

export const timeHoursFormater = (date) => {
	const theme = useTheme();
	const date1 = dayjs(date);
	const date2 = dayjs();

	let hours = date2.diff(date1, 'hours');
	const days = Math.floor(hours / 24);
	hours = hours - days * 24;

	let Min = date2.diff(date1, 'minute');
	const hour = Math.floor(hours / 60);
	Min = Min - hour * 60;

	return (
		<>
			{days == 0 ? (
				<>
					{hours == 0 && (
						<Typography fontWeight={'bold'} sx={{ wordBreak: 'keep-all' }}>
							{' '}
							{Min == 0 ? 'Now' : Min == 1 ? `${Min} Minute` : `${Min} Minutes`}
						</Typography>
					)}
					{hours == 1 && (
						<Typography sx={{ wordBreak: 'keep-all' }} fontWeight={'bold'}>
							{hours} Hour{' '}
						</Typography>
					)}
					{hours > 1 && (
						<Typography sx={{ wordBreak: 'keep-all' }} fontWeight={'bold'}>
							{hours} Hours{' '}
						</Typography>
					)}
				</>
			) : days == 1 ? (
				<Typography sx={{ wordBreak: 'keep-all' }} fontWeight={'bold'}>
					{Math.abs(days)} day and {hours == 0 ? '' : hours == 1 ? `${hours} Hour` : `${hours} Hours`}
				</Typography>
			) : (
				<Typography sx={{ wordBreak: 'keep-all' }} fontWeight={'bold'}>
					{Math.abs(days)} days and {hours == 0 ? '' : hours == 1 ? `${hours} Hour` : `${hours}  Hours`}
				</Typography>
			)}
		</>
	);
};
