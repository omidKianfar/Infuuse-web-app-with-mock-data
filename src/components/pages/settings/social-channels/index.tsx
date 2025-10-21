import NoChatPage from '@/components/atoms/no-data';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Body from './body';
import { useBusiness_GetByBusinessIdQuery, useUser_GetCurrentUserQuery } from '@/graphql/generated';

import FilterList from '@/components/atoms/select-filter/business-filter-list';

const SocialChannels = () => {
	// ------------------------------- query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// -------------------------------state
	const [businessId, setBusinessId] = useState(CurrentUser?.businessAccesses[0]?.business?.id);

	// ------------------------------- query
	const { data: CurrentBusiness } = useBusiness_GetByBusinessIdQuery({
		businessId: Number(businessId),
	});

	const businessNumber = CurrentBusiness?.business_getByBusinessId?.result?.twilioPhoneNumber?.phoneNumber;

	return (
		<Stack width={'100%'} height={'100vh'} maxHeight={'100vh'} overflow={'auto'} p={2}>
			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'start'}
				position={'relative'}
				width={'100%'}
				height={'100%'}
			>
				<Stack width={'50%'} pt={2}>
					<Body businessNumber={businessNumber} businessId={businessId} />
				</Stack>

				<Stack width={'50%'} position={'relative'}>
					<Box position={'absolute'} right={'16px'} top={'16px'} zIndex={10000}>
						<FilterList setBusinessId={setBusinessId} businessId={businessId} />
					</Box>

					<NoChatPage />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default SocialChannels;
