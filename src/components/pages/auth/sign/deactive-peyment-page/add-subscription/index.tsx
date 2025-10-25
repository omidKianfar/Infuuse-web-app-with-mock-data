import { InputAdornment, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { NextButton } from '@/components/atoms/Button';
import UserIcon from '@/assets/user-icon';
import {
	PlanType,
	usePayment_CalculateSubscriptionQuery,
	usePayment_CreateSubscriptionMutation,
} from '@/graphql/generated';
import { Footer, Label, MemberContainer } from './styles';
import { enqueueSnackbar } from 'notistack';
import { responseDestructure } from '@/utils';



const AddSubscription = () => {
	const [numberOfUsers, setNumberOfUsers] = useState<string>('')
	const [planType, setPlanType] = useState<PlanType | null>(null)


	const { data: calcPayment } = usePayment_CalculateSubscriptionQuery({
		input: {
			operatorCount: Number(numberOfUsers),
			planType: planType as PlanType,
		}
	})

	const calcPaymentData = calcPayment?.payment_calculateSubscription?.result

	const { mutate: createPayment } = usePayment_CreateSubscriptionMutation()

	const successPageUrl = `${window.location.origin}/subscriptions/success`
	const failedPageUrl = `${window.location.origin}/subscriptions/failed?deactivePage=true`

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

	return (
		<Stack width={'100%'} height={'100%'}>
			<MemberContainer>
				{/* -------------------------------form */}
				<Stack position={'relative'}>
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
					</Stack>

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
					<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} px={2}>
						<NextButton onClick={AddSubscription} sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}>
							Add Subscription
						</NextButton>
					</Stack>

				</Footer>
			</MemberContainer>


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
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
		},
	},
}));