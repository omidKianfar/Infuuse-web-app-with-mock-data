import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React from 'react';
import LogSubscriptions from './log-subscriptions';
import AddSubscriptionAgency from './add-subscription/agency';

const AgencySubscriptions = () => {
	const theme = useTheme();
	const [value, setValue] = React.useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	return (
		<Stack p={2}>
			<Tabs sx={{ width: '100%' }}>
				<Box sx={{ width: '100%' }}>
					<TabContext value={value}>
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
							<TabList
								textColor={theme?.palette?.infuuse.blue200}
								width={'100%'}
								TabIndicatorProps={{
									sx: {
										backgroundColor: theme?.palette?.infuuse.blue200,
										height: '3px',
									},
								}}
								onChange={handleChange}
								aria-label="lab API tabs example"
								sx={{ width: '100%' }}
							>
								{tabs?.map((item) => (
									<Tab
										key={item?.value}
										sx={{ mr: 2 }}
										label={
											<Typography
												sx={{
													textTransform: 'none',
													fontSize: value === item?.value ? '16px' : '16px',
													fontWeight: value === item?.value ? 600 : 400,
													position: 'relative',
													color: theme?.palette?.infuuse.blue200,
												}}
											>
												{item?.title}
											</Typography>
										}
										value={item?.value}
									></Tab>
								))}
							</TabList>
						</Stack>

						{/* tabs */}
						<TabPanel value={'1'} sx={{ p: '16px 0' }}>
							<AddSubscriptionAgency />
						</TabPanel>
						<TabPanel value={'2'} sx={{ p: '16px 0' }}>
							<LogSubscriptions />
						</TabPanel>
					</TabContext>
				</Box>
			</Tabs>
		</Stack>
	);
};

export default AgencySubscriptions;

const tabs = [
	{ title: 'Subscription For Agency', value: '1' },
	{ title: 'revenue Log', value: '2' },
];
