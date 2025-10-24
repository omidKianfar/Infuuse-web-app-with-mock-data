import CloseIconBox from '@/assets/close-icon-box'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { NotificationProps } from '../../type';

const EmptyNotification = ({setNotificationState}:Partial<NotificationProps>) => {
    	const theme = useTheme();

    return (
        <Stack
            position={'absolute'}
            top={'70px'}
            right={'32px'}
            height={'100%'}
            maxHeight={'150px'}
            overflow={'auto'}
            width={'400px'}
            bgcolor={theme?.palette?.common?.white}
            p={'12px '}
            borderRadius={4}
            zIndex={10000}
            boxShadow={4}
        >
            <Stack mb={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Stack mr={1} ml={1} fontWeight={'bold'}>
                    Notifications
                </Stack>

                <Box sx={{ cursor: 'pointer' }} onClick={() => setNotificationState?.(false)}>
                    <CloseIconBox />
                </Box>
            </Stack>

            <Stack justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'}>
                <Typography color={theme?.palette?.infuuse?.blueDark500} fontWeight={'bold'} fontSize={'20px'}>
                    No Notification
                </Typography>
            </Stack>
        </Stack>
    )
}

export default EmptyNotification
