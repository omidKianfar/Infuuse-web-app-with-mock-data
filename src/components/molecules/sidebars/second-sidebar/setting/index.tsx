import React from 'react';
import { CustomSidebarLayout, Sidebar } from '../styles';
import HeaderSettingSidebar from './header';
import BodySettingSidebar from './body';
import { Stack, Typography, useTheme } from '@mui/material';
import LogoutIcon from '@/assets/logout-icon';
import ModalContainer from '@/components/atoms/Modal';
import LogoutModal from './modal/logout-modal';
import CallNow from '../call-now';

const SettingSidebar = () => {
	const theme = useTheme();

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	return (
		<CustomSidebarLayout direction={'column'} justifyContent={'start'} alignItems={'center'} position={'relative'}>
			

			<Sidebar>
				<HeaderSettingSidebar />

				<BodySettingSidebar />
				<Stack position={'absolute'} bottom={'24px'} left={'24px'} width={'100px'}>
					<Stack
						onClick={handelModal}
						sx={{ cursor: 'pointer' }}
						direction={'row'}
						justifyContent={'start'}
						alignItems={'center'}
					>
						<LogoutIcon />
						<Typography
							sx={{
								ml: 2,
								fontSize: '18px',
								color: theme?.palette?.common?.black,
								'&:hover': {
									color: theme?.palette?.infuuse.blue500,
								},
							}}
						>
							Logout
						</Typography>
					</Stack>
				</Stack>
			</Sidebar>

			{/* ------------------------------- modals */}
			{/* logout */}
			<ModalContainer open={open} handleClose={handleClose}>
				<LogoutModal handleClose={handleClose} />
			</ModalContainer>
		</CustomSidebarLayout>
	);
};

export default SettingSidebar;
