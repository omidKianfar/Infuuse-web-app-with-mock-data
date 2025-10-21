import { Box, InputAdornment, MenuItem, Rating, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import CustomerTable from './customer-table';
import SearchIcon from '@/assets/search-icon';
import { NextButton } from '@/components/atoms/Button';
import StarGoldIcon from '@/assets/star-gold-icon';
import StarEmptyIcon from '@/assets/star-emty-icon';

const Feedback = () => {
	// -------------------------------tools
	const theme = useTheme();

	const [searchData, setSearchData] = useState('');
	const [sort, setSort] = useState('ASC');

	const clearFiltersHandler = () => {
		setSort('ASC');
	};

	return (
		<Stack p={2}>
			<Stack mb={2}>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
					<Typography mb={2} fontSize={'18px'} fontWeight={'bold'} color={theme?.palette?.infuuse?.blue100}>
						Customer Feedback
					</Typography>

					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<Typography mr={2}>Overall Rating: </Typography>

						<Typography mr={2}>5</Typography>

						<Rating
							name="size-large"
							value={5}
							readOnly
							icon={
								<Box mr={2}>
									<StarGoldIcon width="24px" height="24px" />
								</Box>
							}
							emptyIcon={
								<Box mr={2}>
									<StarEmptyIcon width="24px" height="24px" />
								</Box>
							}
						/>
					</Stack>
				</Stack>

				<Stack direction={'row'} justifyContent={'start'} alignItems={'start'}>
					<Stack mr={2} width={'300px'}>
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

					<Stack mr={2} width={'150px'}>
						<CustomTextField select value={sort} label={'Sort'} InputLabelProps={{ shrink: true }}>
							{SortData?.map((item) => (
								<MenuItem key={item?.value} value={item?.value} onClick={() => setSort(item?.value)}>
									<Typography>{item?.name}</Typography>
								</MenuItem>
							))}
						</CustomTextField>
					</Stack>

					<NextButton sx={{ height: '43px', width: '150px' }} onClick={clearFiltersHandler}>
						Clear Filters
					</NextButton>
				</Stack>
			</Stack>

			<CustomerTable />
		</Stack>
	);
};

export default Feedback;

const SortData = [
	{ name: 'ASC', value: 'ASC' },
	{ name: 'DESC', value: 'DESC' },
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
