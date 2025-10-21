import { Stack, TableBody, Typography } from '@mui/material';
import React from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import {
	AgencyMemberAssignment,
	SortEnumType,
	useBusiness_GetListAgencyRequestsQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { StyledTableCell } from '../../styles';
import Body from './body';

const BusinessList = () => {
	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	//current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// get businesses
	const { data: businessRequests } = useBusiness_GetListAgencyRequestsQuery({
		businessId: Number(CurrentUser?.businessAccesses[0]?.business?.id),
		skip: page * rowsPerPage,
		take: rowsPerPage,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const BusinessRequestsData = businessRequests?.business_getListAgencyRequests?.result;

	return (
		<Stack width={'100%'} height={'100%'}>
			<TableWrapper>
				<TableContainer
					tableHead={
						<>
							{businessheaderItems?.map((item) => (
								// business
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
							{BusinessRequestsData &&
								BusinessRequestsData?.items?.map((request) => (
									<Body request={request as AgencyMemberAssignment} />
								))}
						</>
					</TableBody>
				</TableContainer>

				<TablePagination
					page={page}
					rowsPerPage={rowsPerPage}
					totalCount={BusinessRequestsData?.totalCount}
					{...tableRest}
				/>
			</TableWrapper>
		</Stack>
	);
};

export default BusinessList;

// -------------------------------header items

// business
const businessheaderItems = [
	{ id: 'Name', name: 'Name' },
	{ id: 'Email', name: 'Email' },
	{ id: 'Created At', name: 'Created At' },
	{ id: 'Status', name: 'Status' },
	{ id: 'Options', name: 'Options' },
];
