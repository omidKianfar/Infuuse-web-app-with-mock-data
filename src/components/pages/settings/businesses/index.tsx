import { UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { Stack } from '@mui/material';
import React from 'react';
import OwnerBusinesses from './owner';
import AgencyBusinesses from './agency';

const Businesses = () => {
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	return (
		<Stack>
			{CurrentUser?.user?.userType === UserType?.BusinessMember ? <OwnerBusinesses /> : <AgencyBusinesses />}
		</Stack>
	);
};

export default Businesses;
