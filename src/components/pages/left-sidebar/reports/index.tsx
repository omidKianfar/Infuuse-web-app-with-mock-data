import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BestConversationChannel from './best-conversation-channel';
import AvrageResponseTime from './avrage-response-time';
import TeamPreference from './team-preference';
import AvrageTimeNewLeadOnHold from './average-time-on-hold';
import SmsTRansition from './sms-transition';
import Tag from './tag';
import CustomAnalytics from './cutom-analytics';
import Tickets from './tickets';
const Reports = () => {
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
								variant="scrollable"
								ScrollButtonComponent={(props) => {
									if (props.direction === 'left' && !props.disabled) {
										return (
											<Box
												{...props}
												sx={{
													color: theme?.palette?.common?.black,
													ml: 1,
													display: 'flex',
													alignItems: 'center',
													cursor: 'pointer',
												}}
											>
												<ArrowBackIosIcon sx={{ fill: theme?.palette?.infuuse?.blue100 }} />
											</Box>
										);
									} else if (props.direction === 'right' && !props.disabled) {
										return (
											<Box
												{...props}
												sx={{
													color: theme?.palette?.common?.black,
													ml: 1,
													display: 'flex',
													alignItems: 'center',
													cursor: 'pointer',
												}}
											>
												<ArrowForwardIosIcon sx={{ fill: theme?.palette?.infuuse?.blue100 }} />
											</Box>
										);
									} else {
										return null;
									}
								}}
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
						<TabPanel value={'1'} sx={{ p: 0 }}>
							<BestConversationChannel />
						</TabPanel>

						<TabPanel value={'2'} sx={{ p: 0 }}></TabPanel>

						<TabPanel value={'3'} sx={{ p: 0 }}>
							<Tickets />
						</TabPanel>

						<TabPanel value={'4'} sx={{ p: 0 }}>
							<AvrageResponseTime />
						</TabPanel>

						<TabPanel value={'5'} sx={{ p: 0 }}>
							<SmsTRansition />
						</TabPanel>

						<TabPanel value={'6'} sx={{ p: 0 }}>
							<TeamPreference />
						</TabPanel>

						<TabPanel value={'7'} sx={{ p: 0 }}>
							<CustomAnalytics />
						</TabPanel>

						<TabPanel value={'8'} sx={{ p: 0 }}>
							<AvrageTimeNewLeadOnHold />
						</TabPanel>

						<TabPanel value={'9'} sx={{ p: 0 }}>
							<Tag />
						</TabPanel>
					</TabContext>
				</Box>
			</Tabs>
		</Stack>
	);
};

export default Reports;

const tabs = [
	{ title: 'Best Conversion Channel', value: '1' },
	{ title: 'Google Analytics', value: '2' },
	{ title: 'Tickets', value: '3' },
	{ title: 'Average Response Time', value: '4' },
	{ title: 'Transcription', value: '5' },
	{ title: 'Team Performance', value: '6' },
	{ title: 'Customer Analytics', value: '7' },
	{ title: 'Average Time On Hold', value: '8' },
	{ title: 'Tag', value: '9' },
];
