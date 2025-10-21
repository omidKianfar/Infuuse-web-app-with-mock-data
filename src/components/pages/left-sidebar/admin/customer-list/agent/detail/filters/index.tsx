import SearchIcon from '@/assets/search-icon';
import { NextButton } from '@/components/atoms/Button';
import { Box, InputAdornment, MenuItem, Stack, styled, TextField, Typography } from '@mui/material';
import React from 'react';

interface Props {
	searchData: string;
	setSearchData: React.Dispatch<React.SetStateAction<string>>;
	StatusFilter: string;
	setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filters = ({ searchData, setSearchData, StatusFilter, setStatusFilter }: Props) => {
	const clearFiltersHandler = () => {
		setStatusFilter('All Status');
	};

	return (
		<Stack direction={'row'} justifyContent={'start'} alignItems={'start'}>
			<Stack mr={2} width={'300px'}>
				{/* ----------------------------search */}

				<CustomTextField
					fullWidth
					placeholder="Search"
					value={searchData}
					onChange={(e) => setSearchData(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Box>
									<SearchIcon />
								</Box>
							</InputAdornment>
						),
					}}
				/>
			</Stack>

			<Stack mr={2} width={'200px'}>
				{/* ----------------------------payment */}

				<CustomTextField label={'Status'} InputLabelProps={{ shrink: true }} select value={StatusFilter}>
					{StatusData?.map((item) => (
						<MenuItem key={item?.value} value={item?.value} onClick={() => setStatusFilter(item?.value)}>
							<Typography>{item?.name}</Typography>
						</MenuItem>
					))}
				</CustomTextField>
			</Stack>
			{/* ----------------------------role */}

			{/* ----------------------------clear */}

			<NextButton sx={{ height: '43px', width: '150px' }} onClick={clearFiltersHandler}>
				Clear Filters
			</NextButton>
		</Stack>
	);
};

export default Filters;

const StatusData = [
	{ name: 'All Status', value: 'All Status' },
	{ name: 'online', value: 'online' },
	{ name: 'offline', value: 'offline' },
	{ name: 'Active', value: 'Active' },
	{ name: 'Deactive', value: 'Deactive' },
];

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: 'transparent',
		borderRadius: '16px',
		height: '48px',
		width: '100%',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,
			// borderRadius: "16px",
		},
		'& fieldset': {
			backgroundColor: 'transparent',
			height: '48px',
			border: `2px solid ${theme?.palette?.infuuse?.gray500}`,

			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			backgroundColor: 'transparent',
			height: '48px',
			border: `2px solid ${theme?.palette?.infuuse?.gray500}`,

			// borderRadius: "16px",
		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.gray500,
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
