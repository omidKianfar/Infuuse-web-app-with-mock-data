import { Divider, Stack, styled, TableBody, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { StyledTableCell } from '../styles';
import Body from './body';
import { SortEnumType, useContact_GetListByBusinessIdQuery, UserDto, useUser_GetCurrentUserQuery } from '@/graphql/generated';

interface Props {
	CurrentUser: UserDto
}

const HubspotTable = ({ CurrentUser }: Props) => {
	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// get contact
	const { data: contacts } = useContact_GetListByBusinessIdQuery({
		businessId: Number(CurrentUser?.businessAccesses[0]?.business?.id),
		skip: page * rowsPerPage,
		take: rowsPerPage,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const ContactsData = contacts?.contact_getListByBusinessId?.result;

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

							{ContactsData?.items?.map((contact) => (
								<Body contact={contact} />
							))}
						</>
					</TableBody>
				</TableContainer>

				{/* -------------------------------------footer */}
				<Divider />
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<TablePagination
							page={page}
							rowsPerPage={rowsPerPage}
							totalCount={ContactsData?.totalCount}
							{...tableRest}
						/>
					</Stack>

				</Stack>
			</TableWrapper>
		</Stack>
	);
};

export default HubspotTable;

// ------------------------------------- table header
const AdminListItems = [
	{ id: 'name', name: 'name' },
	{ id: 'Email', name: 'Email' },
	{ id: 'Phone', name: 'Phone' },
	{ id: 'Team', name: 'Team' },
	{ id: 'Created At', name: 'Created At' },
	{ id: 'HubSpot', name: 'HubSpot' },
];


export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '50px',
		width: '250px',
		'& .MuiInputBase-input': {
			color: theme?.palette?.infuuse.blue500,
			borderWidth: '1px',

			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse.blue500,
			borderWidth: '1px',
			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse.blue500,
			borderWidth: '1px',

			// borderRadius: "16px",
		},
	},

	'& label.Mui-focused': {
		color: theme?.palette?.infuuse?.blue500,
		fontSize: '16px',
	},
	'&.MuiFormLabel-root .Mui-disabled': {
		color: theme?.palette?.infuuse?.blue500,
		fontSize: '16px',
	},
	'& label.Mui-root': {
		color: theme?.palette?.infuuse?.blue500,
		fontSize: '16px',
	},
}));
