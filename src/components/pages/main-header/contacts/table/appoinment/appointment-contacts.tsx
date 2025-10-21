import { Stack, TableBody, Typography } from '@mui/material';
import React from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { Deal, DealStatus, SortEnumType, useDeal_GetListByBusinessIdQuery } from '@/graphql/generated';
import { StyledTableCell } from '@/components/pages/settings/members/styles';
import Body from './body';
import FilterList from '@/components/atoms/select-filter/business-filter-list';

interface Props {
	businessId?: number | undefined;
	setBusinessId?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const AppointmentContactList = ({ businessId, setBusinessId }: Props) => {
	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// get contact
	const { data: contacts } = useDeal_GetListByBusinessIdQuery({
		businessId: Number(businessId),
		skip: page * rowsPerPage,
		take: rowsPerPage,
		where: {
			dealStatus: {
				eq: DealStatus?.AppointmentScheduled,
			},
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const ContactsData = contacts?.deal_getListByBusinessId?.result;

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
						<>{ContactsData && ContactsData?.items?.map((deal) => <Body deal={deal as Deal} />)}</>
					</TableBody>
				</TableContainer>

				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
					<Stack width={'50%'} direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<TablePagination
							page={page}
							rowsPerPage={rowsPerPage}
							totalCount={ContactsData?.totalCount}
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

export default AppointmentContactList;

// -------------------------------header items
// agency
const ContactheaderItems = [
	{ id: 'Name', name: 'Name' },
	{ id: 'Status', name: 'Status' },
	{ id: 'Team', name: 'Team' },
	{ id: 'Created At', name: 'Created At' },
	{ id: 'Options', name: 'Options' },
];
