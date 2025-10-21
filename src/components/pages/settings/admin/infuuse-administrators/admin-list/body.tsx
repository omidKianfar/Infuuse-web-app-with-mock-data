import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import EditIcon from '@/assets/edit-icon';
import { getFullImageUrl } from '@/utils';
import { useRouter } from 'next/router';
import { StyledTableCell, StyledTableRow } from '../styles';
import ModalContainer from '@/components/atoms/Modal';
import ActiveModal from './modal/active-modal';

interface Props {}

const Body = ({}: Props) => {
	// -------------------------------tools
	const router = useRouter();
	const theme = useTheme();

	// // -------------------------------query
	// // current user
	// const { data: User } = useUser_GetCurrentUserQuery();
	// const CurrentUser = User?.user_getCurrentUser?.result;

	// ------------------------------- functions
	// edit
	const editHandeler = () => {
		router.push({
			pathname: `/admin/infuuse-administrators/detail`,
			query: {
				adminId: Number(1),
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
					<Avatar src={getFullImageUrl('')} width={'42px'} height={'42px'} />

					<Typography fontSize={'14px'} ml={1}>
						{stringSlicer('sam', 25)}
					</Typography>
				</Stack>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{stringSlicer('email@email.com', 25)}</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>status</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>add on</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				{/* {member?.isDeleted ? (
					<Typography fontSize={'14px'} color={theme?.palette?.infuuse?.red100} fontWeight={'bold'}>
						User Deleted
					</Typography>
				) : ( */}
				<>
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
						{/* edit */}
						<Box sx={{ cursor: 'pointer' }} onClick={editHandeler}>
							<EditIcon fill={theme?.palette?.infuuse?.blue100} />
						</Box>

						{/* active */}
						{/* {CurrentUser?.user?.id !== member?.id && (
								<Box sx={{ cursor: 'pointer' }} onClick={handelModal}>
									<UserIcon
										fill={
											member?.isActive
												? theme?.palette?.infuuse?.green200
												: theme?.palette?.infuuse?.orange100
										}
									/>
								</Box>
							)} */}
					</Stack>
				</>
				{/* )} */}
			</StyledTableCell>

			{/* ------------------------------- modals */}
			{/* active member */}
			<ModalContainer open={open} handleClose={handleClose}>
				<ActiveModal handleClose={handleClose} />
			</ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
