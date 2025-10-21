import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React from 'react';
import AddMember from './add-member';
import { UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import BusinessMemberTable from './business-member/business-member';
import AgencyMemberTable from './agency-member/agency-member';

const Members = () => {
	// -------------------------------tools
	const theme = useTheme();

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// -------------------------------states
	const [value, setValue] = React.useState(
		CurrentUser?.user?.userType === UserType?.BusinessMember &&
			CurrentUser?.businessAccesses?.[0]?.access?.isManageBusinessUserAccess
			? '1'
			: CurrentUser?.user?.userType === UserType?.AgencyMember
			? '1'
			: '2'
	);

	// -------------------------------functions
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

								{(CurrentUser?.user?.userType === UserType?.BusinessMember &&
									CurrentUser?.businessAccesses?.[0]?.access?.isManageBusinessUserAccess) ||
								CurrentUser?.user?.userType === UserType?.AgencyMember ? (
									<Tab
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
												Add Member
											</Typography>
										}
										value={'1'}
									></Tab>
								) : null}

								<Tab
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
											Business Members
										</Typography>
									}
									value={'2'}
								></Tab>

								{/* tab agency member */}
								{CurrentUser?.user?.userType === UserType?.AgencyMember && (
									<Tab
										sx={{ mr: 2 }}
										label={
											<Typography
												sx={{
													textTransform: 'none',
													fontSize: value === '3' ? '16px' : '16px',
													fontWeight: value === '3' ? 600 : 400,
													position: 'relative',
													color: theme?.palette?.infuuse.blue200,
												}}
											>
												My Members
											</Typography>
										}
										value={'3'}
									></Tab>
								)}
							</TabList>
						</Stack>

						{/* ------------------------------- tabs compnents*/}
						{/* add member for agency and business */}

						<TabPanel value={'1'} style={{ padding: '16px 8px 0 8px ' }}>
							<AddMember />
						</TabPanel>

						{/* business members for agency and business */}
						<TabPanel value={'2'} style={{ padding: '16px 8px 0 8px ' }}>
							<BusinessMemberTable />
						</TabPanel>

						{/* agency members */}
						{CurrentUser?.user?.userType === UserType?.AgencyMember && (
							<TabPanel value={'3'} style={{ padding: '16px 8px 0 8px ' }}>
								<AgencyMemberTable />
							</TabPanel>
						)}
					</TabContext>
				</Box>
			</Tabs>
		</Stack>
	);
};

export default Members;
