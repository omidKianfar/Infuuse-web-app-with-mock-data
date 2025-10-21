import React from 'react';
import Scrollbar from '../Scrollbar';
import { Table, TableHead, TableRow, TableContainer as MuiTableContainer } from '@mui/material';

interface Props {
	maxHeight?: number;
	children: React.ReactNode;
	tableHead: React.ReactNode;
}
export default function TableContainer({ tableHead, children }: Props) {
	return (
		// <Scrollbar>
		<MuiTableContainer sx={{ minWidth: 800 }}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>{tableHead}</TableRow>
				</TableHead>
				{children}
			</Table>
		</MuiTableContainer>
		// </Scrollbar>
	);
}
