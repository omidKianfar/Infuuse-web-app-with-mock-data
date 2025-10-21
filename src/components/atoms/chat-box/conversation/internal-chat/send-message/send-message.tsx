import { Stack } from '@mui/material';
import React from 'react';
import RightIcons from './icons/right-icons';
import Footer from './footer';
import Message from './message';
import LeftIcons from './icons/left-icons';
import { ConversationMessage, useUser_GetCurrentUserQuery } from '@/graphql/generated';

interface Props {
	message: ConversationMessage;
}

const SendMessageInternalChat = ({ message }: Props) => {


	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUserId = User?.user_getCurrentUser?.result?.user?.id


	return (
		<Stack
			justifyContent={'center'}
			alignItems={
				Number(CurrentUserId) === Number(message?.conversationMember?.user?.id)
					? 'end'
					: 'start'
			}
			width={'100%'}
			mb={4}
		>
			<Stack width={'100%'} maxWidth={'500px'} height={'100%'}>
				<Stack
					direction={'row'}
					justifyContent={
						Number(CurrentUserId) === Number(message?.conversationMember?.user?.id)
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

export default SendMessageInternalChat;
