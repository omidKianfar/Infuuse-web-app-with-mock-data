import CloseIconBox from '@/assets/close-icon-box'
import { Box, Button, Stack, useTheme } from '@mui/material'
import React from 'react'
import { NotificationProps } from '../../type';

const HeaderNotification = ({ notificationsRead, setNotificationState }: Partial<NotificationProps>) => {
    const theme = useTheme();

    return (
        <Stack mb={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
                <Stack mr={1} ml={1} fontWeight={'bold'}>
                    Notifications
                </Stack>
                <Button
                    onClick={notificationsRead}
                    sx={{
                        fontSize: '14px',
                        borderRadius: 2,
                        color: theme?.palette?.infuuse?.blue500,
                    }}
                >
                    Read All
                </Button>
            </Stack>

            <Box sx={{ cursor: 'pointer' }} onClick={() => setNotificationState?.(false)}>
                <CloseIconBox />
            </Box>
        </Stack>
    )
}

export default HeaderNotification
