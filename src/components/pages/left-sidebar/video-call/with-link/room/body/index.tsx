import { useEffect, useState } from 'react';
import TwilioVideoCallTrack from './track';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { Participant } from 'twilio-video';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';

interface Props {
	isLocalParticipant?: boolean;
	participant: Participant;
}

const TwilioVideoCallParticipant = ({ participant, isLocalParticipant }: Props) => {
	const theme = useTheme();

	const [tracks, setTracks] = useState([]);

	const trackpubsToTracks = (trackMap) =>
		Array.from(trackMap.values())
			.map((publication: any) => publication.track)
			.filter((track) => track !== null);

	useEffect(() => {
		setTracks(trackpubsToTracks(participant.tracks));

		const trackSubscribed = (track) => {
			setTracks((prevState) => [...prevState, track]);
		};

		const trackUnsubscribed = (track) => {
			setTracks((prevState) => prevState.filter((t) => t !== track));
		};

		participant.on('trackSubscribed', trackSubscribed);
		participant.on('trackUnsubscribed', trackUnsubscribed);

		return () => {
			setTracks([]);
			participant.removeAllListeners();
		};
	}, [participant]);

	return (
		<Stack width={'250px'} height={'250px'} mb={2} mr={2}>
			<Stack width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'start'} mb={2}>
				<Typography fontSize="16px" fontWeight="normal" color={theme?.palette?.common?.white}>
					{stringSlicer(participant.identity, 20)}
				</Typography>
			</Stack>

			<Stack>
				{tracks?.length >= 1 &&
					tracks.map((track, index) => (
						<TwilioVideoCallTrack key={index} isLocalParticipant={isLocalParticipant} track={track} />
					))}
			</Stack>
		</Stack>
	);
};

export default TwilioVideoCallParticipant;
