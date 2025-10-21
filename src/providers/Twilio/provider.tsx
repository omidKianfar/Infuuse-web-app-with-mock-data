import { ConversationMessage, TypeSocialNetwork, useTwilio_GetCallTokenQuery } from '@/graphql/generated';
import { useMessageSubscription } from '@/hooks/useMessageSubscription';
import { useUser } from '@/hooks/useUser';
import { Call, Device } from '@twilio/voice-sdk';
import { createContext, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { BusinessInfoType, TwilioProviderState } from './types';
import TwilioListener from './listener';
import { useSnapshot } from 'valtio';
import twilioCallTokenStore from '@/store/twilio-call-token.store';

const initialState: TwilioProviderState = {
	callHistory: [],
	twilioToken: null,
	twilioDevice: null,
	businessInfo: null,
	callingDialog: false,
	activeConnection: null,
};
console.log('initialState', initialState);

export const TwilioContext = createContext({
	...initialState,
	handleDisconnect: () => { },
	handleDial: (from: string, to: string) => { },
	setActiveConnection: (connection: Call) => { },
	setCallingDialog: (callingDialog: boolean) => { },
	setBusinessInfo: (businessId: number, phoneNumber: string) => { },
});

type ActionType = 'INITIALIZE' | 'SET_CONNECTION' | 'SET_HISTORY' | 'SET_CALLING_DIALOG' | 'SET_BUSINESS_INFO';

type ActionPayload = {
	callingDialog?: boolean;
	twilioToken?: string | null;
	twilioDevice?: Device | null;
	activeConnection?: Call | null;
	call?: ConversationMessage | null;
	businessInfo?: BusinessInfoType | null;
};

const twilioReducer = (
	state: TwilioProviderState,
	action: { payload: ActionPayload; type: ActionType }
): TwilioProviderState => {
	if (action.type === 'INITIALIZE') {
		return {
			...state,
			twilioToken: action.payload.twilioToken as string,
			twilioDevice: action.payload.twilioDevice as Device,
		};
	} else if (action.type === 'SET_CONNECTION') {
		return {
			...state,
			activeConnection: action.payload.activeConnection,
		};
	} else if (action.type === 'SET_HISTORY') {
		return {
			...state,
			callHistory: [...state.callHistory, action.payload.call!],
		};
	} else if (action.type === 'SET_CALLING_DIALOG') {
		return {
			...state,
			callingDialog: action.payload.callingDialog as boolean,
		};
	} else if (action.type === 'SET_BUSINESS_INFO') {
		return {
			...state,
			businessInfo: action.payload.businessInfo as BusinessInfoType,
		};
	}

	return state;
};

export default function TwilioContextProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(twilioReducer, initialState);



	const { userData } = useUser();
	const twilioBusinessId = userData?.businessAccesses?.[0]?.business?.id as number;
	const twilioPhoneNumber = userData?.businessAccesses?.[0]?.business?.twilioPhoneNumber?.phoneNumber as string;

	const onGetMessages = (event: MessageEvent) => {
		const res = JSON.parse(event.data);
		if (res.type === 'data') {
			const call = res.payload.data.conversationMessage as ConversationMessage;
			if (call.typeSocialNetwork === TypeSocialNetwork.TwilioVoiceCall) {
				dispatch({ type: 'SET_HISTORY', payload: { call } });
			}
		}
	};
	useMessageSubscription(onGetMessages);

	const setActiveConnection = (connection: Call | null) => {
		console.log('connection', connection);

		dispatch({
			payload: { activeConnection: connection },
			type: 'SET_CONNECTION',
		});
	};

	const setCallingDialog = (callingDialog: boolean) => {
		console.log('callingDialog', callingDialog);

		dispatch({
			payload: { callingDialog },
			type: 'SET_CALLING_DIALOG',
		});
	};

	const setBusinessInfo = (businessId: number, phoneNumber: string) => {
		console.log('businessId', businessId);
		console.log('phoneNumber', phoneNumber);

		dispatch({
			payload: { businessInfo: { businessId, phoneNumber } },
			type: 'SET_BUSINESS_INFO',
		});
	};

	const handleDial = async (from: string, to: string) => {
		console.log('state.twilioDevice', state.twilioDevice);
		console.log('to', to);
		console.log('from', from);

		if (state.twilioDevice) {
			state.twilioDevice.connect({ params: { From: from, To: to } });
			console.log('connect');

		}
	};

	const handleDisconnect = async () => {
		if (state.activeConnection) {
			state.activeConnection.disconnect();
			console.log('state.activeConnection', state.activeConnection);
			console.log('disconnect');

		}
	};

	useEffect(() => {
		if (userData && userData.isBusinessOwner) {
			setBusinessInfo(twilioBusinessId, twilioPhoneNumber);
		}
	}, [userData]);


	// ------------------------------------------
	const { data: callTokenData } = useTwilio_GetCallTokenQuery(
		{ businessId: twilioBusinessId },
		{ cacheTime: Infinity, staleTime: Infinity, enabled: !!twilioBusinessId }
	);

	const twilioToken = callTokenData?.twilio_getCallToken?.result?.token;
	const inboundClientId = callTokenData?.twilio_getCallToken?.result?.inboundClientId;
	const outboundClientId = callTokenData?.twilio_getCallToken?.result?.outboundClientId;

	console.log('Twilio Token:', twilioToken);


	useEffect(() => {
		if (twilioToken) {
			const device = new Device(twilioToken, { logLevel: 'DEBUG', allowIncomingWhileBusy: true });
			console.log('device', device);

			console.log();

			if (device) {
				dispatch({
					type: 'INITIALIZE',
					payload: {
						twilioToken: twilioToken,
						twilioDevice: device,
					},
				});

				device.register();

				device.on('error', (error) => {
					console.error('Twilio Device Error:', error);
					console.log('error', error);

				});

				device.on('ready', () => {
					console.log('ready');

				});

				device.on('incoming', (connection) => {
					console.log('incoming');
					console.log('connection', connection);

					if (connection && connection.direction === Call.CallDirection.Incoming) {
						console.log({ connection });
						connection.accept();
						setCallingDialog(true);
					}
				});

				device.on('connect', (connection) => console.log('DEVICE CONNECT'));

				// device.on('offline', (device) => { });

				// device.on('cancel', (connection) => {
				// 	connection.disconnect();
				// 	setCallingDialog(false);
				// });

				// device.on('disconnect', (connection) => {
				// 	connection.disconnect();
				// 	setCallingDialog(false);
				// });
			}

			// return () => {
			// 	if (device) {
			// 		device.removeAllListeners();
			// 	}
			// };
		}
	}, [twilioToken]);

	return (
		<TwilioContext.Provider
			value={{
				...state,
				handleDial,
				setBusinessInfo,
				setCallingDialog,
				handleDisconnect,
				setActiveConnection,
			}}
		>
			{children}

			{/* {userData?.businessAccesses?.map((business) => (
				<TwilioListener key={business?.business?.id} businessId={business?.business?.id as number} />
			))} */}
		</TwilioContext.Provider>
	);
}

export const useTwilio = () => {
	const twilio = useContext(TwilioContext);

	return twilio;
};
