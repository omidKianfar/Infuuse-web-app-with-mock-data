import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React from 'react';
import ManageMembers from './manage-member';
import BusinessList from './business-list/business-member';
import AddToBusiness from './add-to-business';

const AgencyMemberDetail = () => {
	// ---------------------------tools
	const theme = useTheme();

	// ---------------------------states
	const [value, setValue] = React.useState('1');

	// ---------------------------functions
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<Stack p={2}>
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
						<TabPanel value={'1'} style={{ padding: '16px 8px 0 8px ' }}>
							<ManageMembers />
						</TabPanel>

						<TabPanel value={'2'} style={{ padding: '16px 8px 0 8px ' }}>
							<AddToBusiness />
						</TabPanel>

						<TabPanel value={'3'} style={{ padding: '16px 8px 0 8px ' }}>
							<BusinessList />
						</TabPanel>
					</TabContext>
				</Box>
			</Tabs>
		</Stack>
	);
};

export default AgencyMemberDetail;

const tabs = [
	{ title: 'Manage Member', value: '1' },
	{ title: 'Add To Business', value: '2' },
	{ title: 'Assignments', value: '3' },
];
