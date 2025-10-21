import Avatar from '@/components/atoms/avatar';
import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';

const HeaderCreateContact = () => {
	const theme = useTheme();

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
				bgcolor={theme?.palette?.infuuse?.gray100}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				border={`3px solid ${theme?.palette?.infuuse?.gray100}`}
			>
				<Avatar width={'85px'} height={'85px'} />
			</Box>
		</Stack>
	);
};

export default HeaderCreateContact;
