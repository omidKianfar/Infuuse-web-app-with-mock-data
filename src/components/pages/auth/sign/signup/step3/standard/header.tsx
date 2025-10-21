import PaymentIcon from '@/assets/payment-icon';
import { Box, Stack, useTheme } from '@mui/material';
import React, { useContext } from 'react';

const HeaderStandard = () => {
	const theme = useTheme();
	// -------------------------------context

	return (
		<Stack
			position={'absolute'}
			left={0}
			top={'-50px'}
			justifyContent={'space-between'}
			alignItems={'center'}
			width={'100%'}
		>
			<Box
				borderRadius={'360px'}
				width={'100px'}
				height={'100px'}
				bgcolor={theme?.palette?.infuuse?.gray200}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				border={`3px solid ${theme?.palette?.infuuse?.gray200}`}
			>
				<Box
					borderRadius={'360px'}
					width={'85px'}
					height={'85px'}
					bgcolor={theme?.palette?.infuuse.blue300}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<PaymentIcon />
				</Box>
			</Box>
		</Stack>
	);
};

export default HeaderStandard;
