import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React from 'react';
import OwnerCustomerTable from './owner/owner-customer-table';
import AgentCustomerTable from './agent/agent-customer-table';

const CustomerList = () => {
	// -------------------------------tools
	const theme = useTheme();

	// -------------------------------states

	const [value, setValue] = React.useState('1');

	// -------------------------------functions
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<Stack p={'8px 16px'} position={'relative'}>
			<Typography mb={'4px'} fontSize={'18px'} fontWeight={'bold'} color={theme?.palette?.infuuse?.blue100}>
				Customers List
			</Typography>
			
			<Tabs sx={{ width: '100%' }}>
				<Box sx={{ width: '100%' }}>
					<TabContext value={value}>
						{/* ------------------------------- tabs container*/}
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
							{/* ------------------------------- tabs list*/}
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
								{/* ------------------------------- tabs */}
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

						{/* ------------------------------- tabs compnents*/}
						<TabPanel value={'1'} style={{ padding: 0 }}>
							<OwnerCustomerTable />
						</TabPanel>

						<TabPanel value={'2'} style={{ padding: 0 }}>
							<AgentCustomerTable />
						</TabPanel>
					</TabContext>
				</Box>
			</Tabs>
		</Stack>
	);
};

export default CustomerList;

// -------------------------------tabs
const tabs = [
	{ title: 'Owners', value: '1' },
	{ title: 'Agents', value: '2' },
];
