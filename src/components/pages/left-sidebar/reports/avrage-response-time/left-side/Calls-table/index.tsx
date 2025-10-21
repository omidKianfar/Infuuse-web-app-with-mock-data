import { Box, Divider, Stack, TableBody, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TableWrapper } from '@/components/atoms/Table';
import { StyledTableCell } from '../styles';
import Body from './body';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

interface Props {
	setChartShow: React.Dispatch<React.SetStateAction<boolean>>
}

const CallsTable = ({ setChartShow }: Props) => {
	const theme = useTheme()

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
		<Stack width={'100%'} height={'100%'} >
			<Stack justifyContent={'start'} alignItems={'start'}>
				<Box mt={3} mb={'12px'} display={'flex'} justifyContent={'start'} alignItems={'center'} maxWidth={'100%'} onClick={() => setChartShow(true)} sx={{ cursor: 'pointer' }}>
					<ArrowBackIosNewRoundedIcon sx={{ fill:theme?.palette?.infuuse?.blue500 }} />	<Typography color={theme?.palette?.infuuse?.blue500}>Chart</Typography>
				</Box>
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

export default CallsTable;

// ------------------------------------- table header
const AdminListItems = [
	{ id: 'Customer', name: 'Customer' },
	{ id: 'Join Date', name: 'Join Date' },
	{ id: 'Text Message', name: 'Text Message' },
	{ id: 'Phone', name: 'Phone' },
	{ id: 'Email', name: 'Email' },
	{ id: 'Status', name: 'Status' },
	{ id: 'Options', name: 'Options' },
];
