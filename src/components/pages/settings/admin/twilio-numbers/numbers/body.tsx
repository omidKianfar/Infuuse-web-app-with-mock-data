import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import DeleteIcon from '@/assets/delete-icon';
import { TwilioPhoneNumber } from '@/graphql/generated';
import EditIcon from '@/assets/edit-icon';
import ModalContainer from '@/components/atoms/Modal';
import { StyledTableCell, StyledTableRow } from '../styles';
import EditTwilioNumbersModal from './modal/twilio-edit-modal';
import DeleteTwilioNumbersModal from './modal/twilio-delete-modal';

interface Props {
	TwilioNumber: TwilioPhoneNumber;
}
const Body = ({ TwilioNumber }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);
	const [counter, setCounter] = React.useState(0);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = (num: number) => {
		setCounter(num);
		handleOpen();
	};

	return (
		<StyledTableRow onClick={(e) => e.stopPropagation()}>
			<StyledTableCell align="left">
				<Typography fontSize={'14px'} ml={1}>
					{TwilioNumber?.phoneNumber}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'} ml={1}>
					{stringSlicer(TwilioNumber?.business?.name, 30)}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'} ml={1}>
					{TwilioNumber?.isSold ? 'Is Sold' : 'Not Sold'}
				</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
					{/* ------------------------------options */}
					{/* edit */}
					<Box sx={{ cursor: 'pointer' }} onClick={() => handelModal(1)}>
						<EditIcon fill={theme?.palette?.infuuse?.blue100} />
					</Box>

					{/* delete */}
					<Box sx={{ cursor: 'pointer' }} onClick={() => handelModal(2)}>
						<DeleteIcon />
					</Box>
				</Stack>
			</StyledTableCell>

			{/* ------------------------------- modals */}
			<ModalContainer open={open} handleClose={handleClose}>
				{counter === 1 ? (
					<EditTwilioNumbersModal
						handleClose={handleClose}
						TwilioNumber={TwilioNumber as TwilioPhoneNumber}
					/>
				) : counter === 2 ? (
					<DeleteTwilioNumbersModal
						handleClose={handleClose}
						TwilioNumber={TwilioNumber as TwilioPhoneNumber}
					/>
				) : null}
			</ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
