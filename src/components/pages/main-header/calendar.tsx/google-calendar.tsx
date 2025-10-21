import GoogleIcon from '@/assets/google-icon';
import { NextButton } from '@/components/atoms/Button';
import {
	useUser_ExchangeCalendarAuthCodeForTokensMutation,
	useUser_GetCalendarAccessTokenQuery,
	useUser_GetCalendarAuthLinkQuery,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CircularProgress, Divider, Stack, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ModalContainer from '@/components/atoms/Modal';
import CreateEventModal from './modal/create-event';
import ShowEventDetailModal from './modal/show-detail';


const GoogleCalendar = () => {
	const theme = useTheme();
	const router = useRouter();

	const CalendarCode = router?.query?.code;

	const { data: AccessToken } = useUser_GetCalendarAccessTokenQuery()
	const AccessTokenDate = AccessToken?.user_getCalendarAccessToken?.result


	// ------------------------------------------states
	const [accessToken, setAccessToken] = useState<null | string>(null);
	const [calendarId, setCalendarId] = useState(null);
	console.log('calendarId', calendarId);

	const [Events, setEvents] = useState([]);
	console.log('Events', Events);

	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState({
		id: null,
		title: '',
		description: '',
		start: '',
		end: '',
		creator: '',
	});

	const calendarPageUrl = `${window.location.origin}/calendar`

	useEffect(() => {
		if (typeof AccessTokenDate === 'string') {
			setAccessToken(AccessTokenDate)
		}
	}, [AccessTokenDate])

	// --------------------------query
	// generate link
	const { data: calenderAuthLink } = useUser_GetCalendarAuthLinkQuery({
		redirectUrl: calendarPageUrl as string
	});
	const calenderAuthLinkData = calenderAuthLink?.user_getCalendarAuthLink?.result;

	// set code for backend
	const { mutate: calendaerAuthCode } = useUser_ExchangeCalendarAuthCodeForTokensMutation();

	// ------------------------------functions
	// login: go to genrated link
	const login = () => {
		if (calenderAuthLink) {
			window.location.href = calenderAuthLinkData as string;
		}
	};

	// see the code  and set code with mutation to backend and set access token in a state
	useEffect(() => {
		if (CalendarCode) {
			calendaerAuthCode(
				{
					code: CalendarCode as string,
					redirectUrl: calendarPageUrl as string
				},
				{
					onSuccess: (data) => {
						const { status, result } = responseDestructure(data);
						if (status.code == 1) {
							setAccessToken(result?.accessToken as string);
						} else {
							// enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}
	}, [CalendarCode]);

	// fetch calendar id
	useEffect(() => {
		if (accessToken) {
			axios
				.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
					headers: { Authorization: `Bearer ${accessToken}` },
				})
				.then((response) => {
					const primaryCalendar = response.data.items.find((calendar) => calendar.primary);
					if (primaryCalendar) {
						setCalendarId(primaryCalendar.id);
					}
					// setCalendarId(response.data.items[0].id);
				})
				.catch((error) => console.error('Error fetching calendar list:', error));
		}
	}, [accessToken]);

	// fetch events
	useEffect(() => {
		if (calendarId) {
			// Fetch user's calendar list or any other data if needed
			axios
				.get(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				})
				.then((response) => {
					const _event = response?.data?.items?.map((item) => ({
						id: item.id,
						title: item.summary,
						description: item.description,
						creator: item.creator?.email,
						start: item.start?.dateTime || item.start?.date,
						end: item.end?.dateTime || item.end?.date,
						allDay: !item.start?.dateTime,

					}));
					setEvents(_event);
				})
				.catch((error) => console.error('Error fetching calendar list:', error));
		}
	}, [calendarId]);


	const handleDateClick = (info) => {
		setSelectedDate(info.dateStr);
		handelModal(1)
	};

	const handleEventClick = (info) => {
		setSelectedEvent({
			id: info.event.id,
			title: info.event.title,
			description: info.event._def.extendedProps.description,
			start: info.event.start,
			end: info.event.end,
			creator: info.creator?.email,

		});
		handelModal(2)

	};

	const fetchCalendarEvents = async () => {
		try {
			const response = await axios.get(
				`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			);
			const updatedEvents = response.data.items.map((item) => ({
				id: item.id,
				title: item.summary,
				description: item.description,
				start: item.start?.dateTime || item.start?.date,
				end: item.end?.dateTime || item.end?.date,
				allDay: !item.start?.dateTime,
				creator: item.creator?.email,
			}));
			setEvents(updatedEvents);
		} catch (error) {
			console.error('Error fetching calendar events:', error);
		}
	};

	// ------------------------------- modal
	const [open, setOpen] = useState(false);
	const [counter, setCounter] = useState<number>(0);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = (num: Number) => {
		setCounter(num as number)
		handleOpen();
	};

	return (
		<Stack width={'100%'} height={'100%'}>
			{!accessToken || !calendarId ? (
				<Stack alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100%'}>
					<NextButton
						onClick={login}
						startIcon={<GoogleIcon />}
						isLoading={!calenderAuthLinkData}
						sx={{
							width: '250px',
							backgroundColor: theme?.palette?.infuuse?.blue100,
							boxShadow: 4,
							textTransform: 'none',
							borderRadius: '8px',
						}}
					>
						Sign in with google
					</NextButton>
				</Stack>
			) : (
				<Stack p={'8px 8px 16px 8px'}>
					<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
						<Typography fontWeight={'bold'} fontSize={'24px'} color={theme?.palette?.infuuse?.blue100}>
							Calendar
						</Typography>
						{/* 
						<NextButton
							// onClick={() => googleLogout()}
							startIcon={<GoogleIcon />}
							sx={{
								width: '250px',
								backgroundColor: theme?.palette?.infuuse?.blue100,
								boxShadow: 4,
								textTransform: 'none',
								borderRadius: '8px',
							}}
						>
							Sign out from google
						</NextButton> */}
					</Stack>

					<Divider sx={{ my: 2 }} />

					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin, googleCalendarPlugin, interactionPlugin]}
						initialView="dayGridMonth"
						events={Events}
						headerToolbar={{
							left: 'prev,next today',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay',
						}}
						width="100%"
						height="100%"
						contentHeight="auto"
						dateClick={handleDateClick}
						eventClick={handleEventClick}
					/>
					<ModalContainer open={open} handleClose={handleClose}>
						{counter === 1
							? <CreateEventModal
								handleClose={handleClose}
								accessToken={accessToken}
								fetchCalendarEvents={fetchCalendarEvents}
								selectedDate={selectedDate}
								calendarId={calendarId} />
							: counter === 2
								? <ShowEventDetailModal
									handleClose={handleClose}
									selectedEvent={selectedEvent}
									calendarId={calendarId}
									accessToken={accessToken}
									fetchCalendarEvents={fetchCalendarEvents} />
								: null}
					</ModalContainer>
				</Stack>
			)}
		</Stack>
	);
};

export default GoogleCalendar;


