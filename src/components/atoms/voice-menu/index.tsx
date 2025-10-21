'use client';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Typography, useTheme } from '@mui/material';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import RecorderStore from './recorderStore';
import DeleteIcon from '@/assets/delete-icon';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ChatContainer, IconBox } from './styles';
import useFileUpload from '@/hooks/useUploadFile';
import { v4 as uuid } from 'uuid';
import { getFullImageUrl } from '@/utils';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import CloseIcon from '@mui/icons-material/Close';
interface Props {
	setUploadedFile: React.Dispatch<
		React.SetStateAction<{
			photoUrl: string;
			videoUrl: string;
			fileUrl: string;
			voiceUrl: string;
			type: string;
		}>
	>;
}

//@ts-ignore
let wavesurfer: WaveSurfer | null;
let record: any;

const VoiceChat = ({ setUploadedFile }: Props) => {
	const theme = useTheme();
	const [isRecording, setIsRecording] = useState(false);
	const timer = useStopwatch({ autoStart: false });
	const element = useRef(null);
	const [_, forceUpdate] = useReducer((x) => x + 1, 0);

	useEffect(() => {
		if (element.current && !wavesurfer) {
			wavesurfer = WaveSurfer.create({
				container: element.current,
				height: 48,
				waveColor: '#00b8ff',
				progressColor: '#1e594f',
				hideScrollbar: true,
				cursorColor: '#5df9de',
				cursorWidth: 2,
				barWidth: 5,
				barGap: 1.5,
			});

			record = wavesurfer.registerPlugin(
				RecordPlugin.create({ scrollingWaveform: false, renderRecordedAudio: true })
			);
		}
	}, [element.current]);

	useEffect(() => {
		if (isRecording && record) {
			timer.start();
			record.startRecording();
			record.on('record-end', (blob) => {
				const recordedUrl = URL.createObjectURL(blob);
				console.log({ recordedUrl });
				wavesurfer?.load(recordedUrl);
				RecorderStore.mediaBlob = recordedUrl;
				timer.pause();
				setIsRecording(false);
			});
		}
	}, [isRecording, record]);

	function handleRemoveRecording() {
		cancelRecording();

		setUploadedFile({ photoUrl: '', videoUrl: '', fileUrl: '', voiceUrl: '', type: 'text' });
	}

	function isSupportAudioRecording() {
		return Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
	}

	async function startRecording() {
		if (!isSupportAudioRecording()) {
			return;
		}

		try {
			if (!isRecording) {
				setIsRecording(true);
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	async function stopRecording() {
		try {
			timer.pause();
			if (record && record.isRecording()) {
				await record.stopRecording();
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	async function cancelRecording() {
		try {
			timer.reset();
			if (record && record.isRecording()) {
				await record.stopRecording();
				setIsRecording(false);
			}
			if (wavesurfer) {
				wavesurfer.destroy();
				wavesurfer = null;
				record = null;
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	const onPause = () => {
		wavesurfer?.pause();
	};

	const onPlay = () => {
		wavesurfer?.play();
	};

	const { uploadFile, url, isUploading } = useFileUpload();

	useEffect(() => {
		if (RecorderStore.mediaBlob === '') {
			return;
		}

		(async () => {
			await new Promise((resolve) => setTimeout(resolve, 100));

			// Convert blob URL to ArrayBuffer
			const response = await fetch(RecorderStore.mediaBlob);
			const mediaBlob = await response.blob();
			const arrayBuffer = await new Response(mediaBlob).arrayBuffer();

			// Create a Blob from the ArrayBuffer
			const blob = new Blob([arrayBuffer], { type: 'audio/wav' });

			// Create a FormData object and append the Blob
			const formData = new FormData();
			formData.append('file', blob, `${uuid()}.wav`);

			const result = await uploadFile(formData.get('file'));

			if (result) {
				setUploadedFile({
					photoUrl: '',
					videoUrl: '',
					fileUrl: '',
					voiceUrl: getFullImageUrl(result.url) as string,
					type: 'voice',
				});
				RecorderStore.mediaBlob = '';
			}
		})();
		// eslint-disable-next-line
	}, [RecorderStore.mediaBlob]);

	return (
		<ChatContainer width={'100%'} height={'40px'} direction={'row'}>
			<IconBox mr={1} onClick={handleRemoveRecording}>
				<CloseIcon sx={{
					fill: theme?.palette?.infuuse?.red300,
					fontSize: '24px',
				}} />
			</IconBox>

			<IconBox mr={1} onClick={isRecording ? stopRecording : startRecording}>
				{isRecording ? (
					<StopCircleIcon
						sx={{
							fill: theme?.palette?.infuuse?.blue500,
							fontSize: '28px',
						}}
					/>
				) : (
					<RadioButtonCheckedIcon
						sx={{
							fill: theme?.palette?.infuuse?.red300,
							fontSize: '28px',
						}}
					/>
				)}
			</IconBox>

			{isRecording ? (
				<IconBox mr={1} onClick={onPause}>
					<PauseIcon sx={{ fill: theme?.palette?.infuuse?.blueDark100, fontSize: '28px' }} />
				</IconBox>
			) : (
				<IconBox mr={1} onClick={onPlay}>
					<PlayArrowIcon sx={{ fill: theme?.palette?.infuuse?.blueDark100, fontSize: '28px' }} />
				</IconBox>
			)}

			<div
				style={{
					width: '100%',
					height: '50px',
				}}
				ref={element}
			/>

			<Typography component="span" style={{ color: '#64708A', fontSize: 12, textAlign: 'center' }}>
				{timer.minutes.toString().length === 1 ? `0${timer.minutes}` : timer.minutes}:
				{timer.seconds.toString().length === 1 ? `0${timer.seconds}` : timer.seconds}
			</Typography>
		</ChatContainer>
	);
};

export default VoiceChat;
