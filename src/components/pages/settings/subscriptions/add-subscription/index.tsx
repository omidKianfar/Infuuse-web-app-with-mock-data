import { Box, InputAdornment, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { NextButton } from '@/components/atoms/Button';
import UserIcon from '@/assets/user-icon';
import {
	PlanType,
	useAgency_GetAccountStateQuery,
	useBusiness_GetAccountStateQuery,
	usePayment_CalculateSubscriptionQuery,
	usePayment_CreateSubscriptionMutation,
	usePaymentHistory_CheckActiveSubscriptionQuery,
	UserType,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { Footer, Label, MemberContainer } from '../styles';
import { enqueueSnackbar } from 'notistack';
import { responseDestructure } from '@/utils';
import AddOperator from './modal/add-operator';
import ModalContainer from '@/components/atoms/Modal';
import LightIcon from '@/assets/light-icon';


const AddSubscription = () => {
	const theme = useTheme()

	// -------------------------------states
	const [numberOfUsers, setNumberOfUsers] = useState<string>('')
	const [planType, setPlanType] = useState<PlanType | null>(null)


	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	const { data: calcPayment } = usePayment_CalculateSubscriptionQuery({
		input: {
			operatorCount: Number(numberOfUsers),
			planType: planType as PlanType,
		}
	})

	const calcPaymentData = calcPayment?.payment_calculateSubscription?.result

	// business member query
	const { data: paymentActive } = usePaymentHistory_CheckActiveSubscriptionQuery();
	const paymentActiveData = paymentActive?.paymentHistory_checkActiveSubscription?.result;

	const { data: BusinessState } = useBusiness_GetAccountStateQuery();
	const BusinessStateData = BusinessState?.business_getAccountState?.result

	const { data: AgencyState } = useAgency_GetAccountStateQuery()
	const AgencyStateData = AgencyState?.agency_getAccountState?.result

	const { mutate: createPayment } = usePayment_CreateSubscriptionMutation()

	// ---------------------------- direct page
	const successPageUrl = `${window.location.origin}/subscriptions/success`
	const failedPageUrl = `${window.location.origin}/subscriptions/failed`

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
						discount: calcPaymentData?.discount
					},
				},
				{
					onSuccess: (data) => {
						const { status, result } = responseDestructure(data);
						if (status.code == 1) {
							window.location.href = result
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		} else {
			enqueueSnackbar('Please choose plan type and users number', { variant: 'error' });
		}
	}

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};
	return (
		<Stack width={'100%'} height={'100%'}>
			<MemberContainer>
				{/* -------------------------------form */}
				<Stack position={'relative'}>
					{paymentActiveData === false &&
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
							<Stack width={'50%'}>
								<Label mb={'4px'}>Choose A Plan</Label>

								<CustomTextField name="chooseAPlan" fullWidth value={planType} select>
									{PaymentData?.map((item) => (
										<MenuItem key={item?.value} value={item?.value} onClick={() => setPlanType(item?.value)}>
											<Typography>{item?.name}</Typography>
										</MenuItem>
									))}
								</CustomTextField>
							</Stack>

							<Stack width={'50%'}>
								<Label mb={'4px'}>Number Of Users</Label>

								<CustomTextField
									value={numberOfUsers}
									name="numberOfUsers"
									type='number'
									fullWidth
									onChange={(e) => setNumberOfUsers(e.target.value)}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<UserIcon />
											</InputAdornment>
										),
									}}
								/>
							</Stack>
						</Stack>}

					{calcPaymentData && <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2} mt={2}>
						<Stack width={'50%'} >
							<Label mb={'4px'}>Price</Label>

							<CustomTextField
								value={calcPaymentData?.price}
								disabled
								type="number"
								name="price"
								fullWidth
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>,
								}}
							/>
						</Stack>
						<>
							{planType === PlanType?.Annually &&
								<Stack width={'50%'}>
									<Label mb={'4px'}>Discount</Label>

									<CustomTextField
										value={calcPaymentData?.discount < 0 ? calcPaymentData?.discount * -1 : calcPaymentData?.discount}
										disabled
										name="discount"
										type="number"
										fullWidth
										InputProps={{
											startAdornment: <InputAdornment position="start">$</InputAdornment>,
										}}
									/>
								</Stack>
							}
						</>

					</Stack>}


				</Stack>

				{/* ------------------------------- footer */}
				<Footer>
					{paymentActiveData === false ?
						<Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'} px={2} width={'95%'}>
							<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={1} width={'75%'}>
								<LightIcon />
								<Label sx={{ wordBreak: 'break-word', wordWrap: 'break-word', textWrap: 'wrap', color: theme?.palette?.infuuse?.blue500, fontSize: '16px' }}>
									{`You currently have given operator access to ${CurrentUser?.user?.userType === UserType?.BusinessMember ? BusinessStateData?.activeOperatorCount : AgencyStateData?.activeOperatorCount}  members of your team.`}
								</Label>
							</Stack>

							<NextButton onClick={AddSubscription} sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}>
								Add Subscription
							</NextButton>
						</Stack>
						:
						<Stack width={'100%'} direction={'row'} justifyContent={'center'} alignItems={'center'} >
							<Box bgcolor={theme?.palette?.infuuse?.blue100} borderRadius={2} p={'8px 16px'} width={'95%'} textAlign={'center'}>
								<Typography color={theme?.palette?.common?.white} sx={{ wordBreak: 'break-word', wordWrap: 'break-word', textWrap: 'wrap', }}>
									You currently have an active subscription. Before purchasing a new one you need to cancel the current subscription. You will be refunded for the remaining time.
								</Typography>
							</Box>

						</Stack>
					}
					{paymentActiveData === true &&
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={2} boxShadow={2} p={'12px 16px'} borderRadius={4} width={'95%'}>
							<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={1} width={'75%'}>
								<LightIcon />
								<Label sx={{ wordBreak: 'break-word', wordWrap: 'break-word', textWrap: 'wrap', color: theme?.palette?.infuuse?.blue500, fontSize: '16px' }}>
									{`You currently have given operator seats access to ${CurrentUser?.user?.userType === UserType?.BusinessMember ? BusinessStateData?.activeOperatorCount : AgencyStateData?.activeOperatorCount}  members of your team.`}
								</Label>
							</Stack>


							<Stack width={'25%'} direction={'row'} justifyContent={'end'} alignItems={'center'} >
								<NextButton sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }} onClick={handelModal}>
									Add Seats
								</NextButton>

							</Stack>
						</Stack>}
				</Footer>
			</MemberContainer>

			<ModalContainer open={open} handleClose={handleClose}>
				<AddOperator handleClose={handleClose} operatorData={CurrentUser?.user?.userType === UserType?.BusinessMember ? BusinessStateData : AgencyStateData} />
			</ModalContainer>
		</Stack>
	);
};

export default AddSubscription;

const PaymentData = [
	{ name: 'Annually', value: PlanType?.Annually },
	{ name: 'Monthly', value: PlanType?.Monthly },
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