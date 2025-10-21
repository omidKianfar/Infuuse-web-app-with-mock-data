import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import dayjs from 'dayjs';
import DeleteIcon from '@/assets/delete-icon';
import { Template } from '@/graphql/generated';
import EditIcon from '@/assets/edit-icon';
import { useRouter } from 'next/router';
import { StyledTableCell, StyledTableRow } from '../../styles';
import ModalContainer from '@/components/atoms/Modal';
import DeleteModal from './modal/delete-modal';

interface Props {
	template: Template;
}

const Body = ({ template }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	// -------------------------------address bar router query
	const CategoryId = router?.query?.categoryId;
	const CategoryName = router?.query?.categoryName;

	// -------------------------------functions
	const editHandler = () => {
		router.push({
			pathname: '/templates/template-list/detail',
			query: {
				templateId: Number(template?.id),
				categoryId: CategoryId,
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
					{stringSlicer(template?.title, 25)}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'} ml={1}>
					{stringSlicer(CategoryName, 25)}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(template?.createdDate).format('MM/DD/YYYY')}</Typography>
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
			{/* delete template */}
			<ModalContainer open={open} handleClose={handleClose}>
				<DeleteModal handleClose={handleClose} template={template} />
			</ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
