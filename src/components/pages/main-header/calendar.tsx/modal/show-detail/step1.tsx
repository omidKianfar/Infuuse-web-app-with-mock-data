import CloseIconBox from '@/assets/close-icon-box';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { NextButton } from '@/components/atoms/Button';
import { enqueueSnackbar } from 'notistack';
import DeleteIcon from '@/assets/delete-icon';
import EditIcon from '@/assets/edit-icon';
interface Props {
    handleClose: () => void;
    selectedEvent: {
        id: null;
        title: string;
        description: string;
        start: string;
        end: string;
        creator: string;
    },
    calendarId: never;
    accessToken: string;
    fetchCalendarEvents: () => Promise<void>;
    setCounter: React.Dispatch<React.SetStateAction<number>>
}

const Step1 = ({ handleClose, selectedEvent, calendarId, accessToken, fetchCalendarEvents, setCounter }: Props) => {
    const theme = useTheme();

    const deleteEvent = async () => {
        try {
            await axios.delete(
                `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${selectedEvent?.id}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            // Refetch events after deletion to update the UI
            enqueueSnackbar(`Deleting event is successful`, { variant: 'success' });
            handleClose()
            fetchCalendarEvents();
        } catch (error) {
            enqueueSnackbar(`Error deleting event: ${error}`, { variant: 'error' });

        }
    };

    const editEvent = () => {
        setCounter(1)
    }

    return (
        <Stack width={'400px'} height={'100%'} bgcolor={theme?.palette?.infuuse?.gray200} borderRadius={2}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} bgcolor={theme?.palette?.infuuse?.blue500} p={2} borderRadius={'8px 8px 0 0'}>
                <Typography color={theme?.palette?.infuuse?.gray200} fontSize={'18px'} >Event Details</Typography>

                <Stack width={'50%'} direction={'row'} justifyContent={'end'} alignItems={'center'}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={2}>
                        {/* <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={editEvent}>
                            <EditIcon fill={theme?.palette?.infuuse?.blue100} />
                        </Box> */}

                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={deleteEvent}>
                            <DeleteIcon />
                        </Box>

                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={handleClose}>
                            <CloseIconBox />
                        </Box>
                    </Stack>
                </Stack>
            </Stack>

            <Stack p={2}>
                <Stack mb={2} direction={'row'} justifyContent={'start'} alignItems={'start'} flexWrap={'wrap'}>
                    <Typography mr={1} fontWeight={'bold'} color={theme?.palette?.infuuse?.blueDark500}>Title: </Typography>

                    <Typography >
                        {selectedEvent?.title}
                    </Typography>
                </Stack>

                <Stack mb={2} direction={'row'} justifyContent={'start'} alignItems={'start'} flexWrap={'wrap'}>
                    <Typography mr={1} fontWeight={'bold'} color={theme?.palette?.infuuse?.blueDark500}>Description: </Typography>

                    <Typography dangerouslySetInnerHTML={{
                        __html: selectedEvent?.description,
                    }}>

                    </Typography>
                </Stack>

                <Stack mb={2} direction={'row'} justifyContent={'start'} alignItems={'start'} flexWrap={'wrap'}>
                    <Typography mr={1} fontWeight={'bold'} color={theme?.palette?.infuuse?.blueDark500}>Start: </Typography>

                    <Typography>
                        {dayjs(selectedEvent?.start).format('MM/DD/YYYY hh:mm A')}
                    </Typography>
                </Stack>

                <Stack direction={'row'} justifyContent={'start'} alignItems={'start'} flexWrap={'wrap'}>
                    <Typography mr={1} fontWeight={'bold'} color={theme?.palette?.infuuse?.blueDark500} >End: </Typography>

                    <Typography>
                        {dayjs(selectedEvent?.end).format('MM/DD/YYYY hh:mm A')}
                    </Typography>
                </Stack>
            </Stack>
        </Stack >
    );
};

export default Step1;

