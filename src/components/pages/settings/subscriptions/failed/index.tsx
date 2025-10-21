import CloseIconBox from '@/assets/close-icon-box'
import { NextButton } from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import { UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated'
import { useAuth } from '@/providers/AuthProvider'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const SubscriptionFailed = () => {
    const theme = useTheme()
    const router = useRouter()

    const { setSignupStepCounter } = useAuth();

    const isSignup = router?.query?.signup
    const isDeactivePayment = router?.query?.deactivePage


    // -------------------------------query
    // current user
    const { data: User } = useUser_GetCurrentUserQuery();
    const CurrentUser = User?.user_getCurrentUser?.result


    const redirectHandler = () => {
        if (isSignup) {
            if (CurrentUser?.user?.userType === UserType?.BusinessMember) {
                setSignupStepCounter(2)
                router?.push('/signup')
            } else {
                router?.push('/businesses')
                setSignupStepCounter(0);
            }
        } else if (isDeactivePayment) {
            router?.push('/deactived-payment')
        } else {
            router?.push('/subscriptions')
        }
    }

    return (
        <Stack width={'100%'} height={'100%'}>
            <Stack
                width={'100%'}
                height={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
                bgcolor={theme?.palette?.infuuse?.gray100}
            >
                <Stack
                    boxShadow={4}
                    width={'600px'}
                    height={'500px'}
                    p={2}
                    borderRadius={4}
                    justifyContent={'center'}
                    alignItems={'center'}
                    bgcolor={theme?.palette?.common?.white}
                    textAlign={'center'}
                >
                    <Box mb={4} position={'relative'}>
                        <Box position={'absolute'} right={'25%'} top={0} bgcolor={theme?.palette?.infuuse?.red300} width={'24px'} height={'24px'} borderRadius={'360px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <CloseIconBox width={'240px'} height={'24px'} />
                        </Box>
                        <Image src={'/images/payment-redirect-image.svg'} sx={{ width: '200px', height: '200px' }} />
                    </Box>

                    <Typography
                        sx={{ mb: 2, color: theme?.palette?.infuuse?.red300, fontWeight: 'bold', fontSize: '18px' }}
                    >
                        Payment Failed
                    </Typography>
                    <Typography
                        sx={{ mb: 4, color: theme?.palette?.infuuse?.blueDark500, fontWeight: 'bold', fontSize: '18px' }}
                    >
                        Payment Not completed!
                    </Typography>

                    <NextButton sx={{ width: '200px' }} onClick={redirectHandler}>
                        Continue
                    </NextButton>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default SubscriptionFailed
