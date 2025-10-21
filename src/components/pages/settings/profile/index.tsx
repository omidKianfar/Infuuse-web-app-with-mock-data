import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import ProfileBody from './Profile-body';

const Profile = () => {
	// -------------------------------tools
	const theme = useTheme();
	
	// -------------------------------states
	const [value, setValue] = useState(1);

	// -------------------------------functions
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	return (
		<Stack p={2}>
			<Tabs sx={{ width: '100%' }}>
				<Box sx={{ width: '100%' }}>
					<TabContext value={value}>
						{/* -------------------------------tab container */}
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
							{/* -------------------------------tabs */}
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
								{/* ------------------------------- tab */}
								<Tab
									sx={{ mr: 4 }}
									label={
										<Typography
											sx={{
												textTransform: 'none',
												fontSize: value === 1 ? '16px' : '16px',
												fontWeight: value === 1 ? 600 : 400,
												position: 'relative',
												color: theme?.palette?.infuuse.blue200,
											}}
										>
											Profile
										</Typography>
									}
									value={1}
								></Tab>
							</TabList>
						</Stack>
						{/* ------------------------------- tabs compnents*/}
						<TabPanel value={1} style={{ padding: '16px 8px 0 8px ' }}>
							<ProfileBody />{' '}
						</TabPanel>
					</TabContext>
				</Box>
			</Tabs>
		</Stack>
	);
};

export default Profile;
