// // TwilioContext.js
// import React, {
// 	createContext,
// 	useContext,
// 	useState,
// 	useEffect,
// 	PropsWithChildren
// } from 'react';
// import { Device, Call } from '@twilio/voice-sdk';
// import { useChatContext } from './chat-provider';
// import { useSnapshot } from 'valtio';
// import callStatusStore from '@/store/call-status.store';

// // Create a provider component
// export const TwilioProvider = ({ children }: PropsWithChildren) => {

// 	// -------------------------------------- chat context
// 	const {
// 		CallInbox,
// 		handleAddCall,
// 		handleUpdateCall,
// 	} = useChatContext();



// 	const [twilioDevice, setTwilioDevice] = useState<Device | null>(null);
// 	const [connection, setConnection] = useState<Call | null>(null);

// 	const { isLoading } = useSnapshot(callStatusStore)

// 	useEffect(() => {
// 		if (typeof CallInbox?.token !== 'string') return;

// 		const device = new Device(CallInbox?.token, { logLevel: 'DEBUG' });

// 		setTwilioDevice(device);

// 		device.register();

// 		device.audio.availableOutputDevices.forEach(function (device, id) {
// 			console.info('Available device:', id, '(labeled', device.label, ')');
// 		});

// 		device.on('ready', function (device) {
// 			// The device is now ready
// 			console.log('twilio provider ready');
// 		});

// 		device.on('error', (error) => {
// 			console.log('twilio provider error: ', error);
// 		});

// 		device.on('incoming', async (connect: Call) => {
// 			console.log('incoming');
// 			console.log('connect',connect);

// 			const clientId = connect.parameters.From;
// 			console.log('twilio provider cllientId', clientId);


// 			handleUpdateCall(clientId, connect);

// 			setConnection(connect);

// 			callStatusStore.isLoading = false;
// 		});

// 		device.on('connect', (conn) => {

// 			const item = {
// 				from: conn.message.from,
// 				to: conn.message.to,
// 				callSid: conn.parameters.callSid,
// 				callStatus: 'outbound-progress'
// 			}

// 			console.log('twilio provider item', item);

// 			handleAddCall(item);

// 		});

// 		return () => {
// 			// Cleanup when the component is unmounted
// 			device.destroy();
// 		};
// 	}, [CallInbox?.token, CallInbox]);

// 	return (
// 		<TwilioContext.Provider value={{ twilioDevice, connection, setConnection }}>
// 			{children}
// 		</TwilioContext.Provider>
// 	);
// };

// type TwilioContextType = {
// 	twilioDevice: Device | null,
// 	connection: Call | null,
// 	setConnection: React.Dispatch<React.SetStateAction<Call | null>>
// };

// // -------------------------------context
// export const TwilioContext = createContext({} as TwilioContextType);

// // Create a hook to use the Twilio context
// export const useTwilio = () => {
// 	const twilioDevice = useContext(TwilioContext);

// 	if (!twilioDevice) {
// 		throw new Error('useTwilio must be used within a TwilioProvider');
// 	}

// 	return twilioDevice;
// };
