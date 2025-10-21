import { Stack, TableBody, Typography } from '@mui/material';
import React from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { AgencyMemberAssignment, SortEnumType, useBusiness_GetListAgencyRequestsQuery } from '@/graphql/generated';
import { StyledTableCell } from '../../styles';
import Body from './body';

const BusinessList = () => {
	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// get businesses
	const { data: businessRequests } = useBusiness_GetListAgencyRequestsQuery({
		businessId: null,
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
							{agencyheaderItems?.map((item) => (
								// agency
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
// agency
const agencyheaderItems = [
	{ id: 'Name', name: 'Name' },
	{ id: 'Color tag', name: 'Color tag' },
	{ id: 'Email', name: 'Email' },
	{ id: 'Created At', name: 'Created At' },
	{ id: 'Status', name: 'Status' },
	{ id: 'Options', name: 'Options' },
];
