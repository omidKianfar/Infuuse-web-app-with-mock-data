import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import dayjs from 'dayjs';
import DeleteIcon from '@/assets/delete-icon';
import {
	AgencyMemberAssignment,
	AgencyMemberAssignmentStatus,
	useBusinessConnectionRequest_AcceptedMutation,
	useBusinessConnectionRequest_RejectedMutation,
} from '@/graphql/generated';
import { getFullImageUrl, responseDestructure } from '@/utils';
import { CutomSatatusTypography, StyledTableCell, StyledTableRow } from '../../styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import ModalContainer from '@/components/atoms/Modal';
import DeleteModal from './modal/delete-modal';

interface Props {
	request: AgencyMemberAssignment;
}

const Body = ({ request }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const queryClient = useQueryClient();

	// -------------------------------query

	// accept request
	const { mutate: acceptRequest } = useBusinessConnectionRequest_AcceptedMutation();

	// reject request
	const { mutate: rejectRequest } = useBusinessConnectionRequest_RejectedMutation();

	// -------------------------------functions
	// accept
	const acceptHandler = () => {
		acceptRequest(
			{
				entityId: Number(request?.id),
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						queryClient.refetchQueries(['business_getListAgencyRequests']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	// reject
	const rejecthandler = () => {
		rejectRequest(
			{
				entityId: Number(request?.id),
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						queryClient.refetchQueries(['business_getListAgencyRequests']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

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
					<Avatar src={getFullImageUrl(request?.agencyMember?.photoUrl)} width={'42px'} height={'42px'} />

					<Typography fontSize={'14px'} ml={1}>
						{stringSlicer(request?.agencyMember?.fullName, 25)}
					</Typography>
				</Stack>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{stringSlicer(request?.agencyMember?.email, 25)}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(request?.createdDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<CutomSatatusTypography status={request?.status}>
					{request?.status === AgencyMemberAssignmentStatus?.Pending
						? 'Pendding'
						: request?.status === AgencyMemberAssignmentStatus?.Approved
						? 'Approved'
						: request?.status === AgencyMemberAssignmentStatus?.Rejected
						? 'Rejected'
						: 'Canceled'}
				</CutomSatatusTypography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
					{/* ------------------------------options */}
					{request?.status === AgencyMemberAssignmentStatus?.Pending && (
						<>
							{/* accept */}
							<Box sx={{ cursor: 'pointer' }} onClick={acceptHandler}>
								<CheckCircleIcon sx={{ fontSize: '32px', fill: theme?.palette?.infuuse?.green200 }} />
							</Box>

							{/* reject */}
							<Box sx={{ cursor: 'pointer' }} onClick={rejecthandler}>
								<DoDisturbIcon sx={{ fontSize: '32px', fill: theme?.palette?.infuuse?.red300 }} />
							</Box>
						</>
					)}

					{/* cancel */}
					<Box sx={{ cursor: 'pointer' }} onClick={handelModal}>
						<DeleteIcon width="28px" height="28px" />
					</Box>
				</Stack>
			</StyledTableCell>

			{/* ------------------------------- modals */}
			{/* delete business request */}
			<ModalContainer open={open} handleClose={handleClose}>
				<DeleteModal handleClose={handleClose} request={request} />
			</ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
