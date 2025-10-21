import TagIcon from '@/assets/tag-icon';
import { Box, MenuItem, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Image from '@/components/atoms/Image';

const Header = () => {
	const theme = useTheme();

	const [filterItem, setFilterItem] = useState('AllMessages');
	return (
		<Stack height={'50px'} padding="16px " direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
			<Image src="/images/infuuse-logo.svg" />
		</Stack>
	);
};

export default Header;

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.infuuse?.gray200,
		borderRadius: '16px',
		height: '35px',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,

			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse?.gray200,
			height: '35px',

			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse?.gray200,
			height: '35px',

			// borderRadius: "16px",
		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.gray200,
		},
	},
	'& label.Mui-focused': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'&.MuiFormLabel-root .Mui-disabled': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'& label.Mui-root': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
}));
