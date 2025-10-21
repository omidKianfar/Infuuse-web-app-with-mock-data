import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { CartBodyDate } from '../styles';
import TicketIcon from '@/assets/ticket-icon';
import UserIcon from '@/assets/user-icon';

interface Props {
    NotificationConvert: any;
}

const AssignConversationNotificationCart = ({ NotificationConvert }: Props) => {
    const theme = useTheme();

    console.log('NotificationConvert', NotificationConvert);

    return (
        <CartBodyDate width={'100%'}>

            <Stack
                width={'100%'}
                bgcolor={theme?.palette?.infuuse?.gray200}
                p={'8px 16px'}
                borderRadius={2}
                boxShadow={2}
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                    <Box mr={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <UserIcon fill={theme?.palette?.infuuse?.green300} />
                    </Box>

                    <Typography
                        fontSize={'18px'}
                        mr={'4px'}
                        fontWeight={'bold'}
                        color={theme?.palette?.infuuse?.blueDark500}
                    >
                        You have been assigned to a new conversation 
                    </Typography>
                </Stack>

                <Stack>
                    <Typography
                        fontSize={'14px'}
                        mr={'4px'}
                        fontWeight={'bold'}
                        color={theme?.palette?.infuuse?.blueDark500}
                    >
                        Creator:{' '}
                        <span style={{ color: theme?.palette?.infuuse?.blue500 }}>
                            {NotificationConvert?.Creator?.FullName}
                        </span>
                    </Typography>
                </Stack>
            </Stack>

        </CartBodyDate>
    );
};

export default AssignConversationNotificationCart;
