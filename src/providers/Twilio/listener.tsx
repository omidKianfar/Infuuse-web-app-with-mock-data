import { useTwilio_GetCallTokenQuery } from '@/graphql/generated';
import { Call, Device } from '@twilio/voice-sdk';
import { useEffect } from 'react';
import { useTwilio } from './provider';

type Props = {
	businessId: number;
};

export default function TwilioListener({ businessId }: Props) {
	const { callingDialog, activeConnection, setCallingDialog, setActiveConnection } = useTwilio();

	const { data: callTokenData } = useTwilio_GetCallTokenQuery(
		{ businessId },
		{ cacheTime: Infinity, staleTime: Infinity, enabled: !!businessId }
	);

	const twilioToken = callTokenData?.twilio_getCallToken?.result?.token;
	const inboundClientId = callTokenData?.twilio_getCallToken?.result?.inboundClientId;
	const outboundClientId = callTokenData?.twilio_getCallToken?.result?.outboundClientId;

	useEffect(() => {
		if (twilioToken) {
			const device = new Device(twilioToken, {
				logLevel: 'DEBUG',
				allowIncomingWhileBusy: true,
			});

			if (device) {
				device.register();

				device.on('ready', () => {});

				device.on('incoming', (connection) => {
					if (connection && connection.direction === Call.CallDirection.Incoming) {
						connection.accept();
						setCallingDialog(true);
					}
				});

				device.on('connect', (connection) => console.log('DEVICE CONNECT'));

				device.on('offline', (device) => {});

				device.on('cancel', (connection) => {
					console.log('cancel');
					// connection.disconnect();
					// setCallingDialog(false);
				});

				device.on('disconnect', (connection) => {
					console.log('disconnect');
					// setCallingDialog(false);
					// connection.disconnect();
				});
			}

			return () => {
				if (device) {
					device.removeAllListeners();
				}
			};
		}
	}, [twilioToken]);

	return null;
}
