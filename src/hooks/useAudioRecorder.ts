import { useState, useEffect } from 'react';
import { InterpretTextOutput, Predictions } from '@aws-amplify/predictions';

import mic from 'microphone-stream';
import { getBuffer } from '@/utils/smartSearch';

export default function useAudioRecorder({ callback }: { callback: (result: InterpretTextOutput) => void }) {
	const [recording, setRecording] = useState(false);
	const [micStream, setMicStream] = useState<mic | null>(null);
	const [audioBuffer] = useState<any>(() => getBuffer());
	const [response, setResponse] = useState<InterpretTextOutput>();
	const [percent, setPercent] = useState(0);

	useEffect(() => {
		return () => {
			// Cleanup: Stop the microphone stream when the component unmounts
			micStream?.stop();
		};
	}, [micStream]);

	const convertFromBuffer = (bytes: any) => {
		Predictions?.convert({
			transcription: {
				source: {
					bytes,
				},
				language: 'en-US',
			},
		})
			.then(({ transcription: { fullText } }) => {
				interpretFromPredictions(JSON.stringify(fullText, null, 2));
			})
			.catch((err) => console.log('err', JSON.stringify(err, null, 2)));
	};

	const interpretFromPredictions = (textToInterpret: string) => {
		Predictions.interpret({
			text: {
				source: {
					text: textToInterpret,
				},
				type: 'all',
			},
		})
			.then((result) => {
				var textToDisplay = JSON.stringify(result);
				callback(result);
				setResponse(result);
			})
			.catch((err) => console.log(err));
	};

	const startRecording = async () => {
		audioBuffer.reset();

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });

			const startMic = new mic();
			startMic.setStream(stream);
			startMic.on('data', (chunk: any) => {
				var raw = mic.toRaw(chunk);
				if (raw == null) {
					return;
				}
				audioBuffer.addData(raw);
			});

			setRecording(true);
			setMicStream(startMic);
		} catch (error) {
			console.error('Error accessing microphone:', error);
		}
	};

	const stopRecording = () => {
		micStream?.stop();
		setMicStream(null);
		setRecording(false);

		const resultBuffer = audioBuffer.getData();
		convertFromBuffer(resultBuffer);
	};

	return {
		stopRecording,
		startRecording,
		recording,
		response,
	};
}
