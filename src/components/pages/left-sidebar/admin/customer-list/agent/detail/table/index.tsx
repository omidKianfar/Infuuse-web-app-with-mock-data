import { Stack, TableBody, Typography } from '@mui/material';
import React from 'react';
import { TableContainer, TableWrapper } from '@/components/atoms/Table';
import { StyledTableCell } from '../../../styles';
import Body from './body';
import { AgencyAdminDetailsDto } from '@/graphql/generated';

interface Props {
	agencyDetailData: AgencyAdminDetailsDto;
}

const CustomerTableDetail = ({ agencyDetailData }: Props) => {
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

							{agencyDetailData?.agency?.agencyMembers?.map((member) => (
								<Body member={member} />
							))}
						</>
					</TableBody>
				</TableContainer>
			</TableWrapper>
		</Stack>
	);
};

export default CustomerTableDetail;

const AdminListItems = [
	{ id: 'Name', name: 'Name' },
	{ id: 'Email', name: 'Email' },
	{ id: 'Status', name: 'Status' },
	{ id: 'Role', name: 'Role' },
	{ id: 'Created At', name: 'Created At' },
];
