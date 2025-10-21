import CloseIconBox from '@/assets/close-icon-box';
import { Box, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { CustomDescription, Label } from '../../styles';
import { NextButton } from '@/components/atoms/Button';
import axios from 'axios';
import TimeZoneSearch from '@/components/atoms/search/time-zone-search';
import SupportBackIcon from '@/assets/support-back-icon';
import moment from 'moment-timezone';
import dayjs from 'dayjs';

interface DefaultValuesType {
    title: string,
    description: string,
    startTime: string,
    endTime: string,
}

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

const Step2 = ({ handleClose, selectedEvent, calendarId, accessToken, fetchCalendarEvents, setCounter }: Props) => {
    const theme = useTheme()

console.log(selectedEvent.start);

    const timeZoneMatch = selectedEvent?.start.toString().match(/\(([^)]+)\)/);
    

    const [choosenTimeZone, setChoosenTimeZone] = useState<string | null>(null)
console.log('choosenTimeZone',choosenTimeZone);

    // -------------------------------form
    const defaultValues: DefaultValuesType = {
        title: selectedEvent?.title,
        description: selectedEvent?.description,
        startTime: dayjs(selectedEvent?.start).format('hh:mm'),
        endTime: dayjs(selectedEvent?.end).format('hh:mm'),
    };


    const methods = useForm({
        resolver: yupResolver(AddEventSchema),
        values: defaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit = async (values: any) => {

        const selectedEventStartCovert = dayjs(selectedEvent?.start).format('YYYY-MM-D')
        const selectedEventEndCovert = dayjs(selectedEvent?.end).format('YYYY-MM-D')

        try {
            await axios.patch(
                `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${selectedEvent.id}`,
                {
                    summary: values?.title,
                    description: values?.description,
                    start: {
                        dateTime: `${selectedEventStartCovert}T${values.startTime}:00`,
                        timeZone: choosenTimeZone as string ,
                    },
                    end: {
                        dateTime: `${selectedEventEndCovert}T${values.endTime}:00`,
                        timeZone: choosenTimeZone ,
                    },
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            fetchCalendarEvents(); // Refresh events after update
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <Stack width={'400px'} height={'100%'} bgcolor={theme?.palette?.infuuse?.gray200} borderRadius={2} maxHeight={'650px'} overflow={'auto'}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} bgcolor={theme?.palette?.infuuse?.blue500} p={2} borderRadius={'8px 8px 0 0'}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={() => setCounter(0)}>
                    <SupportBackIcon />
                </Box>

                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={handleClose}>
                    <CloseIconBox />
                </Box>
            </Stack>

            <Stack p={2}>
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
                        <NextButton type='submit' >Save</NextButton>
                    </Stack>
                </FormProvider >
            </Stack>
        </Stack >
    );
};

export default Step2;

// -------------------------------schema
const AddEventSchema = Yup.object().shape({
    // title: Yup.string().required('Enter Your Event Title').trim(),
    // description: Yup.string().required('Enter Your Description').trim(),
    // startTime: Yup.string().required('Enter Your Start Time').trim(),
    // endTime: Yup.string()
    //     .typeError('End date must be greather than is start date')
    //     .test(
    //         'End date must be greather than is start date',
    //         'End date must be greather than is start date',
    //         (currentTime, context) => {
    //             const CurrentHour = currentTime
    //             const startHour = context?.parent?.startTime

    //             return CurrentHour > startHour ? true : false;
    //         }
    //     ),
});

