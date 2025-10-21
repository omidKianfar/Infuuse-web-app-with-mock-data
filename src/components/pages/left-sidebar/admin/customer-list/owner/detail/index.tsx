import { Stack } from '@mui/material';
import React, { useState } from 'react';
import CustomerTableDetail from './table';
import { useRouter } from 'next/router';

import Header from './header';
import { useBusiness_GetDetailsByAdminQuery } from '@/graphql/generated';

const OwnerCustomerListDetail = () => {
	// -------------------------------tools
	const router = useRouter();

	const [searchData, setSearchData] = useState('');
	const [StatusFilter, setStatusFilter] = useState('All Status');

	const BusinessId = router?.query?.businessId;

	const { data: businessDetail } = useBusiness_GetDetailsByAdminQuery({
		businessId: Number(BusinessId),
	});

	const businessDetailData = businessDetail?.business_getDetailsByAdmin?.result;

	return (
		<Stack>
			<Header businessDetailData={businessDetailData} />

			<Stack p={2}>
				{/* <Stack mb={2}>
					<Filters
						searchData={searchData}
						setSearchData={setSearchData}
						StatusFilter={StatusFilter}
						setStatusFilter={setStatusFilter}
					/>
				</Stack> */}
				{/* ----------------------------table */}
				<CustomerTableDetail businessDetailData={businessDetailData} />
			</Stack>
		</Stack>
	);
};

export default OwnerCustomerListDetail;
