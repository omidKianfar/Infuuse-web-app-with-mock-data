import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import EditIcon from '@/assets/edit-icon';
import { getFullImageUrl } from '@/utils';
import { useRouter } from 'next/router';
import { StyledTableCell, StyledTableRow } from '../../styles';
import ModalContainer from '@/components/atoms/Modal';
import ActiveModal from './modal/active-modal';
import dayjs from 'dayjs';
import UserIcon from '@/assets/user-icon';
import { AccountStatus, AgencyAdminDto } from '@/graphql/generated';

interface Props {
	agency: AgencyAdminDto;
}

const Body = ({ agency }: Props) => {
	// -------------------------------tools
	const router = useRouter();
	const theme = useTheme();

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	const seeDetailHandler = () => {
		router?.push({
			pathname: '/admin/customer-list/agency-detail',
			query: {
				agencyId: agency?.agency?.id,
			},
		});
	};

	return (
		<StyledTableRow onClick={(e) => e.stopPropagation()}>
			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
					<Avatar src={getFullImageUrl(agency?.agency?.logo)} width={'42px'} height={'42px'} />

					<Typography fontSize={'14px'} ml={1}>
						{stringSlicer(agency?.agency?.name, 25)}
					</Typography>
				</Stack>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{stringSlicer(agency?.agencyOwner?.email, 25)}</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{/* Annual */}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(agency?.agency?.createdDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				{agency?.agency?.isDeleted ? (
					<Typography fontSize={'14px'} color={theme?.palette?.infuuse?.red100} fontWeight={'bold'}>
						Business Deleted
					</Typography>
				) : (
					<>
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
							<Box sx={{ cursor: 'pointer' }} onClick={seeDetailHandler}>
								<EditIcon width="28px" height="28px" fill={theme?.palette?.infuuse?.blue100} />
							</Box>

							{/* active */}
							<Box sx={{ cursor: 'pointer' }} onClick={handelModal}>
								<Tooltip
									title={agency?.agency?.status === AccountStatus?.Active ? 'Active' : 'Deactive'}
								>
									<UserIcon
										fill={
											agency?.agency?.status === AccountStatus?.Active
												? theme?.palette?.infuuse?.green300
												: theme?.palette?.infuuse?.orange200
										}
									/>
								</Tooltip>
							</Box>
						</Stack>
					</>
				)}
			</StyledTableCell>

			{/* ------------------------------- modals */}
			{/* active member */}
			<ModalContainer open={open} handleClose={handleClose}>
				<ActiveModal handleClose={handleClose} agency={agency} />
			</ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
