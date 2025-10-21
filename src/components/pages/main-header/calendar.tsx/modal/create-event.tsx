import CloseIconBox from '@/assets/close-icon-box';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { CustomDescription, Label } from '../styles';
import { NextButton } from '@/components/atoms/Button';
import axios from 'axios';
import TimeZoneSearch from '@/components/atoms/search/time-zone-search';
interface DefaultValuesType {
    title: string,
    description: string,
    startTime: string,
    endTime: string,
}
interface Props {
    handleClose: () => void;
    accessToken: string;
    fetchCalendarEvents: () => Promise<void>;
    selectedDate: null;
    calendarId: null
}

const CreateEventModal = ({ handleClose, accessToken, fetchCalendarEvents, calendarId, selectedDate }: Props) => {
    const theme = useTheme()

    const [choosenTimeZone, setChoosenTimeZone] = useState<string | null>(null)

    // -------------------------------form
    const defaultValues: DefaultValuesType = {
        title: '',
        description: '',
        startTime: '',
        endTime: '',
    };

    const methods = useForm({
        resolver: yupResolver(AddEventSchema),
        values: defaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit = async (values: any) => {

        const eventDetails = {
            summary: values.title,
            description: values.description,
            start: {
                dateTime: `${selectedDate}T${values.startTime}:00`,
                timeZone: choosenTimeZone as string,
            },
            end: {
                dateTime: `${selectedDate}T${values.endTime}:00`,
                timeZone: choosenTimeZone as string,
            },
        };

        try {
            await axios.post(
                `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
                eventDetails,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            handleClose()
            fetchCalendarEvents(); // Refresh the calendar to show the new event
        } catch (error) {
            console.error('Error creating event:', error);
            // Show an error message
        }
    };

    return (
        <Stack width={'400px'} height={'100%'} bgcolor={theme?.palette?.infuuse?.gray200} p={2} borderRadius={2} maxHeight={'650px'} overflow={'auto'}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
                <Typography color={theme?.palette?.infuuse?.blueDark500} fontSize={'18px'} >Create New Event</Typography>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={handleClose}>
                    <CloseIconBox />
                </Box>
            </Stack>

            <Stack>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack justifyContent={'start'} alignItems={'start'} >
                        <Stack width={'100%'}>
                            <Label mb={'4px'}>Start Time</Label>

                            <TextField
                                name="startTime"
                                label={''}
                                type='time'
                            />
                        </Stack>

                        <Stack width={'100%'}>
                            <Label mb={'4px'}>End Time</Label>

                            <TextField
                                name="endTime"
                                label={''}
                                type='time'
                            />
                        </Stack>

                        <Stack width={'100%'}>
                            <TimeZoneSearch
                                choosenTimeZone={choosenTimeZone}
                                setChoosenTimeZone={setChoosenTimeZone} />
                        </Stack>

                        <Stack width={'100%'}>
                            <Label mb={'4px'}>Event Title</Label>

                            <TextField
                                name="title"
                                fullWidth
                            />
                        </Stack>

                        <Stack width={'100%'}>
                            <Label mb={'4px'}>Description</Label>

                            <CustomDescription
                                name="description"
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Stack>


                    </Stack>

                    <Stack width={'100%'} mt={4}>
                        <NextButton type='submit' >Create</NextButton>
                    </Stack>
                </FormProvider >
            </Stack>
        </Stack >
    );
};

export default CreateEventModal;

// -------------------------------schema
const AddEventSchema = Yup.object().shape({
    title: Yup.string().required('Enter Your Event Title').trim(),
    description: Yup.string().required('Enter Your Description').trim(),
    startTime: Yup.string().required('Enter Your Start Time').trim(),
    endTime: Yup.string()
        .typeError('End date must be greather than is start date')
        .test(
            'End date must be greather than is start date',
            'End date must be greather than is start date',
            (currentTime, context) => {
                const CurrentHour = currentTime
                const startHour = context?.parent?.startTime

                return CurrentHour > startHour ? true : false;
            }
        ),
});

