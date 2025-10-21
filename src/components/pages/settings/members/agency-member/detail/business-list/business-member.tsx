import { Divider, Stack, TableBody, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { AgencyMemberAssignment, SortEnumType, useAgencyMember_GetListAssignmentQuery } from '@/graphql/generated';
import { StyledTableCell } from '../../../styles';
import FilterList from './filter-list';
import BodyAssignment from './body';

const BusinessList = () => {
	// -------------------------------tools
	const router = useRouter();

	// -------------------------------state
	const [businessId, setBusinessId] = useState<number | string>('All Business');

	const MemberId = router?.query?.memberId;

	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// get assignments to member
	const { data: agencyMemberBusiness } = useAgencyMember_GetListAssignmentQuery({
		skip: page * rowsPerPage,
		take: rowsPerPage,
		where: {
			agencyMemberId: {
				eq: Number(MemberId),
			},
			...(Boolean(businessId !== 'All Business') && {
				business: {
					id: {
						eq: Number(businessId),
					},
				},
			}),
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const agencyMemberBusinessList = agencyMemberBusiness?.agencyMember_getListAssignment?.result;

	return (
		<Stack width={'100%'} height={'100%'}>
			<TableWrapper>
				<TableContainer
					// -------------------------------------table head

					tableHead={
						<>
							{headerItems?.map((item) => (
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
						{agencyMemberBusinessList &&
							agencyMemberBusinessList?.items?.map((businessAssignment) => (
								// -------------------------------------table body
								<BodyAssignment businessAssignment={businessAssignment as AgencyMemberAssignment} />
							))}
					</TableBody>
				</TableContainer>
				{/* ----------------------------------footer */}
				<Divider />
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
					<Stack width={'50%'} direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<TablePagination page={page} rowsPerPage={rowsPerPage} totalCount={1} {...tableRest} />
					</Stack>

					{/* filters */}
					<FilterList setBusinessId={setBusinessId} businessId={businessId} />
				</Stack>{' '}
			</TableWrapper>
		</Stack>
	);
};

export default BusinessList;

// ---------------------------------- table header
const headerItems = [
	{ id: 'Name', name: 'Name' },
	{ id: 'Adedd Since', name: 'Adedd Since' },
	{ id: 'Access', name: 'Access' },
];
