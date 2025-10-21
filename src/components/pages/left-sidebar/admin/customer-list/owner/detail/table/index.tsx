import { Stack, TableBody, Typography } from '@mui/material';
import React from 'react';
import { TableContainer, TableWrapper } from '@/components/atoms/Table';
import { StyledTableCell } from '../../../styles';
import Body from './body';
import { BusinessAdminDetailsDto } from '@/graphql/generated';

interface Props {
	businessDetailData: BusinessAdminDetailsDto;
}

const CustomerTableDetail = ({ businessDetailData }: Props) => {
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

							{businessDetailData?.business?.businessMembers?.map((member) => (
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

// ------------------------------------- table header
const AdminListItems = [
	{ id: 'Name', name: 'Name' },
	{ id: 'Email', name: 'Email' },
	{ id: 'Status', name: 'Status' },
	{ id: 'Role', name: 'Role' },
	{ id: 'Created At', name: 'Created At' },
];
