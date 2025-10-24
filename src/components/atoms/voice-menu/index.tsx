'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Typography, useTheme } from '@mui/material';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import RecorderStore from './recorderStore';
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

let wavesurfer: WaveSurfer | null;
let record: any;

const VoiceChat = React.memo(({ setUploadedFile }: Props) => {
	const theme = useTheme();
	const [isRecording, setIsRecording] = useState(false);
	const timer = useStopwatch({ autoStart: false });
	const element = useRef<HTMLDivElement>(null);
	const { uploadFile } = useFileUpload();

	// Initialize wavesurfer once
	useEffect(() => {
		if (!wavesurfer && element.current) {
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

		return () => {
			if (wavesurfer) {
				wavesurfer.destroy();
				wavesurfer = null;
				record = null;
			}
		};
	}, []);

	// Add record-end listener once
	useEffect(() => {
		if (!record) return;

		const handleRecordEnd = async (blob: Blob) => {
			const recordedUrl = URL.createObjectURL(blob);
			wavesurfer?.load(recordedUrl);
			RecorderStore.mediaBlob = recordedUrl;
			timer.pause();
			setIsRecording(false);
		};

		record.on('record-end', handleRecordEnd);
		return () => {
			record.un('record-end', handleRecordEnd);
		};
	}, [record]);

	// Handle recording
	useEffect(() => {
		if (!isRecording || !record) return;
		timer.start();
		record.startRecording();
	}, [isRecording, record]);

	const isSupportAudioRecording = () =>
		Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

	const startRecording = async () => {
		if (!isSupportAudioRecording()) return;
		if (!isRecording) setIsRecording(true);
	};

	const stopRecording = async () => {
		timer.pause();
		if (record && record.isRecording()) await record.stopRecording();
	};

	const cancelRecording = async () => {
		timer.reset();
		if (record && record.isRecording()) await record.stopRecording();
		setIsRecording(false);

		if (wavesurfer) {
			wavesurfer.destroy();
			wavesurfer = null;
			record = null;
		}
		setUploadedFile({ photoUrl: '', videoUrl: '', fileUrl: '', voiceUrl: '', type: 'text' });
	};

	const onPause = () => wavesurfer?.pause();
	const onPlay = () => wavesurfer?.play();

	// Upload recorded audio
	useEffect(() => {
		if (!RecorderStore.mediaBlob) return;

		const upload = async () => {
			await new Promise((r) => setTimeout(r, 100));
			const response = await fetch(RecorderStore.mediaBlob);
			const mediaBlob = await response.blob();
			const arrayBuffer = await new Response(mediaBlob).arrayBuffer();
			const blob = new Blob([arrayBuffer], { type: 'audio/wav' });

			const formData = new FormData();
			formData.append('file', blob, `${uuid()}.wav`);
			const file = formData.get('file');
			if (!file) return;

			const result = await uploadFile(file as File);
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
		};

		upload();
	}, [RecorderStore.mediaBlob, setUploadedFile, uploadFile]);

	return (
		<ChatContainer width="100%" height="40px" direction="row">
			<IconBox mr={1} onClick={cancelRecording}>
				<CloseIcon sx={{ fill: theme.palette.infuuse.red300, fontSize: '24px' }} />
			</IconBox>

			<IconBox mr={1} onClick={isRecording ? stopRecording : startRecording}>
				{isRecording ? (
					<StopCircleIcon sx={{ fill: theme.palette.infuuse.blue500, fontSize: '28px' }} />
				) : (
					<RadioButtonCheckedIcon sx={{ fill: theme.palette.infuuse.red300, fontSize: '28px' }} />
				)}
			</IconBox>

			<IconBox mr={1} onClick={isRecording ? onPause : onPlay}>
				{isRecording ? (
					<PauseIcon sx={{ fill: theme.palette.infuuse.blueDark100, fontSize: '28px' }} />
				) : (
					<PlayArrowIcon sx={{ fill: theme.palette.infuuse.blueDark100, fontSize: '28px' }} />
				)}
			</IconBox>

			<div style={{ width: '100%', height: '50px' }} ref={element} />

			<Typography component="span" style={{ color: '#64708A', fontSize: 12, textAlign: 'center' }}>
				{timer.minutes.toString().padStart(2, '0')}:{timer.seconds.toString().padStart(2, '0')}
			</Typography>
		</ChatContainer>
	);
});

export default VoiceChat;
