import TicketIcon from '@/assets/ticket-icon'
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { NotificationProps, TicketProps } from '../../../type';

const NewTicket = ({ notificationRead, NotificationConvert, notification, selectTicket }: Partial<NotificationProps & TicketProps>) => {
    const theme = useTheme();

    return (
        <Stack>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                flexWrap={'wrap'}
            >
                <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} flexWrap={'wrap'}>
                    <Box mr={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <TicketIcon height="28px" width="28px" fill={theme?.palette?.infuuse?.blue100} />
                    </Box>

                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} pt={'6px'}>
                        <Typography
                            color={theme?.palette?.infuuse?.blueDark500}
                            fontWeight={'bold'}
                            fontSize={'14px'}
                        >
                            Ticket Number:{' '}
                            <span style={{ color: theme?.palette?.infuuse?.blue500 }}>
                                {NotificationConvert?.TicketNumber}
                            </span>
                        </Typography>
                    </Box>
                </Stack>

                <Box
                    onClick={() => notificationRead?.(notification?.id as number)}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    pt={'6px'}
                    sx={{ cursor: 'pointer' }}
                >
                    <CloseIcon />
                </Box>
            </Stack>

            <Divider sx={{ color: theme?.palette?.infuuse?.gray100, mb: 1, mt: 1 }} />

            <Stack
                onClick={() => selectTicket?.(NotificationConvert?.TicketNumber)}
                sx={{ cursor: 'pointer' }}
            >
                <Typography
                    color={theme?.palette?.infuuse?.blueDark500}
                    fontWeight={'bold'}
                    fontSize={'14px'}
                >
                    Status changed to{' '}
                    <span
                        style={{
                            color:
                                NotificationConvert?.ChangeStatus == 2
                                    ? theme?.palette?.infuuse?.green300
                                    : theme?.palette?.infuuse?.orange100,
                        }}
                    >
                        {NotificationConvert?.ChangeStatus == 2 ? 'resolved' : 'unresolved'}
                    </span>
                </Typography>
            </Stack>
        </Stack>
    )
}

export default NewTicket

