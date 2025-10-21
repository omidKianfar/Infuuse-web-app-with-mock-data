import React from 'react';
import { Stack, useTheme } from '@mui/material';
import { NextButton } from '@/components/atoms/Button';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from './stripe-checkout';

interface Props {
	handleClose: () => void;
	ClientSecret: string | null;
	publishKey: string | null;
}


const PayPendingSubscription = ({ handleClose, ClientSecret, publishKey }: Props) => {
	const theme = useTheme()

	const PaySubscriptionHandler = () => {

	}

	return (
		<Stack
			width={'450px'}
			height={'100%'}
			bgcolor={theme?.palette?.infuuse?.gray100}
			boxShadow={4}
			borderRadius={2}
		>
			<Elements
				options={ClientSecret as string}
				stripe={loadStripe(publishKey as string)}>
				<StripeCheckout ClientSecret={ClientSecret as string} handleClose={handleClose} />
			</Elements>
		</Stack>
	);
};

export default PayPendingSubscription;


