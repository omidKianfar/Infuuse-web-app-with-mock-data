import { Stack } from '@mui/material';
import React from 'react';
import LogSubscriptionList from './table';
import SubscriptionChart from './chart';

const LogSubscriptions = () => {
	return (
		<Stack>
			<SubscriptionChart />
			<LogSubscriptionList />
		</Stack>
	);
};

export default LogSubscriptions;
