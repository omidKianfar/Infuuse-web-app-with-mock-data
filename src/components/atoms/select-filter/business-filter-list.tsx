import {
	AgencyMemberAssignmentStatus,
	SortEnumType,
	UserType,
	useBusiness_GetListAgencyRequestsQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { Box, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';

interface Props {
	setBusinessId?: React.Dispatch<React.SetStateAction<number | undefined>>;
	businessId?: number | undefined;
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
				<Box width={'100%'}>
					<CustomTextField
						label="business"
						select
						fullWidth
						value={
							businessId !== null && businessId !== undefined
								? businessId
								: CurrentUser?.businessAccesses[0]?.business?.id}
						InputLabelProps={{
							sx: {
								color: theme?.palette?.infuuse.blue500,
								fontSize: '16px',
							},
							shrink: true,
						}}
					>
						{BusinessRequestsData?.items?.map((business) => (
							<MenuItem
								key={business?.business?.id}
								value={
									business?.business?.id as number
								}
								onClick={() => setBusinessId(business?.business?.id as number)}
							>
								<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500}>
									{business?.business?.name
										? business?.business?.name
										: CurrentUser?.businessAccesses[0]?.business?.name}
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

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '50px',

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
