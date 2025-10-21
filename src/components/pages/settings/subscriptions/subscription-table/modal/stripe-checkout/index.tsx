import { Box, Stack, Typography, useTheme } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react'
import { NextButton } from '@/components/atoms/Button';
import { queryClient } from 'pages/_app';

interface Props {
    ClientSecret: string | null;
    handleClose: () => void
}

const StripeCheckout = ({ ClientSecret, handleClose }: Props) => {
    // ----------------------------------tools
    const theme = useTheme();
    const stripe = useStripe();
    const elements = useElements();

    // ---------------------------------------states
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        if (error) {
            elements.getElement('card').focus();
            return;
        }

        if (cardComplete) {
            setProcessing(true);
        }

        if (cardComplete) {
            const result = await stripe.confirmCardPayment(ClientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });
            if (result?.paymentIntent?.status === 'succeeded') {
                setProcessing(false);
                handleClose()
                queryClient.invalidateQueries(['paymentHistory_getList'])
                enqueueSnackbar('Operation was successful!', {
                    variant: 'success'
                });
            } else {
                console.log(result);
            }
        }
        const payload = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });
        if (payload.error) {
            setError(payload.error);
        } else {
            setPaymentMethod(payload.paymentMethod);
            handleClose()
            queryClient.invalidateQueries(['paymentHistory_getList'])
            enqueueSnackbar('Operation was successful!', {
                variant: 'success'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack pt={2}>
                <Typography ml={2} fontWeight={'bold'} fontSize={'16px'} color={theme?.palette?.infuuse?.blueDark500} >Card Detail</Typography>

                <Stack p={2}>
                    <CardElement
                        onChange={(e) => {
                            setError(e.error);
                            setCardComplete(e.complete);
                        }}
                    />
                </Stack>
            </Stack>

            <Stack width={'100%'} justifyContent={'center'} alignItems={'center'} mt={4} mb={2}>
                <NextButton sx={{ width: '150px', height: '40px' }} type="submit" disabled={processing || !ClientSecret || !stripe} isLoading={processing}>
                    {processing ? 'Processing…' : 'Pay'}
                </NextButton>
            </Stack>

            <Stack justifyContent={'center'} alignItems={'center'} bgcolor={theme?.palette?.infuuse?.blue100} height={'60px'} textAlign={'center'} borderRadius={'0 0 8px 8px'} p={1}>
                <Typography fontSize={'14px'} color={theme?.palette?.common?.white} sx={{ wordBreak: 'break-word', wordWrap: 'break-word', textWrap: 'wrap', }} >By making this purchase, you cancel your current subscription and will activate the custom package</Typography>
            </Stack>

        </form>
    );
}

export default StripeCheckout
