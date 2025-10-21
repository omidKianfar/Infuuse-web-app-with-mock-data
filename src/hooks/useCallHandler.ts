import { useEffect, useState } from 'react';
import { Device } from '@twilio/voice-sdk';
import { useTwilio_AnswerCallByCallSidMutation, useTwilio_HoldCallByCallSidMutation, useTwilio_RejectCallByCallSidMutation, useTwilio_UnHoldCallByCallSidMutation, useTwilio_VoiceCallRequestMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { useSnapshot } from 'valtio';
import callBusinessStore from '@/store/call-business.store';
import { useChatContext } from '@/providers/chat-provider';
import { useTwilio } from '@/providers/twilioProvider';
import callStatusStore from '@/store/call-status.store';

const useCallHandler = () => {
	// -------------------------------------- providers
	// chat context
	const {
		CallInbox,
		handleAddCall,
		handleDeleteCall,
		handleChangeCallStatus
	} = useChatContext();

	// twilio
	const { twilioDevice } = useTwilio();

	// -----------------------------------state managment
	// call business
	const { twilioBusinessId } = useSnapshot(callBusinessStore);

	// call status
	const { isLoading, callSid } = useSnapshot(callStatusStore)

	// -----------------------------------------states
	const [myDevice, setMyDevice] = useState<Device | null>(null);

	// ----------------------------------------------query
	const { mutate: CallRequest } = useTwilio_VoiceCallRequestMutation();
	const { mutate: AnswerCall } = useTwilio_AnswerCallByCallSidMutation();
	const { mutate: RejectCall } = useTwilio_RejectCallByCallSidMutation();
	const { mutate: HoldCall } = useTwilio_HoldCallByCallSidMutation();
	const { mutate: UnHoldCall } = useTwilio_UnHoldCallByCallSidMutation();


	// ----------------------------------------------functions
	useEffect(() => {
		if (typeof CallInbox?.token !== 'string') return;

		const device = new Device(CallInbox?.token, { logLevel: 'DEBUG' });
		setMyDevice(device);

		device.audio.availableOutputDevices.forEach(function (device, id) {
			console.info('Available device:', id, '(labeled', device.label, ')');
		});

		device.on('ready', function (device) {
			// The device is now ready
			console.log('use call handler ready');
		});

		device.on('error', (error) => {
			console.log('use call handler error: ', error);
		});

		device.on('connect', (conn) => {
			const from = conn.message.from;
			const to = conn.message.to;
			const callSid = conn.parameters.callSid;
			const businessId = twilioBusinessId;

			const item = {
				from: from,
				to: to,
				callSid: callSid,
				businessId: twilioBusinessId,
				callStatus: 'outbound-progress'
			}
			console.log('useCall handler connect items', item);

			handleAddCall(item);

			CallRequest(
				{
					businessId: Number(businessId),
					input: {
						callSid: callSid,
						from: from,
						to: to,
					},
				},
				{
					onSuccess: (data) => {
						const { status } = responseDestructure(data);
						if (status.code === 1) {
						} else {
							console.error('Call request failed with status: ', status);
						}
					},
					onError: (error) => {
						console.error('Call request mutation failed: ', error);
					},
				}
			);
		});

		return () => {
			// Cleanup when the component is unmounted
			device.destroy();
		};
	}, [CallInbox?.token]);


	// dilar
	const handleDial = async (from: string, to: string) => {
		if (twilioDevice === null) return;
		console.log({ from, to });

		//device.connect({ from: from, to });
		myDevice.connect({ params: { From: from, To: to } });
	};


	// start call
	const startCallHandler = (callSid: string) => {
		console.log('start call sidId', callSid);

		AnswerCall(
			{ callSid: callSid },
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						callStatusStore.callSid = callSid;
						callStatusStore.isLoading = true;
					}
				},
				onError: (e) => {
					console.log({ e });
				},
			}
		);
	};

	// reject call
	const rejectCallHandler = (callSid: string) => {
		RejectCall(
			{ callSid: callSid },
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						handleDeleteCall(callSid);
					}
				},
				onError: (e) => {
					console.log({ e });
				},
			}
		);
	};

	// hold call
	const holdCallHandler = async (callSid: string) => {
		HoldCall(
			{ callSid: callSid },
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						handleChangeCallStatus(callSid, 'on-hold');
					}
				},
				onError: (e) => {
					console.log({ e });
				},
			}
		);
	};

	// hold call

	const handleUnHold = async (callSid: string) => {
		UnHoldCall(
			{ callSid: callSid },
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						handleChangeCallStatus(callSid, 'in-progress');
					}
				},
				onError: (e) => {
					console.log({ e });
				},
			}
		);
	};

	const handleMute = async (call) => {
		const localStream = call.getLocalStream();
		const tracks = localStream.getAudioTracks();

		tracks[0].enabled = false;

		handleChangeCallStatus(call.callSid, 'on-mute');

		await call.mute(true);
	};

	const handleUnMute = (call) => {
		const localStream = call.getLocalStream();
		const tracks = localStream.getAudioTracks();

		tracks[0].enabled = true;
		call.mute(false);

		handleChangeCallStatus(call.callSid, 'in-progress');
	};

	return {
		handleDial,
		startCallHandler,
		rejectCallHandler,
		holdCallHandler,
		handleUnHold,
		handleMute,
		handleUnMute
	};
};

export default useCallHandler;
