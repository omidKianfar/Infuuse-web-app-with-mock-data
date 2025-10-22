import {
	Box,
	Divider,
	Grid,
	MenuItem,
	Stack,
	styled,
	TextField,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import React, { useState } from 'react';

import LightIcon from '@/assets/light-icon';
import CheckGreenIcon from '@/assets/check-green-icon';
import IgnoreIcon from '@/assets/ignore-icon';
import { NextButton } from '@/components/atoms/Button';
import {
	PlanType,
	usePayment_CalculateSubscriptionQuery,
	usePayment_CreateSubscriptionMutation,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { Title } from 'chart.js';

const BodyStandard = () => {
	// -------------------------------tools
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	// -------------------------------states
	const [numberOfUsers, setNumberOfUsers] = useState<number | null>(null);
	const [planType, setPlanType] = useState<PlanType | null>(null);

	// -------------------------------query
	const { data: calcPayment } = usePayment_CalculateSubscriptionQuery({
		input: {
			operatorCount: Number(numberOfUsers),
			planType: planType as PlanType,
		},
	});

	const calcPaymentData = calcPayment?.payment_calculateSubscription?.result;

	const { mutate: createPayment } = usePayment_CreateSubscriptionMutation();

	// ---------------------------- direct page
	const successPageUrl = `${window.location.origin}/subscriptions/success?signup=true`;
	const failedPageUrl = `${window.location.origin}/subscriptions/failed?signup=true`;

	// -------------------------------function
	const AddSubscription = () => {
		if (numberOfUsers && planType) {
			createPayment(
				{
					input: {
						planType: planType as PlanType,
						operatorCount: Number(numberOfUsers),
						successUrl: successPageUrl,
						cancelUrl: failedPageUrl,
						discount: calcPaymentData?.discount,
					},
				},
				{
					onSuccess: (data) => {
						const { status, result } = responseDestructure(data);
						if (status.code == 1) {
							window.location.href = result;
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		} else {
			enqueueSnackbar('Please choose plan type and users number', { variant: 'error' });
		}
	};
	return (
		<Stack position={'relative'} width={'100%'} height={isMobile ? '780px' : '680px'}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
				{' '}
				<Typography fontSize={'18px'} color={theme?.palette?.infuuse.blueDark500} mb={2}>
					Standard
				</Typography>
				<Typography fontSize={'18px'} color={theme?.palette?.infuuse.green300} mb={2}>
					{calcPaymentData?.price ? `$ ${calcPaymentData?.price}` : null}
				</Typography>
			</Stack>

			<Stack>
				<Grid xs={12} container justifyContent={'space-between'} alignItems={'center'}>
					<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
						<CustomTextField
							disabled
							name="paymentType"
							value={planType}
							select
							sx={{ textAlign: 'left', minWidth: '120px' }}
						>
							{PaymentData?.map((item) => (
								<MenuItem
									key={item?.value}
									value={item?.value}
									onClick={() => setPlanType(item?.value)}
								>
									<Typography>{item?.name}</Typography>
								</MenuItem>
							))}
						</CustomTextField>
					</Grid>

					<Grid item xs={12} sm={12} md={12} lg={6} xl={6} mt={isMobile ? 2 : 0}>
						<Stack
							direction={'row'}
							justifyContent={isMobile ? 'start' : 'end'}
							alignItems={'center'}
							pl={isMobile ? 0 : '25%'}
						>
							<Stack direction={'flex'} justifyContent={'center'} alignItems={'center'} pb={3}>
								<LightIcon />
							</Stack>

							<CustomTextField
								disabled
								name="memberCount"
								type="number"
								label="Number of users"
								value={numberOfUsers}
								onChange={(e) => setNumberOfUsers(e.target.value)}
								sx={{ textAlign: 'left', minWidth: '150px' }}
							/>
						</Stack>
					</Grid>
				</Grid>
				<Stack mt={2}>
					<Divider sx={{ bgcolor: theme?.palette?.infuuse.gray500, height: '2px', mb: 2 }} />

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
					<Divider sx={{ bgcolor: theme?.palette?.infuuse.gray500, height: '2px', mb: 2 }} />

					<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2} px={'7.5%'}>
						{planType === PlanType?.Annually && calcPaymentData?.discount && (
							<Box
								display={'flex'}
								justifyContent={'center'}
								alignItems={'center'}
								height={'40px'}
								borderRadius={2}
								sx={{ width: '100px', backgroundColor: theme?.palette?.infuuse?.red300 }}
							>
								<Typography color={theme?.palette?.common?.white} fontWeight={'bold'}>
									{calcPaymentData?.discount ? `$${calcPaymentData?.discount}` : null}
								</Typography>
							</Box>
						)}

						<Stack justifyContent={'center'} alignItems={'end'} width={'100%'}>
							<Typography fontSize={'20px'} color={theme?.palette?.infuuse.green200} fontWeight={'bold'}>
								{calcPaymentData?.price ? `$${calcPaymentData?.price}` : null}
							</Typography>
						</Stack>
					</Stack>

					<Tooltip title="Payment not available yet">
						<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
							<NextButton
								disabled
								onClick={AddSubscription}
								type="submit"
								sx={{ width: '85%', fontSize: '18px', fontWeight: 'bold' }}
							>
								Choose Plan
							</NextButton>
						</Stack>
					</Tooltip>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default BodyStandard;

const PaymentData = [
	{ name: 'Annually', value: PlanType?.Annually },
	{ name: 'Monthly', value: PlanType?.Monthly },
];

const bodyTitle = [
	{
		id: 1,
		icon: 'check',
		title: 'Phone, Email, Chat, SMS, FB, Instagram, Linkedin,Video And Whatsapp.',
	},

	{
		id: 2,
		icon: 'check',
		title: 'HubSpot And Google Analytics Integration',
	},

	{ id: 3, icon: 'check', title: 'SMS Appointment Reminders' },

	{ id: 4, icon: 'check', title: 'Internal Communication Channel' },

	{ id: 5, icon: 'check', title: 'Onboarding Assistance' },

	{ id: 6, icon: 'check', title: 'Advanced Super Admin Control' },

	{ id: 7, icon: 'check', title: 'Unlimited Tags' },

	{ id: 8, icon: 'check', title: 'Enhanced Routing' },

	{ id: 9, icon: 'check', title: 'Single Sign-On' },
];

export const CustomTextField = styled(TextField)(({ theme }) => ({
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
