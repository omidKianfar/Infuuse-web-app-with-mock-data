import { Stack } from '@mui/material';
import React, { useState } from 'react';
import CustomerTableDetail from './table';
import { useRouter } from 'next/router';

import Header from './header';
import { useAgency_GetDetailsByAdminQuery } from '@/graphql/generated';

const AgencyCustomerListDetail = () => {
	// -------------------------------tools
	const router = useRouter();

	const [searchData, setSearchData] = useState('');
	const [StatusFilter, setStatusFilter] = useState('All Status');

	const AgencyId = router?.query?.agencyId;

	const { data: agencyDetail } = useAgency_GetDetailsByAdminQuery({
		agencyId: Number(AgencyId),
	});

	const agencyDetailData = agencyDetail?.agency_getDetailsByAdmin?.result;

	return (
		<Stack>
			<Header agencyDetailData={agencyDetailData} />

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
				<CustomerTableDetail agencyDetailData={agencyDetailData} />
			</Stack>
		</Stack>
	);
};

export default AgencyCustomerListDetail;
