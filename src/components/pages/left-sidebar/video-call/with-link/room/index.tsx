import { CircularProgress, Grid, Stack, styled, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Controllers from './footer';
import TwilioVideo, { LocalParticipant, RemoteParticipant } from 'twilio-video';
import TwilioVideoCallParticipant from './body';

interface Props {
	room: TwilioVideo.Room | null;
	handleLogoutRoom: () => void;
}

const RoomTwilioVideoCall = ({ room, handleLogoutRoom }: Props) => {
	const theme = useTheme();

	const [isInitialize, setIsInitialize] = useState<boolean>(false);
	const [localParticipant, setLocalParticipant] = useState<LocalParticipant | null>(null);
	const [remoteParticipants, setRemoteParticipants] = useState<Array<RemoteParticipant> | null>(null);

	useEffect(() => {
		if (room === null) {
			return;
		}
		setLocalParticipant(room.localParticipant);
		setRemoteParticipants(Array.from(room.participants.values()));
	}, [room]);

	useEffect(() => {
		if (remoteParticipants === null || isInitialize) return;
		room.on('participantConnected', handleJoinedParticipant);
		room.on('participantDisconnected', handleLeftParticipant);
		setIsInitialize(true);
	}, [isInitialize, remoteParticipants]);

	function handleJoinedParticipant(participant: RemoteParticipant) {
		setRemoteParticipants((prevState) => [...prevState, participant]);
	}

	function handleLeftParticipant(participant: RemoteParticipant) {
		setRemoteParticipants((prevState) => [...prevState.filter((p) => p.identity !== participant.identity)]);
	}

	if (room === null || remoteParticipants === null || localParticipant === null) {
		return (
			<CustomLoadingPage>
				<CircularProgress style={{ color: theme?.palette?.common?.white, width: 50, height: 50 }} />
			</CustomLoadingPage>
		);
	}

	return (
		<Stack width={'100%'} height={'100%'} bgcolor={theme?.palette?.infuuse?.blueDark500} p={2}>
			{/* --------------------------------header */}
			<Stack>
				<Typography fontWeight="bold" fontSize="24px" color={theme?.palette?.infuuse?.blue100} mb={4}>
					Video Call
				</Typography>
			</Stack>

			{/* --------------------------------cameras */}
			<Stack width={'100%'} height={'100%'} maxHeight={'80vh'} overflow={'auto'}>
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
					<Stack
						direction={'row'}
						justifyContent={'start'}
						alignItems={'center'}
						height={'100%'}
						width={'100%'}
						flexWrap={'wrap'}
						
					>
						{localParticipant && (
							<TwilioVideoCallParticipant isLocalParticipant participant={localParticipant} />
						)}

						{remoteParticipants?.length >= 1 &&
							remoteParticipants.map((remoteParticipant, index) => (
								<TwilioVideoCallParticipant key={index} participant={remoteParticipant} />
							))}
					</Stack>
				</Stack>
			</Stack>

			{/* --------------------------------controllers */}
			<Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
				<Controllers handleLogoutRoom={handleLogoutRoom} localParticipant={localParticipant} />
			</Stack>
		</Stack>
	);
};

export default RoomTwilioVideoCall;

export const CustomLoadingPage = styled(Stack)(({ theme }) => ({
	position: 'absolute',
	left: 0,
	top: 0,
	width: '100%',
	height: '100%',
	background: theme?.palette?.infuuse?.blueDark500,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));
