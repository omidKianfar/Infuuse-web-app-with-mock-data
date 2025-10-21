import LightIcon from '@/assets/light-icon';
import Image from '@/components/atoms/Image';
import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

const Header = () => {
	const theme = useTheme();
	return (
		<Stack direction={'column'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
			<Stack mb={4}>
				<Image src={'/images/infuuse-logo.svg'} style={{ width: '120px' }} />
			</Stack>
			<Typography fontSize={'24px'} color={theme?.palette?.infuuse.blueDark500} fontWeight={'bold'} mb={2} mt={2}>
				Communication For Everyone….{' '}
			</Typography>
			<Typography fontSize={'18px'} color={theme.palette.infuuse.blueLight300} fontWeight={'bold'} mb={2}>
				“Great Communication Begins With Connection.” – Oprah Winfrey{' '}
			</Typography>
			<Stack direction={'row'}>
				<LightIcon />
				<Typography fontSize={'16px'} color={theme?.palette?.infuuse.blueLight400}>
					You will be charged based on the number of team members you wish to add. Only you and your team
					members will be able to use the channels.
				</Typography>
			</Stack>
		</Stack>
	);
};

export default Header;
