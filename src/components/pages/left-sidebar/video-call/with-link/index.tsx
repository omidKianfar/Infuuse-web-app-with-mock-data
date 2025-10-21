import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import TwilioVideo, { connect, createLocalTracks } from 'twilio-video';
import LoginTwilioVideoCall from './login';
import RoomTwilioVideoCall from './room';
import { useRouter } from 'next/router';

const VideoCall = () => {
	const router = useRouter();
	const RoomName = router?.query?.code as string;

	const [token, setToken] = useState<string>('');

	const [room, setRoom] = useState<TwilioVideo.Room | null>(null);

	useEffect(() => {
		if (token === '') return;

		const handleConnectRoom = async () => {
			try {
				const localTracks = await createLocalTracks();
				const connectedRoom = await connect(token, {
					name: RoomName,
					tracks: localTracks,
					audio: true,
					video: true,
				});
				setRoom(connectedRoom);
			} catch (error) {
				console.log('Error connecting to Twilio video room:', error);
			}
		};

		handleConnectRoom();

		// Cleanup function
		return () => {
			room?.disconnect();
		};
	}, [token]);

	const handleLogoutRoom = () => {
		room?.disconnect();
		setRoom(null);
		setToken('');
	};

	return (
		<Stack width={'100%'} height={'100%'}>
			{!token ? (
				<LoginTwilioVideoCall setToken={setToken} />
			) : (
				<RoomTwilioVideoCall room={room} handleLogoutRoom={handleLogoutRoom} />
			)}
		</Stack>
	);
};

export default VideoCall;
