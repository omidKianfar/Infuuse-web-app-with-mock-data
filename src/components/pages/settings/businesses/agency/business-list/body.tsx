import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import dayjs from 'dayjs';
import DeleteIcon from '@/assets/delete-icon';
import { AccountStatus, AgencyMemberAssignment, AgencyMemberAssignmentStatus } from '@/graphql/generated';
import { getFullImageUrl } from '@/utils';
import { CutomSatatusTypography, StyledTableCell, StyledTableRow } from '../../styles';
import ColorBox from './color-box';

import ModalContainer from '@/components/atoms/Modal';
import DeleteModal from './modal/delete-modal';

interface Props {
	request: AgencyMemberAssignment;
}

const Body = ({ request }: Props) => {
	const theme = useTheme();

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
					<Avatar src={getFullImageUrl(request?.businessMember?.photoUrl)} width={'42px'} height={'42px'} />

					<Typography fontSize={'14px'} ml={1}>
						{stringSlicer(request?.business?.name, 25)}
					</Typography>
				</Stack>
			</StyledTableCell>

			<StyledTableCell align="left">
				<ColorBox color={request?.colorTag} />
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{stringSlicer(request?.businessMember?.email, 25)}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(request?.createdDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				{request?.business?.status === AccountStatus?.Suspended ? (
					<Typography color={theme?.palette?.infuuse?.red300} fontWeight={'bold'}>
						Deactived
					</Typography>
				) : (
					<CutomSatatusTypography status={request?.status}>
						{request?.status === AgencyMemberAssignmentStatus?.Pending
							? 'Pendding'
							: request?.status === AgencyMemberAssignmentStatus?.Approved
							? 'Approved'
							: request?.status === AgencyMemberAssignmentStatus?.Rejected
							? 'Rejected'
							: 'Canceled'}
					</CutomSatatusTypography>
				)}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
					{/* ------------------------------options */}

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
