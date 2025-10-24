import CalendarGoogleIcon from '@/assets/calendar-google-icon';
import { Box, Tooltip, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const CalendarItem = () => {
	const router = useRouter();
	const theme = useTheme();

	return (
		<>
			<Tooltip title="Calendar">
				<Box onClick={() => router.push('/calendar')} sx={{ cursor: 'pointer', ml: 2 }}>
					<CalendarGoogleIcon
						fill={
							router?.pathname.includes('/calendar')
								? {
										fill1: '#1e88e5',
										fill2: '#fbc02d',
										fill3: '#4caf50',
										fill4: '#e53935',
										fill5: '#1565c0',
									}
								: theme?.palette?.infuuse.gray500
						}
					/>
				</Box>
			</Tooltip>
		</>
	);
};

export default CalendarItem;
