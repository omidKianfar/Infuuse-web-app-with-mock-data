import { Stack } from '@mui/material';
import React from 'react';
import AudioPlayer from '../../../send-message/message/play-audio';

interface Props {
	message: any;
}

const Message = ({ message }: Props) => {

	return (
		<Stack borderRadius={2} p={1} boxShadow={2} position={'relative'}>
			<AudioPlayer audioFile={message?.conversationAttachments[0]?.url} />{' '}
		</Stack>
	);
};

export default Message;
