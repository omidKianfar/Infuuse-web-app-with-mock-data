import { ConversationMessage } from '@/graphql/generated';
import { Call, Device } from '@twilio/voice-sdk';

export interface TwilioInitPayload {
	token: string;
	device: Device;
}

export interface TwilioCallPayload {
	connection: Call;
}

export interface BusinessInfoType {
	businessId: number;
	phoneNumber: string;
}

// Define a type for the slice state
export interface TwilioProviderState {
	callingDialog: boolean;
	twilioToken: string | null;
	twilioDevice: Device | null;
	businessInfo: BusinessInfoType | null;
	callHistory: Array<ConversationMessage>;
	activeConnection: Call | null | undefined;
}
