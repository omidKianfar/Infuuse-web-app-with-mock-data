import { Participant } from 'twilio-video';

export interface ITwilioVideoCallParticipant {
    isLocalParticipant?: boolean;
    participant: Participant;
}
