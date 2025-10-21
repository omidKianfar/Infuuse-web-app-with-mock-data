import { ConversationMessage, Maybe } from '@/graphql/generated';
import { Box, Rating, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import StarGoldIcon from '@/assets/star-gold-icon';
import StarEmptyIcon from '@/assets/star-emty-icon';

interface Props {
    message: Maybe<ConversationMessage>

}

const RateMessageSupport = ({ message }: Props) => {
    const theme = useTheme();
    const RateConvert = JSON.parse(message?.metaData);

    return (
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} px={2} mb={'50px'}>
            <Stack height={'100%'} position={'relative'}>
                <Box
                    bgcolor={theme?.palette?.common?.white}
                    p={2}
                    borderRadius={4}
                    height={'100%'}
                    boxShadow={4}
                    width={'100%'}
                    maxWidth={'300px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} mb={2}>
                        <Rating
                            name="size-large"
                            value={RateConvert?.Score}
                            readOnly
                            icon={
                                <Box p={1}>
                                    <StarGoldIcon width="24px" height="24px" />
                                </Box>
                            }
                            emptyIcon={
                                <Box p={1}>
                                    <StarEmptyIcon width="24px" height="24px" />
                                </Box>
                            }
                        />
                    </Stack>

                    <Typography color={theme?.palette?.infuuse?.blue500}
                    >{RateConvert?.Name}</Typography>
                </Box>
            </Stack>
        </Stack>
    );
};

export default RateMessageSupport;
