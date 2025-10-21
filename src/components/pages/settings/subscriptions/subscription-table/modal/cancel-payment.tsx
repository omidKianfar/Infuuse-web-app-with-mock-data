import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { NextButton } from '@/components/atoms/Button';
import CloseIconBox from '@/assets/close-icon-box';
import { PaymentHistory, PaymentType, usePayment_CancelingSubscriptionCostQuery, usePayment_CancelSubscriptionMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';

interface Props {
    handleClose: () => void;
    payment: PaymentHistory
}


const CancelSubscription = ({ handleClose, payment }: Props) => {
    const theme = useTheme()

    // ---------------------------- query
    const { data: CancelingCost } = usePayment_CancelingSubscriptionCostQuery()
    const CancelingCostData = CancelingCost?.payment_cancelingSubscriptionCost?.result

    const { mutate: CancelSubsciption } = usePayment_CancelSubscriptionMutation()


    const PaySubscriptionHandler = () => {
        CancelSubsciption(
            {
            },
            {
                onSuccess: (data) => {
                    const { status } = responseDestructure(data);
                    if (status.code == 1) {
                        handleClose()
                        enqueueSnackbar(status.description, { variant: 'success' });
                        queryClient.invalidateQueries(['paymentHistory_getList'])
                    } else {
                        enqueueSnackbar(status.description, { variant: 'error' });
                    }
                },
            }
        );
    }

    return (
        <Stack
            width={'500px'}
            height={'100%'}
            p={'16px'}
            bgcolor={theme?.palette?.infuuse?.gray100}
            boxShadow={4}
            borderRadius={2}
            justifyContent={'center'}
            alignItems={'center'}
            textAlign={'center'}
        >
            <Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} mb={1}>
                <Box onClick={handleClose}>
                    <CloseIconBox />
                </Box>
            </Stack>

            <Typography fontWeight={'bold'} fontSize={'18px'} color={theme?.palette?.infuuse?.blueDark500}>
                Are you sure about canceling this subscription plan?
            </Typography>

            <Box borderRadius={2} mt={1}>
                <Typography color={theme?.palette?.infuuse?.blueDark500} >
                    {`After canceling the refund, $${CancelingCostData && Number(CancelingCostData * -1).toFixed(2) } will be returned to your account`}
                </Typography>
            </Box>


            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={3} width={'100%'}>
                <NextButton onClick={PaySubscriptionHandler} sx={{ height: '40px', width: '150px' }} onClick={handleClose}>
                    Close
                </NextButton>

                <NextButton onClick={PaySubscriptionHandler} sx={{ height: '40px', width: '200px', backgroundColor: theme?.palette?.infuuse?.red300 }}>
                    Cancel Subscription
                </NextButton>
            </Stack>

        </Stack>
    );
};

export default CancelSubscription;


