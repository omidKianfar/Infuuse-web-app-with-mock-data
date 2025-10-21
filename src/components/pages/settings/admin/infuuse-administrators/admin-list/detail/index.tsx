import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React from 'react';
import ManageAdmin from './manage-admin';

const AdminDetail = () => {
	// ---------------------------tools
	const theme = useTheme();

	// ---------------------------states
	const [value, setValue] = React.useState(1);

	// ---------------------------functions
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
								<Tab
									sx={{ mr: 2 }}
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
											Manage Admin
										</Typography>
									}
									value={1}
								></Tab>
							</TabList>
						</Stack>

						{/* ------------------------------- tabs compnents*/}
						<TabPanel value={1} style={{ padding: '16px 8px 0 8px ' }}>
							<ManageAdmin />
						</TabPanel>
					</TabContext>
				</Box>
			</Tabs>
		</Stack>
	);
};

export default AdminDetail;
