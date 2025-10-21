import { Divider, Stack, TableBody, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import {
	BusinessMember,
	SortEnumType,
	User,
	UserType,
	useBusinessMember_GetListQuery,
	useBusiness_GetTeamByBusinessIdQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { StyledTableCell } from '../styles';
import BusinessMembersBody from './Business-body-members';
import BusinessMembersTeamBody from './agency-body-membrs-team';
import FilterList from '@/components/atoms/select-filter/business-filter-list';

const BusinessMemberTable = () => {
	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// ------------------------------- state
	const [businessId, setBusinessId] = useState(CurrentUser?.businessAccesses[0]?.business?.id);

	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// business member query
	const { data: BusinessMembers } = useBusinessMember_GetListQuery({
		skip: page * rowsPerPage,
		take: rowsPerPage,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const BusinessMemberList = BusinessMembers?.businessMember_getList?.result;

	// business member team query
	const { data: BusinessMembersTam } = useBusiness_GetTeamByBusinessIdQuery({
		businessId: Number(businessId),
		skip: page * rowsPerPage,
		take: rowsPerPage,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const BusinessMemberTeamList = BusinessMembersTam?.business_getTeamByBusinessId?.result;

	// ------------------------------------- table header
	const businessHeaderItems = [
		{ id: 'Name', name: 'Name' },
		{ id: 'Status', name: 'Status' },
		{ id: 'Activity Time', name: 'Activity Time' },
		{ id: 'Team', name: 'Team' },
		{ id: 'Created At', name: 'Created At' },
		CurrentUser?.isBusinessOwner && { id: 'Options', name: 'Options' },
	];

	const agencyHeaderItems = [
		{ id: 'Name', name: 'Name' },
		{ id: 'Status', name: 'Status' },
		{ id: 'Activity Time', name: 'Activity Time' },
		{ id: 'Team', name: 'Team' },
		{ id: 'Created At', name: 'Created At' },
	];

	return (
		<Stack width={'100%'} height={'100%'}>
			<TableWrapper>
				{/* -------------------------------------header */}
				<TableContainer
					tableHead={
						<>
							{CurrentUser?.user?.userType === UserType?.BusinessMember
								? businessHeaderItems?.map((item) => (
										<StyledTableCell align="left" key={item?.id}>
											<Typography fontSize={'14px'} fontWeight={'bold'}>
												{item?.name}
											</Typography>
										</StyledTableCell>
								  ))
								: agencyHeaderItems?.map((item) => (
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

							{CurrentUser?.user?.userType === UserType?.BusinessMember
								? BusinessMemberList &&
								  BusinessMemberList?.items?.map((member) => (
										// business memeber
										<BusinessMembersBody member={member as BusinessMember} />
								  ))
								: BusinessMemberTeamList &&
								  BusinessMemberTeamList?.items?.map((member) => (
										// business taems
										<BusinessMembersTeamBody member={member as User} />
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
							totalCount={
								CurrentUser?.user?.userType === UserType?.BusinessMember
									? BusinessMemberList?.totalCount
									: BusinessMemberTeamList?.totalCount
							}
							{...tableRest}
						/>
					</Stack>

					{/* filter */}
					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} width={'100%'} p={2}>
						<FilterList setBusinessId={setBusinessId} businessId={businessId} />
					</Stack>
				</Stack>
			</TableWrapper>
		</Stack>
	);
};

export default BusinessMemberTable;
