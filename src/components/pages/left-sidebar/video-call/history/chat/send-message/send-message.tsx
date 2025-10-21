import { Stack } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import RightIcons from './icons/right-icons';
import Footer from './footer';
import Message from './message';
import LeftIcons from './icons/left-icons';

interface Props {
	message: any;
}

const SendMessageCall = ({ message }: Props) => {
	// -------------------------------tools
	const router = useRouter();

	return (
		<Stack justifyContent={'center'} alignItems={'start'} width={'100%'} mb={4}>
			<Stack width={'100%'} maxWidth={'500px'} height={'100%'}>
				<Stack direction={'row'} justifyContent={'start'} alignItems={'start'} mb={1}>
					{/* ----------------------------- icons */}
					<LeftIcons />

					{/* ----------------------------- chats */}

					<Message message={message} />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default SendMessageCall;
