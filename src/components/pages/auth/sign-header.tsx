import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

// -------------------------------props validation
interface Props {
	title?: string;
	description?: string;
}
// -------------------------------
const SignHeader = ({ title, description }: Props) => {
	const theme = useTheme();
	return (
		<Stack direction={'column'} justifyItems={'center'} alignItems={'center'} width={'100%'}>
			{/* -------------------------------title */}
			<Typography mb={1} fontSize={'32px'} fontWeight={600} color={theme?.palette?.infuuse.blueDark500}>
				{title}
			</Typography>

			{/* -------------------------------description */}
			<Typography fontSize={'20px'} color={theme?.palette?.infuuse.blue500} mb={1}>
				{description}
			</Typography>
		</Stack>
	);
};

export default SignHeader;
