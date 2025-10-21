import { Divider, Stack, TableBody, Typography } from '@mui/material';
import React from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TableWrapper } from '@/components/atoms/Table';
import { StyledTableCell } from '../styles';
import Body from './body';

const CustomerTable = () => {
	// // -------------------------------query
	// // current user
	// const { data: User } = useUser_GetCurrentUserQuery();
	// const CurrentUser = User?.user_getCurrentUser?.result;

	// ------------------------------- state
	// const [businessId, setBusinessId] = useState(CurrentUser?.businessAccesses[0]?.business?.id);

	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// business member query
	// const { data: BusinessMembers } = useBusinessMember_GetListQuery({
	// 	skip: page * rowsPerPage,
	// 	take: rowsPerPage,
	// 	order: {
	// 		createdDate: SortEnumType?.Desc,
	// 	},
	// });
	// const BusinessMemberList = BusinessMembers?.businessMember_getList?.result;

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

							<Body />
						</>
					</TableBody>
				</TableContainer>

				{/* -------------------------------------footer */}
				<Divider />
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
					<Stack width={'50%'} direction={'row'} justifyContent={'start'} alignItems={'center'}>
						{/* <TablePagination
							page={page}
							rowsPerPage={rowsPerPage}
							totalCount={
								CurrentUser?.user?.userType === UserType?.BusinessMember
									? BusinessMemberList?.totalCount
									: BusinessMemberTeamList?.totalCount
							}
							{...tableRest}
						/> */}
					</Stack>

					{/* filter */}
					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} width={'100%'} p={2}>
						{/* <FilterList setBusinessId={setBusinessId} businessId={businessId} /> */}
					</Stack>
				</Stack>
			</TableWrapper>
		</Stack>
	);
};

export default CustomerTable;

// ------------------------------------- table header
const AdminListItems = [
	{ id: 'Administrators', name: 'Administrators' },
	{ id: 'Date', name: 'Date' },
	{ id: 'Contacts', name: 'Contacts' },
	{ id: 'Comments', name: 'Comments' },
	{ id: 'Rate', name: 'Rate' },
	{ id: 'Team', name: 'Team' },
	{ id: 'Options', name: 'Options' },
];
