import { useState } from 'react';

interface Props {
	defaultCurrentPage?: number;
	defaultRowsPerPage?: number;
}

export function useTable(props?: Props) {
	const [page, setPage] = useState(props?.defaultCurrentPage || 0);
	const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 5);

	const onPageChange = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const onResetTable = () => {
		setPage(0);
		setRowsPerPage(5);
	};

	return {
		page,
		setPage,
		rowsPerPage,
		onResetTable,
		onPageChange,
		onRowsPerPageChange,
	};
}
