import { Stack } from '@mui/material';
import React from 'react';
import GoogleCalendar from './google-calendar';

const Calendar = () => {
	return (
		<Stack width={'100%'} height={'100%'} p={2}>
			<GoogleCalendar />
		</Stack>
	);
};

export default Calendar;
