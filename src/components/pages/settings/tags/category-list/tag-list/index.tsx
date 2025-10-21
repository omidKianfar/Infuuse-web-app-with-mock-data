import { Divider, Stack, TableBody, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { SortEnumType, TagCategory, useTagCategory_GetListByCategoryIdQuery } from '@/graphql/generated';
import Body from './body';
import { useRouter } from 'next/router';
import { StyledTableCell } from '../../styles';

const TagList = () => {
	const router = useRouter();

	const categoryId = router?.query?.categoryId;

	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// get categories
	const { data: tags } = useTagCategory_GetListByCategoryIdQuery({
		categoryId: Number(categoryId),
		skip: page * rowsPerPage,
		take: rowsPerPage,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const tagsData = tags?.tagCategory_getListByCategoryId?.result;

	return (
		<Stack width={'100%'} height={'100%'} p={2}>
			<TableWrapper>
				<TableContainer
					tableHead={
						<>
							{categoryheaderItems?.map((item) => (
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
						<>{tagsData && tagsData?.items?.map((tag) => <Body tag={tag as TagCategory} />)}</>
					</TableBody>
				</TableContainer>
				<Divider />
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
					<Stack width={'50%'} direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<TablePagination
							page={page}
							rowsPerPage={rowsPerPage}
							totalCount={tagsData?.totalCount}
							{...tableRest}
						/>
					</Stack>
				</Stack>{' '}
			</TableWrapper>
		</Stack>
	);
};

export default TagList;

// -------------------------------header items
const categoryheaderItems = [
	{ id: 'Name', name: 'Name' },
	{ id: 'Category', name: 'Category' },
	{ id: 'Created At', name: 'Created At' },
	{ id: 'Options', name: 'Options' },
];
