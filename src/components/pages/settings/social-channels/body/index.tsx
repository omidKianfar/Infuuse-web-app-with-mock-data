import { Box, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Cart, CartBody } from '../styles';
import TwilioIcon from '@/assets/twilio-icon';
import GmailIcon from '@/assets/gmail-icon';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ModalContainer from '@/components/atoms/Modal';
import AddCallBusinessNumberModal from './modal';
import Image from '@/components/atoms/Image';
import SigninWithGoogleSocialChannel from './signin-with-google';
import { useBusiness_SetGmailAuthCodeMutation, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';

interface Props {
	businessNumber: string | null | undefined;
	businessId: number | undefined;
}

const Body = ({ businessNumber, businessId }: Props) => {
	// ------------------------------- query
	const { data: User } = useUser_GetCurrentUserQuery();
	const userBusinessId = User?.user_getCurrentUser?.result?.businessAccesses?.[0]?.business?.id;

	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const gmailState = router?.query?.state;
	const gmailCode = router?.query?.code;

	// -------------------------------states
	const [choosenItem, setChoosenItem] = useState({
		phone: false,
		meta: false,
		whatsapp: false,
		gmail: false,
	});

	// ------------------------------- query
	const { mutate: SetGmailCode } = useBusiness_SetGmailAuthCodeMutation();

	// ------------------------------- function
	useEffect(() => {
		if (gmailState && gmailCode && userBusinessId) {
			SetGmailCode(
				{
					input: {
						code: gmailCode as string,
						state: gmailState as string,
						businessId: Number(businessId || userBusinessId),
					},
					callbackUrl: `${window.location.origin}/social-channels`,
				},
				{
					onSuccess: (data) => {
						const { status, result } = responseDestructure(data);
						if (status.code == 1) {
							enqueueSnackbar('Operation was successful', { variant: 'success' });
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}
	}, [gmailState, gmailCode, userBusinessId]);

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	const handelPhone = () => {
		setChoosenItem({ phone: true, meta: false, whatsapp: false, gmail: false });
		handelModal();
	};

	return (
		<Stack>
			<Cart
				direction="row"
				justifyContent="start"
				alignItems="center"
				onClick={handelPhone}
				bgcolor={choosenItem?.phone ? theme?.palette?.infuuse.green400 : 'none'}
			>
				<CartBody bgcolor={theme?.palette?.infuuse.gray200}>
					<TwilioIcon />
				</CartBody>

				<Typography
					fontSize={'16px'}
					color={choosenItem?.phone ? theme?.palette?.common?.white : theme?.palette?.infuuse.blueLight300}
				>
					{businessNumber ? businessNumber : 'Phone/SMS/Video Call'}
				</Typography>
			</Cart>
			{/* ---------------------------------whatsapp  */}
			<Cart
				direction="row"
				justifyContent="start"
				alignItems="center"
				onClick={() => setChoosenItem({ phone: false, meta: false, whatsapp: true, gmail: false })}
				bgcolor={choosenItem?.whatsapp ? theme?.palette?.infuuse.green400 : 'none'}
			>
				<CartBody bgcolor={theme?.palette?.infuuse.gray200}>
					<WhatsAppIcon sx={{ fill: theme?.palette?.infuuse.green300, fontSize: '32px' }} />
				</CartBody>

				<Typography
					fontSize={'16px'}
					color={choosenItem?.whatsapp ? theme?.palette?.common?.white : theme?.palette?.infuuse.blueLight300}
				>
					Whatsapp{' '}
				</Typography>
			</Cart>

			{/* ---------------------------------meta */}
			<Cart
				direction="row"
				justifyContent="start"
				alignItems="center"
				onClick={() => setChoosenItem({ phone: false, meta: true, whatsapp: false, gmail: false })}
				bgcolor={choosenItem?.meta ? theme?.palette?.infuuse.green400 : 'none'}
			>
				<CartBody bgcolor={theme?.palette?.infuuse.gray200}>
					<Image src={'images/meta-icon.svg'} style={{ width: '32px', height: '32px' }} />
				</CartBody>
				<Typography
					fontSize={'16px'}
					color={choosenItem?.meta ? theme?.palette?.common?.white : theme?.palette?.infuuse.blueLight300}
				>
					Meta{' '}
				</Typography>
			</Cart>

			{/* ---------------------------------gmail  */}
			<Cart
				direction="row"
				justifyContent="start"
				alignItems="center"
				onClick={() => setChoosenItem({ phone: false, meta: false, whatsapp: false, gmail: true })}
				bgcolor={choosenItem?.gmail ? theme?.palette?.infuuse.green400 : 'none'}
			>
				<CartBody bgcolor={theme?.palette?.infuuse.gray200}>
					<GmailIcon
						fill={{
							fill1: '#EA4335',
							fill2: '#FBBC05',
							fill3: '#34A853',
							fill4: '#C5221F',
							fill5: '#4285F4',
						}}
					/>
				</CartBody>
				<Typography
					fontSize={'16px'}
					color={choosenItem?.gmail ? theme?.palette?.common?.white : theme?.palette?.infuuse.blueLight300}
				>
					Gmail
				</Typography>
			</Cart>

			{choosenItem?.gmail && <SigninWithGoogleSocialChannel />}

			{choosenItem?.meta && (
				<Stack>
					<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} mb={1}>
						<Box
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
							bgcolor={theme?.palette?.infuuse?.blue500}
							borderRadius={3}
							boxShadow={2}
							width={'275px'}
							height={'48px'}
						>
							<Image src={'images/meta-icon.svg'} style={{ width: '32px', height: '32px' }} />

							<Typography ml={1} color={theme?.palette?.common?.white} fontWeight={'bold'}>
								Sign in with meta
							</Typography>
						</Box>
					</Stack>
				</Stack>
			)}

			<ModalContainer open={open} handleClose={handleClose}>
				<AddCallBusinessNumberModal handleClose={handleClose} businessId={businessId || userBusinessId} />
			</ModalContainer>
		</Stack>
	);
};

export default Body;

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.infuuse?.green400,
		borderRadius: '16px',
		height: '40px',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,
			height: '40px',

			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse?.green400,
			height: '40px',

			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse?.green400,
			height: '40px',

			// borderRadius: "16px",
		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.green400,
		},
	},
	'& label.Mui-focused': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'&.MuiFormLabel-root .Mui-disabled': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'& label.Mui-root': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
}));
