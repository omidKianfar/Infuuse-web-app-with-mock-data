import { CustomTextField } from '@/components/atoms/select-filter/business-filter-list';
import {
	AgencyMemberAssignmentStatus,
	SortEnumType,
	UserType,
	useBusiness_GetListAgencyRequestsQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { Box, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

interface Props {
	setBusinessId: React.Dispatch<React.SetStateAction<string | number>>;
	businessId: number | string;
}

const FilterList = ({ setBusinessId, businessId }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	// ------------------------------- query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// get businesses
	const { data: businessRequests } = useBusiness_GetListAgencyRequestsQuery({
		skip: 0,
		take: 10000,
		where: {
			status: {
				eq: AgencyMemberAssignmentStatus?.Approved,
			},
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const BusinessRequestsData = businessRequests?.business_getListAgencyRequests?.result;

	return (
		<Stack>
			{CurrentUser?.user?.userType === UserType?.AgencyMember && (
				<Box width={'300px'}>
					<CustomTextField
						label="business"
						select
						fullWidth
						value={businessId}
						InputLabelProps={{
							sx: {
								color: theme?.palette?.infuuse.blue500,
								fontSize: '16px',
							},
							shrink: true,
						}}
					>
						<MenuItem onClick={() => setBusinessId('All Business')} value={'All Business'}>
							<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500}>
								All Business
							</Typography>
						</MenuItem>

						{BusinessRequestsData?.items?.map((business) => (
							<MenuItem
								key={business?.business?.id}
								value={business?.business?.id}
								onClick={() => setBusinessId(business?.business?.id as number)}
							>
								<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500}>
									{business?.business?.name}
								</Typography>
							</MenuItem>
						))}
					</CustomTextField>
				</Box>
			)}
		</Stack>
	);
};

export default FilterList;
