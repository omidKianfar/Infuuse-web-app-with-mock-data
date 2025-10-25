import { Stack } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import RightIcons from './icons/right-icons';
import Footer from './footer';
import Message from './message';
import LeftIcons from './icons/left-icons';
import { ConversationMessage } from '@/graphql/generated';

interface Props {
	message: ConversationMessage;
}

const SendMessage = ({ message }: Props) => {
	const router = useRouter();

	return (
		<Stack
			justifyContent={'center'}
			alignItems={
				router.pathname.includes('/contact-chat')
					? message?.conversationMemberId
						? 'start'
						: 'end'
					: message?.conversationMemberId
						? 'end'
						: 'start'
			}
			width={'100%'}
			mb={4}
			id={message.id}
		>
			<Stack width={'100%'} maxWidth={'500px'} height={'100%'}>
				<Stack
					direction={'row'}
					justifyContent={
						router.pathname.includes('/contact-chat')
							? message?.conversationMemberId
								? 'start'
								: 'end'
							: message?.conversationMemberId
								? 'end'
								: 'start'
					}
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
				<Footer message={message} />
			</Stack>
		</Stack>
	);
};

export default SendMessage;
