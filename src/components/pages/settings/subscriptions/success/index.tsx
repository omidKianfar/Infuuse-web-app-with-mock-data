import CheckGreenIcon from '@/assets/check-green-icon'
import { NextButton } from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import { UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated'
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const SubscriptionSuccess = () => {
  const theme = useTheme()
  const router = useRouter()

  const { setSignupStepCounter } = useAuth();

  const isSignup = router?.query?.signup

  // -------------------------------query
  // current user
  const { data: User } = useUser_GetCurrentUserQuery();
  const CurrentUser = User?.user_getCurrentUser?.result

  const redirectHandler = () => {
    if (isSignup) {
      if (CurrentUser?.user?.userType === UserType?.BusinessMember) {
        setSignupStepCounter(3)
        router?.push('/signup')
      } else {
        router?.push('/businesses')
        setSignupStepCounter(0);
      }
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
            <Box position={'absolute'} right={'25%'} top={0}>
              <CheckGreenIcon />
            </Box>
            <Image src={'/images/payment-redirect-image.svg'} sx={{ width: '200px', height: '200px' }} />
          </Box>

          <Typography
            sx={{ mb: 2, color: theme?.palette?.infuuse?.green300, fontWeight: 'bold', fontSize: '18px' }}
          >
            Payment Successful
          </Typography>
          <Typography
            sx={{ mb: 4, color: theme?.palette?.infuuse?.blueDark500, fontWeight: 'bold', fontSize: '18px' }}
          >
            Payment successfully completed!
          </Typography>

          <NextButton sx={{ width: '200px' }} onClick={redirectHandler} >
            Continue
          </NextButton>
        </Stack>
      </Stack>
    </Stack >
  )
}

export default SubscriptionSuccess
