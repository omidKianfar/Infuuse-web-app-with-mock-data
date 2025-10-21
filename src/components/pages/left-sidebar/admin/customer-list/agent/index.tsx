import { Box, InputAdornment, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@/assets/search-icon';
import { NextButton } from '@/components/atoms/Button';
import AgentCustomerTable from './agent-customer-table';

const agentCustomerList = () => {
	// -------------------------------tools
	const theme = useTheme();

	const [searchData, setSearchData] = useState('');
	const [paymentFilter, setPaymentFilter] = useState('Annual/Monthly');

	const clearFiltersHandler = () => {
		setPaymentFilter('Annual/Monthly');
	};

	return (
		<Stack p={2}>
			<Stack mb={2}>
				<Typography mb={2} fontSize={'18px'} fontWeight={'bold'} color={theme?.palette?.infuuse?.blue100}>
					Customers List
				</Typography>
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

						<CustomTextField
							label={'Peyment Type'}
							InputLabelProps={{ shrink: true }}
							select
							value={paymentFilter}
						>
							{PaymentData?.map((item) => (
								<MenuItem
									key={item?.value}
									value={item?.value}
									onClick={() => setPaymentFilter(item?.value)}
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
			<AgentCustomerTable />
		</Stack>
	);
};

export default agentCustomerList;

const PaymentData = [
	{ name: 'Annual/Monthly', value: 'Annual/Monthly' },
	{ name: 'Annual', value: 'Annual' },
	{ name: 'Monthly', value: 'Monthly' },
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
