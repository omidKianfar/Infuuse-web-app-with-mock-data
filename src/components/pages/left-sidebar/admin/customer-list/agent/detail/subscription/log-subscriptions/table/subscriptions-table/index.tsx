import { Box, Divider, InputAdornment, MenuItem, Stack, TableBody, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { CustomTextField, StyledTableCell } from '../styles';
import Body from './body';
import { SortEnumType, usePaymentHistory_GetListQuery, UserType } from '@/graphql/generated';
import { NextButton } from '@/components/atoms/Button';
import SearchIcon from '@/assets/search-icon';
import { useRouter } from 'next/router';

const SubscriptionTable = () => {
	const router = useRouter()
	const OwnerId = router?.query?.ownerId

	const { page, rowsPerPage, ...tableRest } = useTable();

	const { data: paymentHistory } = usePaymentHistory_GetListQuery({
		skip: page * rowsPerPage,
		take: rowsPerPage,
		where: {
			ownerId: {
				eq: Number(OwnerId)
			}
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const paymentHistoryData = paymentHistory?.paymentHistory_getList?.result;

	return (
		<Stack width={'100%'} height={'100%'}>
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

const AdminListItems = [
	{ id: 'subscription Owner', name: 'subscription Owner' },
	{ id: 'Role', name: 'Role' },
	{ id: 'Email', name: 'Email' },
	{ id: 'Plan Type', name: 'Plan Type' },
	{ id: 'Price', name: 'Price' },
	{ id: 'Created At', name: 'Created At' },
	{ id: 'Status', name: 'Status' },
];


const RoletData = [
	{ name: 'All Roles', value: 'All Roles' },
	{ name: 'Agent', value: UserType?.AgencyMember },
	{ name: 'Owner', value: UserType?.BusinessMember },
];

