import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import dayjs from 'dayjs';
import DeleteIcon from '@/assets/delete-icon';
import { TagCategory } from '@/graphql/generated';
import EditIcon from '@/assets/edit-icon';
import { useRouter } from 'next/router';
import { StyledTableCell, StyledTableRow } from '../../styles';
import ModalContainer from '@/components/atoms/Modal';
import DeleteModal from './modal/delete-modal';

interface Props {
	tag: TagCategory;
}
const Body = ({ tag }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	// -------------------------------functions
	const editHandler = () => {
		router.push({
			pathname: '/tags/tag-list/detail',
			query: {
				tagId: Number(tag?.id),
				tagName: tag?.name,
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
					{stringSlicer(tag?.name, 25)}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'} ml={1}>
					{stringSlicer(tag?.category?.name, 25)}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(tag?.createdDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
					{/* ------------------------------options */}

					<Box sx={{ cursor: 'pointer' }} onClick={editHandler}>
						<EditIcon fill={theme?.palette?.infuuse?.blue100} />
					</Box>

					<Box sx={{ cursor: 'pointer' }} onClick={handelModal}>
						<DeleteIcon />
					</Box>
				</Stack>
			</StyledTableCell>

			{/* ------------------------------- modals */}
			{/* delete tag */}
			<ModalContainer open={open} handleClose={handleClose}>
				<DeleteModal handleClose={handleClose} tag={tag} />
			</ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
