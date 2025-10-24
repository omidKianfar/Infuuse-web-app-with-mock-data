import { SupportProps } from '@/components/molecules/header/main-header/type';
import { Stack, Typography, useTheme } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

const SupportMessageFooter = ({ message }: Partial<SupportProps>) => {
    const theme = useTheme();

    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mt={1}
            position={'absolute'}
            bottom={'-28px'}
            left={'24px'}
            width={'280px'}
        >
            {/* <Typography color={theme?.palette?.infuuse?.blue500} pl={3}>
							{stringSlicer(message?.conversationMember?.user?.fullName, 15)}
						</Typography> */}

            <Typography color={theme?.palette?.infuuse?.blue500}>{dayjs(message?.createdDate).format('hh:mm A')}</Typography>
        </Stack>
    )
}

export default SupportMessageFooter
