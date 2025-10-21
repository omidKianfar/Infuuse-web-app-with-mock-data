import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import EditIcon from '@/assets/edit-icon';
import { getFullImageUrl } from '@/utils';
import { useRouter } from 'next/router';
import { StyledTableCell, StyledTableRow } from '../styles';
import ModalContainer from '@/components/atoms/Modal';
import ActiveModal from './modal/active-modal';
import dayjs from 'dayjs';
import UserIcon from '@/assets/user-icon';
import { NextButton } from '@/components/atoms/Button';

interface Props {}

const Body = ({}: Props) => {
	// -------------------------------tools
	const router = useRouter();
	const theme = useTheme();

	// // -------------------------------query
	// // current user
	// const { data: User } = useUser_GetCurrentUserQuery();
	// const CurrentUser = User?.user_getCurrentUser?.result;

	const seeDetailHandler = () => {
		router?.push({ pathname: '/admin/customer-list/detail' });
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
				<Typography fontSize={'14px'}>{dayjs().format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Tooltip title="Hello! Is the consultation These five tips will help you improve the style, concision, and clarity of your academic English.">
					<Typography fontSize={'14px'}>
						{stringSlicer(
							'Hello! Is the consultation These five tips will help you improve the style, concision, and clarity of your academic English.',
							25
						)}
					</Typography>{' '}
				</Tooltip>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>+99 123 456 78</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}> {stringSlicer('email@email.com', 25)}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Box
					p={'4px 8px'}
					bgcolor={theme?.palette?.infuuse?.green300}
					borderRadius={2}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Typography fontSize={'14px'} color={theme?.palette?.common?.white}>
						Status
					</Typography>
				</Box>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
					{/* ------------------------------options */}
					<NextButton sx={{ height: '36px', borderRadius: '8px' }} onClick={seeDetailHandler}>
						View Chat
					</NextButton>
				</Stack>
			</StyledTableCell>
		</StyledTableRow>
	);
};

export default Body;
