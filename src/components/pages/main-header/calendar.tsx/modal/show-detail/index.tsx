import { Stack } from '@mui/material'
import React, { useState } from 'react'
import Step1 from './step1'
import Step2 from './step2'

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
}


const ShowEventDetailModal = ({ handleClose, selectedEvent, calendarId, accessToken, fetchCalendarEvents }: Props) => {
    const [counter, setCounter] = useState(0)

    return (
        <Stack>
            {counter === 0
                ? <Step1 handleClose={handleClose} selectedEvent={selectedEvent} calendarId={calendarId} accessToken={accessToken} fetchCalendarEvents={fetchCalendarEvents} setCounter={setCounter} />
                : <Step2 handleClose={handleClose} selectedEvent={selectedEvent} calendarId={calendarId} accessToken={accessToken} fetchCalendarEvents={fetchCalendarEvents} setCounter={setCounter} />}
        </Stack>
    )
}

export default ShowEventDetailModal
