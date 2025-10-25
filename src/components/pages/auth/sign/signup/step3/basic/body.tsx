import CheckGreenIcon from '@/assets/check-green-icon';
import IgnoreIcon from '@/assets/ignore-icon';
import { Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { NextButton } from '@/components/atoms/Button';
import { useSnapshot } from 'valtio';
import userTypeStore from '@/store/userType.store';
import { UserType } from '@/graphql/generated';
import { useRouter } from 'next/router';
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';

const BodyBasic = () => {
	const theme = useTheme();
	const router = useRouter();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const { setSignupStepCounter } = useAuth();

	const { userType } = useSnapshot(userTypeStore);

	const routerHandler = () => {
		if (userType === UserType?.BusinessMember) {
			setSignupStepCounter(3)
		} else {
			router?.push('/businesses')
			setSignupStepCounter(0);
		}

	}

	return (
		<Stack position={'relative'} width={'100%'} height={isMobile ? '700px' : '680px'}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
				<Typography fontSize={'18px'} color={theme?.palette?.infuuse.blueDark500} mb={2}>
					Basic
				</Typography>

				<Typography fontSize={'18px'} color={theme?.palette?.infuuse.green200} mb={2}>
					Free
				</Typography>
			</Stack>

			<Stack>
				<Typography fontSize={'14px'} color={theme?.palette?.infuuse.blueLight200} mb={2}>
					Start Your 14 Day Free Trial
				</Typography>
				<Divider sx={{ bgcolor: theme?.palette?.infuuse.gray500, height: '2px' }} />
			</Stack>

			<Stack mt={2}>
				{bodyTitle?.map((item) => (
					<Stack key={item?.id} direction={'row'} mb={1}>
						{item?.icon === 'check' ? <CheckGreenIcon /> : <IgnoreIcon />}
						<Typography fontSize={'14px'} color={theme?.palette?.infuuse.blueLight200} mb={2} ml={2}>
							{item?.icon === 'ignore' ? <del>{item?.title}</del> : item?.title}
						</Typography>
					</Stack>
				))}
			</Stack>

			<Stack position={'absolute'} bottom={0} left={0} width={'100%'}>
				<Divider sx={{ bgcolor: theme?.palette?.infuuse.gray500, height: '2px', mb: 4 }} />

				<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
					<NextButton
						onClick={routerHandler}
						type="submit"
						sx={{ width: '85%', fontSize: '18px', fontWeight: 'bold' }}
					>
						Get Started Free
					</NextButton>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default BodyBasic;

const bodyTitle = [
	{ id: 1, icon: 'check', title: 'Only Three Channels During The Trial' },

	{
		id: 2,
		icon: 'ignore',
		title: 'Phone, Email, Chat, SMS, FB, Instagram, Linkedin,Video And Whatsapp.',
	},

	{ id: 3, icon: 'check', title: 'HubSpot And Google Analytics Integration  ' },

	{ id: 4, icon: 'check', title: 'SMS Appointment Reminders' },

	{ id: 5, icon: 'check', title: 'Internal Communication Channel' },

	{ id: 6, icon: 'check', title: 'Onboarding Assistance' },

	{ id: 7, icon: 'check', title: 'Advanced Super Admin Control' },

	{ id: 8, icon: 'check', title: 'Unlimited Tags' },

	{ id: 9, icon: 'check', title: 'Enhanced Routing' },

	{ id: 10, icon: 'check', title: 'Single Sign-On' },
];
