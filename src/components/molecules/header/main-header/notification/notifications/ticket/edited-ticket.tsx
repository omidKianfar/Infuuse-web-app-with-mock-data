import React from 'react'
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import TicketIcon from '@/assets/ticket-icon';
import Avatar from '@/components/atoms/avatar';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import { getFullImageUrl } from '@/utils';
import { NotificationProps, TicketProps } from '../../../type';

const EditedTicket = ({NotificationConvert,notificationRead,notification,selectTicket}:Partial<NotificationProps & TicketProps>) => {
        const theme = useTheme();
    
    return (
        <>
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

                    <Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
                        {NotificationConvert?.OperationType == 1 ? (
                            <Typography
                                color={theme?.palette?.infuuse?.blueDark500}
                                mr={'4px'}
                                fontWeight={'bold'}
                            >
                                Ticket number{' '}
                                <span
                                    style={{
                                        color: theme?.palette?.infuuse?.blue500,
                                    }}
                                >
                                    {NotificationConvert?.TicketNumber}
                                </span>{' '}
                                edited
                            </Typography>
                        ) : (
                            <>
                                <span
                                    style={{
                                        marginRight: '8px',
                                        color: theme?.palette?.infuuse?.blueDark500,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Ticket number:
                                </span>
                                <Typography
                                    color={theme?.palette?.infuuse?.blue500}
                                    mr={1}
                                    fontWeight={'bold'}
                                >
                                    {NotificationConvert?.TicketNumber}
                                </Typography>
                            </>
                        )}{' '}
                    </Stack>
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
                <Stack mb={1}>
                    {NotificationConvert?.Creator && (
                        <Stack
                            direction={'row'}
                            justifyContent={'start'}
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            mb={1}
                        >
                            <Avatar src={getFullImageUrl(NotificationConvert?.Creator?.PhotoUrl)} />
                            <Typography
                                color={theme?.palette?.infuuse?.blueDark500}
                                fontWeight={'bold'}
                                fontSize={'14px'}
                                ml={1}
                            >
                                {NotificationConvert?.Creator?.FullName}
                            </Typography>
                        </Stack>
                    )}

                    {NotificationConvert?.Contact && (
                        <Stack
                            direction={'row'}
                            justifyContent={'start'}
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            mb={1}
                        >
                            <Avatar src={getFullImageUrl(NotificationConvert?.Contact?.PhotoUrl)} />
                            <Typography
                                color={theme?.palette?.infuuse?.blueDark500}
                                fontWeight={'bold'}
                                fontSize={'14px'}
                                ml={1}
                            >
                                {NotificationConvert?.Creator?.FullName}
                            </Typography>
                        </Stack>
                    )}
                </Stack>

                <Stack mb={1}>
                    <Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
                        <span
                            style={{
                                marginRight: '8px',
                                color: theme?.palette?.infuuse?.blueDark500,
                                fontWeight: 'bold',
                            }}
                        >
                            Summery:
                        </span>

                        <Typography color={theme?.palette?.infuuse?.blue500} mr={1} fontWeight={'bold'}>
                            {stringSlicer(NotificationConvert?.Summary, 50)}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack >
                    <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} mb={1}>
                        <span
                            style={{
                                marginRight: '8px',
                                color: theme?.palette?.infuuse?.blueDark500,
                                fontWeight: 'bold',
                            }}
                        >
                            Start:
                        </span>

                        <Typography color={theme?.palette?.infuuse?.blue500} mr={1} fontWeight={'bold'}>
                            {dayjs(NotificationConvert?.StartDate).format('MM/DD/YYYY hh:mm A')}
                        </Typography>
                    </Stack>

                    <Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
                        <span
                            style={{
                                marginRight: '8px',
                                color: theme?.palette?.infuuse?.blueDark500,
                                fontWeight: 'bold',
                            }}
                        >
                            End:
                        </span>

                        <Typography color={theme?.palette?.infuuse?.blue500} mr={1} fontWeight={'bold'}>
                            {dayjs(NotificationConvert?.EndDate).format('MM/DD/YYYY hh:mm A')}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default EditedTicket
