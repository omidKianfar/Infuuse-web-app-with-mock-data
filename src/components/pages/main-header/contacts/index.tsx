import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LeadContactList from './table/lead/lead-contacts';
import { useUser_GetCurrentUserQuery } from '@/graphql/generated';
import AllContactList from './table/all/all-contacts';
import AppointmentContactList from './table/appoinment/appointment-contacts';

const Contacts = () => {
	// -------------------------------tools
	const theme = useTheme();

	// -------------------------------states
	const [value, setValue] = React.useState('1');

	// -------------------------------functions
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// ------------------------------- state
	const [businessId, setBusinessId] = useState(null);

	useEffect(() => {
		if (businessId === null) setBusinessId(CurrentUser?.businessAccesses?.[0]?.business?.id);
	}, [businessId]);

	// // ------------------------------- modal
	// const [open, setOpen] = React.useState(false);

	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);

	// const handelModal = () => {
	// 	handleOpen();
	// };

	return (
		<Stack position={'relative'} width={'100%'} height={'100%'} p={2}>
			{/* <Box position={'absolute'} top={'16px'} right={'16px'} zIndex={1000}>
				<NextButton sx={{ width: '270px' }} onClick={handelModal}>
					Add Contact
				</NextButton>
			</Box> */}

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
						<TabPanel value={'1'} sx={{ px: 0 }}>
							<AllContactList businessId={businessId} setBusinessId={setBusinessId} />
						</TabPanel>

						<TabPanel value={'2'} sx={{ px: 0 }}>
							<LeadContactList businessId={businessId} setBusinessId={setBusinessId} />
						</TabPanel>

						<TabPanel value={'3'} sx={{ px: 0 }}>
							<AppointmentContactList businessId={businessId} setBusinessId={setBusinessId} />
						</TabPanel>
					</TabContext>
				</Box>
			</Tabs>
			{/* <ModalContainer open={open} handleClose={handleClose}>
				<AddContactModal handleClose={handleClose} />
			</ModalContainer> */}
		</Stack>
	);
};

export default Contacts;

const tabs = [
	{ title: 'All Contacts', value: '1' },
	{ title: 'Lead', value: '2' },
	{ title: 'Appointment Scheduled', value: '3' },
];
