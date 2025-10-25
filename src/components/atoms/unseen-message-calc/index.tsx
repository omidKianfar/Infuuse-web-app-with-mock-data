import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import { Typography, useTheme } from '@mui/material';

dayjs.extend(durationPlugin);

interface Props {
    date: any
}

const UnSeenMessageCalc = ({ date }: Props) => {
    const theme = useTheme()

    const [timeDiff, setTimeDiff] = useState('');

    useEffect(() => {
        const calculateTimeDiff = () => {
            const givenDate = dayjs(date, 'DD/MM/YYYY');
            const now = dayjs();
            const diff = now.diff(givenDate);

            const duration = dayjs.duration(diff);

            const formattedDiff = `${String(Math.floor(duration.asHours())).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}`;

            setTimeDiff(formattedDiff);
        };

        calculateTimeDiff();

        const interval = setInterval(calculateTimeDiff, 1000);

        return () => clearInterval(interval);
    }, [date]);


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
