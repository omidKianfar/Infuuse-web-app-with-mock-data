import React from 'react';
import { TablePagination as MuiTablePagination, Stack, useTheme } from '@mui/material';

type Props = {
	page: number;
	totalCount?: number;
	rowsPerPage: number;
	onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void;
	onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
};

export default function TablePagination({ page, rowsPerPage, onPageChange, totalCount, onRowsPerPageChange }: Props) {
	if (!totalCount) {
		return null;
	}
	const theme = useTheme();

	return (
		<Stack direction="row" justifyContent={'center'} alignItems={'center'}>
			<MuiTablePagination
				page={page}
				component="div"
				count={totalCount}
				rowsPerPage={rowsPerPage}
				onPageChange={onPageChange}
				rowsPerPageOptions={[5, 10, 15]}
				onRowsPerPageChange={onRowsPerPageChange}
				sx={{
					fontSize: '14px',
					color: theme.palette.infuuse?.blue500,
					fontWeight: 'bold',
					'.MuiTablePagination-selectLabel': {
						fontSize: '16px',
					},
					'.MuiTablePagination-displayedRows': {
						fontSize: '16px',
					},
				}}
			/>
		</Stack>
	);
}
