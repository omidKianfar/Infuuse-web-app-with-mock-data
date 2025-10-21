import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import { Typography, useTheme } from '@mui/material';

// Extend dayjs with the duration plugin
dayjs.extend(durationPlugin);

interface Props {
    date: any
}

const UnSeenMessageCalc = ({ date }: Props) => {
    // --------------------------------tools
    const theme = useTheme()

    // -------------------------------states
    const [timeDiff, setTimeDiff] = useState('');

    // ----------------------------------- calc diffrent date to now with dayjs format  HH:mm:ss
    useEffect(() => {
        const calculateTimeDiff = () => {
            // ----------------------------------states
            const givenDate = dayjs(date, 'DD/MM/YYYY');
            const now = dayjs();
            const diff = now.diff(givenDate);

            // calc diffrent with plugin
            const duration = dayjs.duration(diff);

            // Format the duration to HH:mm:ss
            const formattedDiff = `${String(Math.floor(duration.asHours())).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}`;

            // set to state
            setTimeDiff(formattedDiff);
        };

        calculateTimeDiff(); // Calculate immediately

        // Set interval to update every second
        const interval = setInterval(calculateTimeDiff, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [date]);


    // -----------------------calc after 1 day past
    const date1 = dayjs(date);
    const date2 = dayjs();

    let hours = date2.diff(date1, 'hours');
    const days = Math.floor(hours / 24);


    return (
        <>
            {days == 0 ? <Typography fontSize={'16px'} color={theme?.palette?.common?.white}>{timeDiff}</Typography>
                : days == 1 ? <Typography fontSize={'14px'} color={theme?.palette?.common?.white}>Yesterday</Typography>
                    : <Typography fontSize={'16px'} color={theme?.palette?.common?.white}>{dayjs(date).format('MM/DD/YYYY')}</Typography>}

        </>
    );
};

export default UnSeenMessageCalc;
