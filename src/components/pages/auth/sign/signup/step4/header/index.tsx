import Image from '@/components/atoms/Image';
import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

const Header = () => {
	// -------------------------------tools
	const theme = useTheme();

	return (
		<Stack direction={'column'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
			<Stack mb={2}>
				<Image src={'/images/infuuse-logo.svg'} style={{ width: '120px' }} />
			</Stack>
			<Typography fontSize={'24px'} color={theme?.palette?.infuuse.blueDark500} fontWeight={'bold'} mb={2} mt={2}>
				Be On Channels Your Customers Spend Most Of Their Time
			</Typography>
		</Stack>
	);
};

export default Header;
