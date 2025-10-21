import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React from 'react';
import HubspotTable from './hubspot-table';
import HobspotLoginLogout from './login/logout';
import { useUser_GetCurrentUserQuery } from '@/graphql/generated';

const Hubspot = () => {
	const theme = useTheme();
	const [value, setValue] = React.useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

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
								<Tab
									key={'1'}
									sx={{ mr: 2 }}
									label={
										<Typography
											sx={{
												textTransform: 'none',
												fontSize: value === '1' ? '16px' : '16px',
												fontWeight: value === '1' ? 600 : 400,
												position: 'relative',
												color: theme?.palette?.infuuse.blue200,
											}}
										>
											HubSpot Contacts
										</Typography>
									}
									value={'1'}
								></Tab>

								{CurrentUser?.isBusinessOwner &&
									<Tab
										key={'2'}
										sx={{ mr: 2 }}
										label={
											<Typography
												sx={{
													textTransform: 'none',
													fontSize: value === '2' ? '16px' : '16px',
													fontWeight: value === '2' ? 600 : 400,
													position: 'relative',
													color: theme?.palette?.infuuse.blue200,
												}}
											>
												log in/log out
											</Typography>
										}
										value={'2'}
									></Tab>}
							</TabList>
						</Stack>

						{/* tabs */}
						<TabPanel value={'1'} sx={{ p: '16px 0' }}>
							<HubspotTable CurrentUser={CurrentUser} />
						</TabPanel>
						<TabPanel value={'2'} sx={{ p: '16px 0' }}>
							<HobspotLoginLogout CurrentUser={CurrentUser} />
						</TabPanel>
					</TabContext>
				</Box>
			</Tabs>
		</Stack>
	);
};

export default Hubspot;

