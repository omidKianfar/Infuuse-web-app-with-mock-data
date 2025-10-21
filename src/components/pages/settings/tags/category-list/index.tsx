import { Divider, Stack, TableBody, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { Category, SortEnumType, useCategory_GetListQuery, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { StyledTableCell } from '../styles';
import Body from './body';
import FilterList from '@/components/atoms/select-filter/business-filter-list';

const CategoryList = () => {
	// ------------------------------- query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// ------------------------------- states
	const [businessId, setBusinessId] = useState(CurrentUser?.businessAccesses[0]?.business?.id);

	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// get categories
	const { data: Categories } = useCategory_GetListQuery({
		businessId: Number(businessId),
		skip: page * rowsPerPage,
		take: rowsPerPage,
		where: {
			tagCategories: {
				some: {
					name: {
						neq: '',
					},
				},
			},
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const CategoriesData = Categories?.category_getList?.result;

	return (
		<Stack width={'100%'} height={'100%'}>
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
						<>
							{CategoriesData &&
								CategoriesData?.items?.map((category) => <Body category={category as Category} />)}
						</>
					</TableBody>
				</TableContainer>
				<Divider />
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
					<Stack width={'50%'} direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<TablePagination
							page={page}
							rowsPerPage={rowsPerPage}
							totalCount={CategoriesData?.totalCount}
							{...tableRest}
						/>
					</Stack>

					{/* filter */}
					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} width={'100%'} p={2}>
						<FilterList businessId={businessId} setBusinessId={setBusinessId} />
					</Stack>
				</Stack>{' '}
			</TableWrapper>
		</Stack>
	);
};

export default CategoryList;

// -------------------------------header items
const categoryheaderItems = [
	{ id: 'Category', name: 'Category' },
	{ id: 'Business', name: 'Business' },
	{ id: 'Created At', name: 'Created At' },
	{ id: 'Options', name: 'Options' },
];
