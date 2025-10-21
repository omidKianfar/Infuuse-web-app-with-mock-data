import { Divider, Stack, TableBody, Typography } from '@mui/material';
import React from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { StyledTableCell } from './styles';
import Body from './body';
import { SortEnumType, usePaymentHistory_GetListQuery } from '@/graphql/generated';

const SubscriptionTable = () => {

	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// business member query
	const { data: paymentList } = usePaymentHistory_GetListQuery({
		skip: page * rowsPerPage,
		take: rowsPerPage,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const paymentListData = paymentList?.paymentHistory_getList?.result;

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

							{paymentListData?.items?.map((payment) => <Body payment={payment} />)}
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
								paymentListData?.totalCount
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
	{ id: 'Plan', name: 'Plan' },
	{ id: 'Number of users', name: 'Number of users' },
	{ id: 'Price', name: 'Price' },
	{ id: 'Discount', name: 'Discount' },
	{ id: 'Expire Date', name: 'Expire Date' },
	{ id: 'Status', name: 'Status' },
	{ id: 'Options', name: 'Options' },
];
