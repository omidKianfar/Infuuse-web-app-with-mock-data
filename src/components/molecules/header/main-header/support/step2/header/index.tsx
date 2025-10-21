import SupportBackIcon from '@/assets/support-back-icon';
import SupportIcon from '@/assets/support-icon';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
	setCounter: Dispatch<SetStateAction<number>>;
}

const Header = ({ setCounter }: Props) => {
	const theme = useTheme();

	return (
		<Stack bgcolor={theme?.palette?.infuuse?.blueDark200} height={'100px'} p={1}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'} height={'100%'}>
				<Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
					<SupportIcon fill={theme?.palette?.infuuse?.orange100} />
				</Box>

				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} pr={2} pt={1}>
					<Box
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						onClick={() => setCounter(0)}
						sx={{ cursor: 'pointer' }}
						mr={1}
					>
						<SupportBackIcon />
					</Box>
					<Typography color={theme?.palette?.common?.white} fontWeight={'bold'}>
						Support
					</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Header;
