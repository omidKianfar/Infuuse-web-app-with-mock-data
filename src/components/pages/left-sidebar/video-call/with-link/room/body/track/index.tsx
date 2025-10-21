import { FC, useEffect, useRef } from 'react';
import { ITwilioVideoCallTrack } from './types';
import { Box, Stack } from '@mui/material';

const TwilioVideoCallTrack: FC<ITwilioVideoCallTrack> = ({ track, isLocalParticipant }) => {
	const trackContainerRef = useRef();

	useEffect(() => {
		if (track === null) return;

		const child = track.attach();

		trackContainerRef.current.classList.add(track.kind);
		trackContainerRef.current.appendChild(child);
	}, [track, isLocalParticipant]);

	return (
		<Box
			ref={trackContainerRef}
			sx={{
				width: '100%',
				height: '100%',
				'& video': {
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					borderRadius: 2,
				},
			}}
		/>
	);
};

export default TwilioVideoCallTrack;
