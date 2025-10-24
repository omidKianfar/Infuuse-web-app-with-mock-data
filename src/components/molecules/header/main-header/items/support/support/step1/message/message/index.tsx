import { SupportProps } from '@/components/molecules/header/main-header/type'
import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

const SupportMessage = ({ message, userId }: Partial<SupportProps>) => {
    const theme = useTheme();

    return (
        <>
            <Box
                bgcolor={Number(message?.conversationMember?.user?.id) === Number(userId) ? theme?.palette?.common?.white : `rgba(255,188,1,0.8)`}
                p={2}
                borderRadius={4}
                height={'100%'}
                boxShadow={4}
                ml={Number(message?.conversationMember?.user?.id) === Number(userId) ? 2 : 0}
                width={'100%'}
                maxWidth={'280px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Typography color={theme?.palette?.infuuse?.blue500} sx={{ wordBreak: 'break-word', wordWrap: 'break-word' }}
                    dangerouslySetInnerHTML={{ __html: message?.message }}
                ></Typography>
            </Box>
        </>
    )
}

export default SupportMessage
