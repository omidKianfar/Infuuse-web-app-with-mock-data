import { Box, Divider, InputAdornment, MenuItem, Stack, styled, TableBody, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { StyledTableCell } from '../../styles';
import Body from './body';
import { NextButton } from '@/components/atoms/Button';
import SearchIcon from '@/assets/search-icon';
import { SortEnumType, useBusiness_GetListByAdminQuery } from '@/graphql/generated';

const OwnerCustomerTable = () => {
	const [searchData, setSearchData] = useState('');
	const [paymentFilter, setPaymentFilter] = useState('Annual/Monthly');

	const clearFiltersHandler = () => {
		setSearchData('');
		setPaymentFilter('Annual/Monthly');
	};

	const { page, rowsPerPage, ...tableRest } = useTable();

	const { data: BusinessOwners } = useBusiness_GetListByAdminQuery({
		skip: page * rowsPerPage,
		take: rowsPerPage,
		...(Boolean(searchData !== '') && {
			where: {
				or: [
					{
						businessOwner: {
							email: {
								contains: searchData,
							},
						},
					},
					{
						business: {
							name: {
								contains: searchData,
							},
						},
					},
				],
			},
		}),
		order: {
			business: {
				createdDate: SortEnumType?.Desc,
			},
		},
	});
	const BusinessOwnersList = BusinessOwners?.business_getListByAdmin?.result;

	return (
		<Stack width={'100%'} height={'100%'}>
			<Stack mb={2}>
				{/* ----------------------------filters */}

				<Stack direction={'row'} justifyContent={'start'} alignItems={'start'} position={'absolute'} top={'8px'} right={0}>
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

					{/* <Stack mr={2} width={'200px'}>

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
					</Stack> */}

					{/* ----------------------------clear */}

					<NextButton sx={{ height: '43px', width: '150px' }} onClick={clearFiltersHandler}>
						Clear Filters
					</NextButton>
				</Stack>
			</Stack>
			<TableWrapper>
				{/* -------------------------------------header */}
				<TableContainer
					tableHead={
						<>
							{AdminListItems?.map((item) => (
								<StyledTableCell align="left" key={item?.id}>
									<Typography fontSize={'14px'} fontWeight={'bold'}>
										{item?.name}
									</Typography>
								</StyledTableCell>
							))}
						</>
					}
				>
					<TableBody>
						<>
							{/* -------------------------------------row */}

							{BusinessOwnersList?.items?.map((business) => (
								<Body business={business}/>
							))}
						</>
					</TableBody>
				</TableContainer>

				{/* -------------------------------------footer */}
				<Divider />
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
					<Stack width={'50%'} direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<TablePagination
							page={page}
							rowsPerPage={rowsPerPage}
							totalCount={BusinessOwnersList?.totalCount}
							{...tableRest}
						/>
					</Stack>
				</Stack>
			</TableWrapper>
		</Stack>
	);
};

export default OwnerCustomerTable;

const AdminListItems = [
	{ id: 'Company/Agency', name: 'Company/Agency' },
	{ id: 'Email', name: 'Email' },
	{ id: 'Subscription', name: 'Subscription' },
	{ id: 'Created At', name: 'Created At' },
	{ id: 'Options', name: 'Options' },
];

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
		},
		'& fieldset': {
			backgroundColor: 'transparent',
			height: '48px',
			border: `2px solid ${theme?.palette?.infuuse?.gray500}`,

		},
		'&.Mui-focused fieldset': {
			backgroundColor: 'transparent',
			height: '48px',
			border: `2px solid ${theme?.palette?.infuuse?.gray500}`,

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
