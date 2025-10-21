import { Box, Divider, InputAdornment, MenuItem, Stack, TableBody, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { CustomTextField, StyledTableCell } from '../styles';
import Body from './body';
import { PaymentStatus, SortEnumType, usePaymentHistory_GetListQuery, UserType } from '@/graphql/generated';
import { NextButton } from '@/components/atoms/Button';
import SearchIcon from '@/assets/search-icon';

const SubscriptionTable = () => {
	// ------------------------------- state
	const [searchData, setSearchData] = useState('');
	const [roleFilter, setRoleFilter] = useState<UserType | string>('All Roles');
	const [statusFilter, setStatusFilter] = useState<UserType | string>('All Status');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');


	const clearFiltersHandler = () => {
		setRoleFilter('All Roles');
		setStartDate('');
		setEndDate('');
		setStatusFilter('');
	};
	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// subscription history query
	const { data: paymentHistory } = usePaymentHistory_GetListQuery({
		skip: page * rowsPerPage,
		take: rowsPerPage,
		...(Boolean(searchData !== '') && {
			where: {
				or: [
					{
						owner: {
							fullName: {
								contains: searchData
							}
						}
					}, {
						owner: {
							email: {
								contains: searchData
							}
						}
					}, {

					}
				]
			},
		}),
		...(Boolean(roleFilter !== 'All Roles') && {
			where: {
				owner: {
					userType: {
						eq: roleFilter as UserType
					}
				}
			}
		}),
		...(Boolean(statusFilter !== 'All Status') && {
			where: {
				paymentStatus: {
					eq: statusFilter as PaymentStatus
				}
			}
		}),

		...(Boolean(startDate !== '' && endDate === '') && {
			where: {
				createdDate: {
					gte: startDate
				}
			}
		}),

		...(Boolean(endDate !== '' && startDate === '') && {
			where: {
				expireDate: {
					lte: endDate
				}
			}
		}),
		...(Boolean(startDate !== '' && endDate !== '') && {
			where: {
				and: [
					{
						createdDate: {
							gte: startDate
						}
					}, {
						expireDate: {
							lte: endDate
						}
					}
				]
			}
		}),
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const paymentHistoryData = paymentHistory?.paymentHistory_getList?.result;

	return (
		<Stack width={'100%'} height={'100%'}>
			<Stack mb={2}>
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
						<CustomTextField label={'Role'} InputLabelProps={{ shrink: true }} select value={roleFilter}>
							{RoletData?.map((item) => (
								<MenuItem
									key={item?.value}
									value={item?.value}
									onClick={() => setRoleFilter(item?.value)}
								>
									<Typography>{item?.name}</Typography>
								</MenuItem>
							))}
						</CustomTextField>
					</Stack>

					<Stack mr={2} width={'150px'}>
						<CustomTextField label={'Status'} InputLabelProps={{ shrink: true }} select value={statusFilter}>
							{paymentStatusType?.map((item) => (
								<MenuItem
									key={item?.value}
									value={item?.value}
									onClick={() => setStatusFilter(item?.value)}
								>
									<Typography>{item?.name}</Typography>
								</MenuItem>
							))}
						</CustomTextField>
					</Stack>

					<Stack mr={2} width={'200px'}>
						<CustomTextField
							type="date"
							name="startDate"
							label={'Start'}
							value={startDate}
							InputLabelProps={{ shrink: true }}
							onChange={(e) => setStartDate(e.target.value)}
						/>
					</Stack>
					<Stack mr={2} width={'200px'}>
						<CustomTextField
							type="date"
							name="endDate"
							label={'End'}
							value={endDate}
							InputLabelProps={{ shrink: true }}
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</Stack>

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

							{paymentHistoryData?.items?.map((payment) => <Body payment={payment} />)}
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
							totalCount={
								paymentHistoryData?.totalCount
							}
							{...tableRest}
						/>
					</Stack>


				</Stack>
			</TableWrapper>
		</Stack>
	);
};

export default SubscriptionTable;

// ------------------------------------- table header
const AdminListItems = [
	{ id: 'Subscription Owner', name: 'Subscription Owner' },
	{ id: 'Role', name: 'Role' },
	{ id: 'Email', name: 'Email' },
	{ id: 'Plan Type', name: 'Plan Type' },
	{ id: 'Price', name: 'Price' },
	{ id: 'Created At', name: 'Created At' },
	{ id: 'Status', name: 'Status' },
	{ id: 'Options', name: 'Options' },
];


const RoletData = [
	{ name: 'All Roles', value: 'All Roles' },
	{ name: 'Agent', value: UserType?.AgencyMember },
	{ name: 'Owner', value: UserType?.BusinessMember },
];

const paymentStatusType = [
	{ name: 'All Status', value: 'All Status' },
	{ name: 'Paid', value: PaymentStatus?.Paid },
	{ name: 'Failed', value: PaymentStatus?.Failed },
	{ name: 'Pendding', value: PaymentStatus?.Pending },
];

