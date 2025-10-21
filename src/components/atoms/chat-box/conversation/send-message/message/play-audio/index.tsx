import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

interface Props {
	audioFile?: string;
}

const AudioPlayer = ({ audioFile }: Props) => {
	const theme = useTheme();

	const wavesurfer = useRef<WaveSurfer | null>(null); 
	const waveFormRef = useRef<HTMLDivElement | null>(null); 

	const [playing, setPlaying] = useState(false);
	const [duration, setDuration] = useState(0);

	const formatTime = (seconds) => {
		let date = new Date(0);
		date.setSeconds(seconds);
		return date.toISOString().substr(11, 8);
	};

	useEffect(() => {
		wavesurfer.current = WaveSurfer.create({
			container: waveFormRef.current!,
			height: 50,
			waveColor: theme?.palette?.infuuse?.blue100,
			progressColor: theme?.palette?.infuuse?.green300,
			hideScrollbar: true,
			cursorColor: 'transparent',
			cursorWidth: 2,
			barWidth: 5,
			barGap: 1.5,
		});

		wavesurfer.current.load(audioFile);

		wavesurfer.current.on('ready', function () {
			setDuration(wavesurfer.current.getDuration());
		});
		wavesurfer.current.on('finish', function () {
			setPlaying(false);
		});

		// Cleanup function

		return () => {
			if (wavesurfer.current) {
				wavesurfer.current.destroy();
			}
		};
	}, [audioFile]);

	const handlePlay = () => {
		setPlaying(!playing);
		wavesurfer.current?.play();
	};
	const handlePause = () => {
		setPlaying(!playing);
		wavesurfer.current?.pause();
	};

	return (
		<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
			{playing ? (
				<Box onClick={handlePause} display={'flex'} justifyContent={'center'} alignItems={'center'} mr={1}>
					<PauseCircleIcon sx={{ fontSize: '32px', fill: theme?.palette?.infuuse?.blue500 }} />
				</Box>
			) : (
				<Box onClick={handlePlay} display={'flex'} justifyContent={'center'} alignItems={'center'} mr={1}>
					<PlayCircleIcon sx={{ fontSize: '32px',fill: theme?.palette?.infuuse?.blue500 }} />
				</Box>
			)}
			<Stack justifyContent={'start'} alignItems={'start'} mr={1}>
				<Stack ref={waveFormRef} style={{ width: '200px' }} />
			</Stack>
			<Stack direction={'row'} justifyContent={'end'} position={'absolute'} right={'8px'} bottom={'2px'}>
				<Typography fontSize={'12px'} color={theme?.palette?.infuuse?.blue500}>
					{formatTime(duration)}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default AudioPlayer;
