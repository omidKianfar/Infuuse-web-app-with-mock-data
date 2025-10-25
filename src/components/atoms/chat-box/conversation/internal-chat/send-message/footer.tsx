import { useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
	message: any;
}

const Footer = ({ message }: Props) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUserId = User?.user_getCurrentUser?.result?.user?.id

	return (
		<Stack
			direction={isMobile ? 'column' : 'row'}
			justifyContent={
				Number(CurrentUserId) === Number(message?.conversationMember?.user?.id)
					? 'end'
					: 'start'
			}
			alignItems={'center'}
			width={'100%'}
			pl={
				isMobile
					? 0
					: Number(CurrentUserId) !== Number(message?.conversationMember?.user?.id)
						? 0
						: '40px'
			}
			pr={
				isMobile
					? 0
					: Number(CurrentUserId) === Number(message?.conversationMember?.user?.id)
						? '40px'
						: 0
			}
		>
			<Typography fontSize={'14px'} color={theme?.palette?.infuuse?.blue500} mr={2}>
				{message?.conversationMember?.user?.fullName
					? message?.conversationMember?.user?.fullName
					: message?.conversationMember?.user?.email}
			</Typography>

			<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
				<Typography fontSize={'14px'} color={theme?.palette?.infuuse?.blue500} mr={2}>
					{dayjs(message?.createdDate).format('MM/DD/YYYY')}
				</Typography>

				<Typography fontSize={'14px'} color={theme?.palette?.infuuse?.blue500}>
					{dayjs(message?.createdDate).format('hh:mm A')}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default Footer;
