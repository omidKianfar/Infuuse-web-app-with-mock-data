import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import { StyledTableCell, StyledTableRow } from '@/components/pages/settings/members/styles';
import ModalContainer from '@/components/atoms/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
interface Props {}

const Body = ({}: Props) => {
	// ------------------------------- modal
	const theme = useTheme();

	// ------------------------------- query
	// // accept request
	// const { mutate: acceptRequest } = useBusinessConnectionRequest_AcceptedMutation();

	// // reject request
	// const { mutate: rejectRequest } = useBusinessConnectionRequest_RejectedMutation();

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	// -------------------------------functions
	// accept
	const acceptHandler = () => {
		// acceptRequest(
		// 	{
		// 		entityId: Number(request?.id),
		// 	},
		// 	{
		// 		onSuccess: (data) => {
		// 			const { status } = responseDestructure(data);
		// 			if (status.code == 1) {
		// 				enqueueSnackbar(status.description, { variant: 'success' });
		// 				queryClient.refetchQueries(['business_getListAgencyRequests']);
		// 			} else {
		// 				enqueueSnackbar(status.description, { variant: 'error' });
		// 			}
		// 		},
		// 	}
		// );
	};

	// reject
	const rejecthandler = () => {
		// rejectRequest(
		// 	{
		// 		entityId: Number(request?.id),
		// 	},
		// 	{
		// 		onSuccess: (data) => {
		// 			const { status } = responseDestructure(data);
		// 			if (status.code == 1) {
		// 				enqueueSnackbar(status.description, { variant: 'success' });
		// 				queryClient.refetchQueries(['business_getListAgencyRequests']);
		// 			} else {
		// 				enqueueSnackbar(status.description, { variant: 'error' });
		// 			}
		// 		},
		// 	}
		// );
	};

	return (
		<StyledTableRow onClick={(e) => e.stopPropagation()}>
			<StyledTableCell align="left">
				<Typography fontSize={'14px'} ml={1}>
					+123456789
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'} ml={1}>
					{stringSlicer('email@email.com', 30)}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'} ml={1}>
					{stringSlicer('Sam', 30)}
				</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'} ml={1}>
					Confirmed{' '}
				</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
					{/* ------------------------------options */}
					<Box sx={{ cursor: 'pointer' }} onClick={acceptHandler}>
						<CheckCircleIcon sx={{ fontSize: '32px', fill: theme?.palette?.infuuse?.green200 }} />
					</Box>

					{/* reject */}
					<Box sx={{ cursor: 'pointer' }} onClick={rejecthandler}>
						<DoDisturbIcon sx={{ fontSize: '32px', fill: theme?.palette?.infuuse?.red300 }} />
					</Box>
				</Stack>
			</StyledTableCell>

			<ModalContainer open={open} handleClose={handleClose}></ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
