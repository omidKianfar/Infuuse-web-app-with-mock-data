import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import dayjs from 'dayjs';
import { getFullImageUrl } from '@/utils';
import EditIcon from '@/assets/edit-icon';
import { StyledTableCell, StyledTableRow } from '@/components/pages/settings/members/styles';
import {  Deal, DealStatus, useContact_GetByContactIdQuery } from '@/graphql/generated';
import ModalContainer from '@/components/atoms/Modal';
import EditContactModal from './modal/edit-contact';

interface Props {
	deal: Deal;
}

const Body = ({ deal }: Props) => {
	// ------------------------------- modal
	const theme = useTheme();

	// ------------------------------- query
	const { data: CurrentContact } = useContact_GetByContactIdQuery({
		contactId: Number(deal?.contact?.id),
	});

	const CurrentContactData = CurrentContact?.contact_getByContactId?.result;

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	return (
		<StyledTableRow onClick={(e) => e.stopPropagation()}>
			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
					<Avatar src={getFullImageUrl(deal?.contact?.photoUrl)} width={'42px'} height={'42px'} />

					<Typography fontSize={'14px'} ml={1}>
						{stringSlicer(deal?.contact?.fullName, 25)}
					</Typography>
				</Stack>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>
					{CurrentContactData?.dealStatus === DealStatus?.ClosedWon
						? 'Closed Won'
						: CurrentContactData?.dealStatus === DealStatus?.AppointmentScheduled
						? 'Appointment Scheduled'
						: 'Lead'}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{deal?.contact?.business?.name}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(deal?.contact?.createdDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
					{/* ------------------------------options */}
					<Box sx={{ cursor: 'pointer' }} onClick={handelModal}>
						<EditIcon width="28px" height="28px" fill={theme?.palette?.infuuse?.blue100} />
					</Box>
				</Stack>
			</StyledTableCell>

			<ModalContainer open={open} handleClose={handleClose}>
				<EditContactModal handleClose={handleClose} deal={deal} />
			</ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
