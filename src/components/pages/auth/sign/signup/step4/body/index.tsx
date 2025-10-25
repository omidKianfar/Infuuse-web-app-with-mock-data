import { Box, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Cart, CartBody } from '../styles';
import TwilioIcon from '@/assets/twilio-icon';
import GmailIcon from '@/assets/gmail-icon';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { NextButton } from '@/components/atoms/Button';
import { useRouter } from 'next/router';
import { useBusiness_GetByBusinessIdQuery, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import Image from '@/components/atoms/Image';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SigninWithGoogleSocialChannel from '@/components/pages/settings/social-channels/body/signin-with-google';
import ModalContainer from '@/components/atoms/Modal';
import AddCallBusinessNumberModal from '@/components/pages/settings/social-channels/body/modal';
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';

const Body = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const router = useRouter();

	const { setSignupStepCounter } = useAuth();

	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	const { data: CurrentBusiness } = useBusiness_GetByBusinessIdQuery({
		businessId: Number(CurrentUser?.businessAccesses[0]?.business?.id),
	});

	const businessNumber = CurrentBusiness?.business_getByBusinessId?.result?.twilioPhoneNumber?.phoneNumber;

	const [choosenItem, setChoosenItem] = useState({
		phone: false,
		meta: false,
		whatsapp: false,
		gmail: false,
	});

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

	const finishHandler = () => {
		router.push('/inbox');
		setSignupStepCounter(0);
	};

	return (
		<Stack pl={isMobile ? 0 : '100px'}>
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

			{choosenItem?.gmail && (
				<GoogleOAuthProvider clientId={'YOUR_GOOGLE_CLIENT_ID'}>
					<SigninWithGoogleSocialChannel />
				</GoogleOAuthProvider>
			)}

			{choosenItem?.meta && (
				<Stack>
					<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} mb={1}>
						<Tooltip title="Meta not available yet">
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
						</Tooltip>
					</Stack>
				</Stack>
			)}

			<ModalContainer open={open} handleClose={handleClose}>
				<AddCallBusinessNumberModal
					handleClose={handleClose}
					businessId={CurrentUser?.businessAccesses[0]?.business?.id}
				/>
			</ModalContainer>

			{/* ---------------------------------button  */}
			{isMobile && (
				<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} mb={2} mt={2}>
					<NextButton onClick={finishHandler} sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}>
						Finish
					</NextButton>
				</Stack>
			)}
		</Stack>
	);
};

export default Body;
