import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import dayjs from 'dayjs';
import EditIcon from '@/assets/edit-icon';
import UserIcon from '@/assets/user-icon';
import OnlineBox from '../online-box/online-box';
import { AgencyMember, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { getFullImageUrl } from '@/utils';
import { StyledTableCell, StyledTableRow } from '../styles';
import ModalContainer from '@/components/atoms/Modal';
import ActiveModal from './modal/active-modal';

interface Props {
	member: AgencyMember;
}

const Body = ({ member }: Props) => {
	// -------------------------------tools
	const router = useRouter();
	const theme = useTheme();

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// ------------------------------- functions
	// edit
	const editHandeler = () => {
		router.push({
			pathname: `/members/agency-member-detail`,
			query: {
				memberId: Number(member?.id),
			},
		});
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
					<Avatar src={getFullImageUrl(member?.photoUrl)} width={'42px'} height={'42px'} />

					<Typography fontSize={'14px'} ml={1}>
						{stringSlicer(member?.fullName, 25)}
					</Typography>
				</Stack>
			</StyledTableCell>

			<StyledTableCell align="left">
				<OnlineBox online={member?.isOnline} lineStatus={member?.lineStatus} />{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>
					{member?.lastModifiedDate ? dayjs(member?.lastModifiedDate).format('hh:mm A') : 'Pendding'}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(member?.createdDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				{member?.isDeleted ? (
					<Typography fontSize={'14px'} color={theme?.palette?.infuuse?.red100} fontWeight={'bold'}>
						User Deleted
					</Typography>
				) : (
					<>
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
							{/* edit */}
							<Box sx={{ cursor: 'pointer' }} onClick={editHandeler}>
								<EditIcon fill={theme?.palette?.infuuse?.blue100} />
							</Box>

							{/* active */}

							{CurrentUser?.user?.id !== member?.id && (
								<Box sx={{ cursor: 'pointer' }} onClick={handelModal}>
									<UserIcon
										fill={
											member?.isActive
												? theme?.palette?.infuuse?.green200
												: theme?.palette?.infuuse?.orange100
										}
									/>
								</Box>
							)}
						</Stack>
					</>
				)}
			</StyledTableCell>

			{/* ------------------------------- modals */}
			{/* active member */}
			<ModalContainer open={open} handleClose={handleClose}>
				<ActiveModal handleClose={handleClose} member={member} />
			</ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
