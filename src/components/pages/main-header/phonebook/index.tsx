import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Tabs, Typography, styled, useTheme } from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AllPhonebook from './all';
import ConvertPhonebook from './converted';
import IncomingCallPhonebook from './incoming-call';
import LeadPhonebook from './lead';
import MissedCallPhonebook from './missed-call';

const Phonebook = () => {
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
												<ArrowBackIosIcon />
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
												<ArrowForwardIosIcon />
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
						<TabPanel value={'1'} sx={{ px: 0 }}>
							<AllPhonebook />
						</TabPanel>
						<TabPanel value={'2'} sx={{ px: 0 }}>
							<LeadPhonebook />
						</TabPanel>
						<TabPanel value={'3'} sx={{ px: 0 }}>
							<ConvertPhonebook />
						</TabPanel>
						<TabPanel value={'4'} sx={{ px: 0 }}>
							<MissedCallPhonebook />
						</TabPanel>
						<TabPanel value={'5'} sx={{ px: 0 }}>
							<IncomingCallPhonebook />
						</TabPanel>
					</TabContext>
				</Box>
			</Tabs>
		</Stack>
	);
};

export default Phonebook;

const tabs = [
	{ title: 'All Calls', value: '1' },
	{ title: 'Lead', value: '2' },
	{ title: 'Converted', value: '3' },
	{ title: 'Missed Call', value: '4' },
	{ title: 'Incoming Call', value: '5' },
];
