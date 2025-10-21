import { Box, InputAdornment, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@/assets/search-icon';
import { NextButton } from '@/components/atoms/Button';
import TransitionTable from './sms-table';

const SmsTRansition = () => {
	// -------------------------------tools
	const theme = useTheme();

	const [searchData, setSearchData] = useState('');
	const [callFilter, setCallFilter] = useState('SMS');
	const [timeFilter, setTimeFilter] = useState('All Time');

	const clearFiltersHandler = () => {
		setCallFilter('SMS');
		setTimeFilter('All Time');
	};

	return (
		<Stack p={2} mt={2}>
			<Stack mb={2}>
				{/* ----------------------------filters */}

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

						<CustomTextField label={'Time'} InputLabelProps={{ shrink: true }} select value={timeFilter}>
							{ChartSortData?.map((item) => (
								<MenuItem
									key={item?.value}
									value={item?.value}
									onClick={() => setTimeFilter(item?.value)}
								>
									<Typography>{item?.name}</Typography>
								</MenuItem>
							))}
						</CustomTextField>
					</Stack>
					{/* ----------------------------role */}

					<Stack mr={2} width={'200px'}>
						<CustomTextField label={'Call'} InputLabelProps={{ shrink: true }} select value={callFilter}>
							{CallData?.map((item) => (
								<MenuItem
									key={item?.value}
									value={item?.value}
									onClick={() => setCallFilter(item?.value)}
								>
									<Typography>{item?.name}</Typography>
								</MenuItem>
							))}
						</CustomTextField>
					</Stack>

					{/* ----------------------------clear */}

					<NextButton sx={{ height: '43px', width: '150px' }} onClick={clearFiltersHandler}>
						Clear Filters
					</NextButton>
				</Stack>
			</Stack>
			{/* ----------------------------table */}
			<TransitionTable />
		</Stack>
	);
};

export default SmsTRansition;

const ChartSortData = [
	{ name: 'All Time', value: 'All Time' },
	{ name: 'Past Day', value: 'Past Day' },
	{ name: 'Past Week', value: 'Past Week' },
	{ name: 'Past Month', value: 'Past Month' },
	{ name: 'Past Year', value: 'Past Year' },
];

const CallData = [
	{ name: 'SMS', value: 'SMS' },
	{ name: 'MMs', value: 'MMs' },
	{ name: 'Voice Call', value: 'Voice Call' },
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
