import { Box, Rating, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import { getFullImageUrl } from '@/utils';
import { useRouter } from 'next/router';
import { StyledTableCell, StyledTableRow } from '../styles';
import dayjs from 'dayjs';
import { NextButton } from '@/components/atoms/Button';
import StarGoldIcon from '@/assets/star-gold-icon';
import StarEmptyIcon from '@/assets/star-emty-icon';

interface Props {}

const Body = ({}: Props) => {
	// -------------------------------tools
	const router = useRouter();
	const theme = useTheme();

	// // -------------------------------query
	// // current user
	// const { data: User } = useUser_GetCurrentUserQuery();
	// const CurrentUser = User?.user_getCurrentUser?.result;

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
				<Typography fontSize={'14px'}>{dayjs().format('MM/DD/YYYY')}</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
					<Avatar src={getFullImageUrl('')} width={'42px'} height={'42px'} />

					<Typography fontSize={'14px'} ml={1}>
						{stringSlicer('sam', 25)}
					</Typography>
				</Stack>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Tooltip title={'comment'}>
					<Typography fontSize={'14px'}> {stringSlicer('comment', 25)}</Typography>
				</Tooltip>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>
					<Rating
						name="size-large"
						value={5}
						readOnly
						icon={
							<Box mr={2}>
								<StarGoldIcon width="18px" height="18px" />
							</Box>
						}
						emptyIcon={
							<Box mr={2}>
								<StarEmptyIcon width="18px" height="18px" />
							</Box>
						}
					/>
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>
					<Avatar src={getFullImageUrl('')} width={'42px'} height={'42px'} />
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
					<NextButton>View Chat</NextButton>
				</Stack>
			</StyledTableCell>
		</StyledTableRow>
	);
};

export default Body;
