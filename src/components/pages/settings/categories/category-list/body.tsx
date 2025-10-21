import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import dayjs from 'dayjs';
import DeleteIcon from '@/assets/delete-icon';
import { Category } from '@/graphql/generated';
import { StyledTableCell, StyledTableRow } from '../styles';
import EditIcon from '@/assets/edit-icon';
import { useRouter } from 'next/router';
import ModalContainer from '@/components/atoms/Modal';
import DeleteModal from './modal/delete-modal';

interface Props {
	category: Category;
}
const Body = ({ category }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	// -------------------------------functions
	// edit
	const editHandler = () => {
		router.push({
			pathname: '/categories/detail',
			query: {
				categoryId: Number(category?.id),
				categoryName: category?.name,
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
				<Typography fontSize={'14px'} ml={1}>
					{stringSlicer(category?.name, 25)}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'} ml={1}>
					{stringSlicer(category?.business?.name, 25)}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(category?.createdDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
					{/* ------------------------------options */}
					{/* edit */}
					<Box sx={{ cursor: 'pointer' }} onClick={editHandler}>
						<EditIcon fill={theme?.palette?.infuuse?.blue100} />
					</Box>

					{/* delete */}
					<Box sx={{ cursor: 'pointer' }} onClick={handelModal}>
						<DeleteIcon />
					</Box>
				</Stack>
			</StyledTableCell>

			{/* ------------------------------- modals */}
			{/* delete tag */}
			<ModalContainer open={open} handleClose={handleClose}>
				<DeleteModal handleClose={handleClose} category={category} />
			</ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
