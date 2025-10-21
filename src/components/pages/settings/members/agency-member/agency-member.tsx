import { Divider, Stack, TableBody, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import {
	AgencyMember,
	SortEnumType,
	useAgencyMember_GetListQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { StyledTableCell } from '../styles';
import Body from './body';
import FilterList from './filter-list';

const AgencyMemberTable = () => {
	// ------------------------------- state
	const [businessId, setBusinessId] = useState<number | string>('All Business');

	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// agency member query
	const { data: AgencyMembers } = useAgencyMember_GetListQuery({
		skip: page * rowsPerPage,
		take: rowsPerPage,
		...(Boolean(businessId !== 'All Business') && {
			where: {
				agencyMemberAssignments: {
					some: {
						business: {
							id: {
								eq: Number(businessId),
							},
						},
					},
				},
			},
		}),
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const AgencyMemberList = AgencyMembers?.agencyMember_getList?.result;

	// -------------------------------------- table header
	const headerItems = [
		{ id: 'Name', name: 'Name' },
		{ id: 'Status', name: 'Status' },
		{ id: 'Activity Time', name: 'Activity Time' },
		{ id: 'Created At', name: 'Created At' },
		CurrentUser?.isAgency && { id: 'Options', name: 'Options' },
	];

	return (
		<Stack width={'100%'} height={'100%'}>
			<TableWrapper>
				<TableContainer
					// ------------------------------------------table header
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
						<>
							{AgencyMemberList &&
								AgencyMemberList?.items?.map((member) => (
									// ------------------------------------------table body
									<Body member={member as AgencyMember} />
								))}
						</>
					</TableBody>
				</TableContainer>
				{/* --------------------------------------footer */}
				<Divider />
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
					<Stack width={'50%'} direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<TablePagination
							page={page}
							rowsPerPage={rowsPerPage}
							totalCount={AgencyMemberList?.totalCount}
							{...tableRest}
						/>
					</Stack>

					{/* filter */}
					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} width={'100%'} p={2}>
						<FilterList setBusinessId={setBusinessId} businessId={businessId} />
					</Stack>
				</Stack>{' '}
			</TableWrapper>
		</Stack>
	);
};

export default AgencyMemberTable;
