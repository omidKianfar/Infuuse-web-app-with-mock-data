import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Tabs, Typography, styled, useTheme } from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AllWhatsappNumbers from './all';
import InprogressWhatsappNumbers from './in-progress';
import ConfirmedWhatsappNumbers from './confirmed';
import RejectedWhatsappNumbers from './rejected';

const AdminWhatsappNumbers = () => {
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
							<AllWhatsappNumbers />
						</TabPanel>
						<TabPanel value={'2'} sx={{ px: 0 }}>
							<InprogressWhatsappNumbers />
						</TabPanel>
						<TabPanel value={'3'} sx={{ px: 0 }}>
							<ConfirmedWhatsappNumbers />
						</TabPanel>
						<TabPanel value={'4'} sx={{ px: 0 }}>
							<RejectedWhatsappNumbers />
						</TabPanel>
					</TabContext>
				</Box>
			</Tabs>
		</Stack>
	);
};

export default AdminWhatsappNumbers;

const tabs = [
	{ title: 'All', value: '1' },
	{ title: 'In Progress', value: '2' },
	{ title: 'Confirmed', value: '3' },
	{ title: 'Rejected', value: '4' },
];
