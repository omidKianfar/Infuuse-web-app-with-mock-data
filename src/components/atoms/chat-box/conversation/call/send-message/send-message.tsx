import { Stack } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import RightIcons from './icons/right-icons';
import Message from './message';
import LeftIcons from './icons/left-icons';

interface Props {
	message: any;
}

const SendMessageCall = ({ message }: Props) => {
	// -------------------------------tools
	const router = useRouter();

	return (
		<Stack
			justifyContent={'center'}
			alignItems={message?.conversationMemberId ? 'end' : 'start'}
			width={'100%'}
			mb={4}
		>
			<Stack width={'100%'} maxWidth={'500px'} height={'100%'}>
				<Stack
					direction={'row'}
					justifyContent={message?.conversationMemberId ? 'end' : 'start'}
					alignItems={'start'}
					mb={1}
				>
					{/* ----------------------------- icons */}
					<LeftIcons message={message} />

					{/* ----------------------------- chats */}

					<Message message={message} />

					{/* -------------------------------------icons */}
					<RightIcons message={message} />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default SendMessageCall;
