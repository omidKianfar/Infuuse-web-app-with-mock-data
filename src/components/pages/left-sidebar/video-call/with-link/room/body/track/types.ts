import { TrackPublication } from 'twilio-video';

export interface ITwilioVideoCallTrack {
    track: any;
    isLocalParticipant: boolean;
}
