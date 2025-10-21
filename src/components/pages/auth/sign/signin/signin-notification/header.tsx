import Image from '@/components/atoms/Image';
import { UserDto } from '@/graphql/generated';
import { Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
	CurrentUser: UserDto;
}

const Header = ({ CurrentUser }: Props) => {
	const theme = useTheme();

	const currentTime = dayjs().format('HH');
	return (
		<Stack direction={'column'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
			<Stack mb={1}>
				<Image src={'/images/infuuse-logo.svg'} style={{ width: '120px' }} />
			</Stack>
			<Typography fontSize={'24px'} color={theme?.palette?.infuuse.blueDark500} mb={1}>
				{currentTime <= 12
					? 'Good Morning'
					: currentTime > 12 && currentTime <= 17
					? 'Good Afternoon'
					: currentTime > 17 && currentTime <= 19
					? 'Good Evening'
					: 'Good Night'}
				, {CurrentUser?.user?.fullName ? CurrentUser?.user?.fullName : CurrentUser?.user?.email}
			</Typography>
			<Typography fontSize={'24px'} color={theme.palette.infuuse.blueLight300} mb={4}>
				Here Is What Your Day Looks Like Today
			</Typography>
		</Stack>
	);
};

export default Header;
