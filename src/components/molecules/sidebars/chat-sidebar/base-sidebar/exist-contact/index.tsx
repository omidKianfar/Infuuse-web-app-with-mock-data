import { Box, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import { BaseSidebarContext } from '..';
import CloseIconBox from '@/assets/close-icon-box';
import ContactSearch from '@/components/atoms/search/contact-search';
import {  useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { NextButton } from '@/components/atoms/Button';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import ModalContainer from '@/components/atoms/Modal';
import AddExistContactModal from './modal/add-to-exist-contact-modal';

const ExistContactSidebar = () => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	// -------------------------------context
	const { sidebars, setSidebars } = useContext(BaseSidebarContext);

	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// -------------------------------states
	const [BusinessId, setBusinessId] = useState<number>(Number(CurrentUser?.businessAccesses[0]?.business?.id));

	const [choosenContactId, setChoosenContactId] = useState<number | null>(null);
	const [choosenContactName, setChoosenContactName] = useState<string | null>(null);

	const mergContactHandler = () => {
		handelModal();
	};

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		if (choosenContactId) {
			handleOpen();
		} else {
			enqueueSnackbar('Please choose a contact', { variant: 'error' });
		}
	};

	return (
		<Stack
			width={'360px'}
			height={'100%'}
			sx={{
				overflowY: 'auto',
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				scrollbarWidth: 'none',
				scrollbarColor: 'transparent transparent',
			}}
			bgcolor={theme?.palette?.infuuse?.gray200}
			p={2}
			borderRadius={2}
		>
			{/* -------------------------------header */}
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
				<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'} fontSize={'18px'}>
					Add To Exist Contact
				</Typography>

				<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
					<Box
						sx={{ cursor: 'pointer' }}
						onClick={() =>
							setSidebars({
								...sidebars,
								existContact: false,
							})
						}
					>
						<CloseIconBox />
					</Box>
				</Stack>
			</Stack>

			{/* -------------------------------saerch */}
			<ContactSearch
				BusinessId={BusinessId}
				choosenContactId={choosenContactId}
				setChoosenContactId={setChoosenContactId}
				choosenContactName={choosenContactName}
				setChoosenContactName={setChoosenContactName}
			/>

			<Stack mt={4}>
				<NextButton onClick={mergContactHandler}>Save</NextButton>
			</Stack>

			<ModalContainer open={open} handleClose={handleClose}>
				<AddExistContactModal handleClose={handleClose} choosenContactId={choosenContactId} />
			</ModalContainer>
		</Stack>
	);
};

export default ExistContactSidebar;

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
	// ["@media (max-width:600px)"]: {

	// },

	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '48px',

		'& .MuiInputBase-input': {
			color: theme?.palette?.infuuse.blueLight400,
			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
			// borderRadius: "16px",
		},
	},
}));
