import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import dayjs from 'dayjs';
import { Category } from '@/graphql/generated';
import { StyledTableCell, StyledTableRow } from '../styles';
import EditIcon from '@/assets/edit-icon';
import { useRouter } from 'next/router';
import { NextButton } from '@/components/atoms/Button';

interface Props {
	category: Category;
}
const Body = ({ category }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	// -------------------------------functions
	const editHandler = () => {
		router.push({
			pathname: '/tags/tag-list',
			query: {
				categoryId: Number(category?.id),
				categoryName: category?.name,
			},
		});
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

					<NextButton sx={{ height: '36px', borderRadius: '8px' }} onClick={editHandler}>
						View Tags
					</NextButton>
				</Stack>
			</StyledTableCell>
		</StyledTableRow>
	);
};

export default Body;
