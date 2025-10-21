import { Stack, TableBody, Typography } from '@mui/material';
import React from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { Contact, SortEnumType, useContact_GetListByBusinessIdQuery } from '@/graphql/generated';
import { StyledTableCell } from '@/components/pages/settings/members/styles';
import Body from './body';
import FilterList from '@/components/atoms/select-filter/business-filter-list';

interface Props {}

const AllPhonebook = ({}: Props) => {
	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// get contact
	// const { data: contacts } = useContact_GetListByBusinessIdQuery({
	// 	businessId: Number(businessId),
	// 	skip: page * rowsPerPage,
	// 	take: rowsPerPage,
	// 	order: {
	// 		createdDate: SortEnumType?.Desc,
	// 	},
	// });
	// const ContactsData = contacts?.contact_getListByBusinessId?.result;

	return (
		<Stack width={'100%'} height={'100%'}>
			<TableWrapper>
				<TableContainer
					tableHead={
						<>
							{ContactheaderItems?.map((item) => (
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
							{/* {ContactsData &&
								ContactsData?.items?.map((contact) => <Body contact={contact as Contact} />)} */}
						</>
					</TableBody>
				</TableContainer>

				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
					<Stack width={'50%'} direction={'row'} justifyContent={'start'} alignItems={'center'}>
						{/* <TablePagination
							page={page}
							rowsPerPage={rowsPerPage}
							totalCount={ContactsData?.totalCount}
							{...tableRest}
						/> */}
					</Stack>

					{/* filter */}
					<Stack width={'50%'} direction={'row'} justifyContent={'end'} alignItems={'center'}>
						{/* <FilterList setBusinessId={setBusinessId} businessId={businessId} /> */}
					</Stack>
				</Stack>
			</TableWrapper>
		</Stack>
	);
};

export default AllPhonebook;

// -------------------------------header items
const ContactheaderItems = [
	{ id: 'Name', name: 'Name' },
	{ id: 'Phone Number', name: 'Phone Number' },
	{ id: 'Call Type', name: 'Call Type' },
	{ id: 'Team', name: 'Team' },
	{ id: 'Date', name: 'Date' },
	{ id: 'Duration', name: 'Duration' },
	{ id: 'Options', name: 'Options' },
];
