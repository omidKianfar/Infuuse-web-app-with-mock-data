import { Stack } from '@mui/material';
import React, { useState } from 'react';
import AddContactChat from './add';
import Contact_Chat from './chat';

const ContactChat = () => {
	const [counter, setCounter] = useState(0);

	return (
		<Stack width={'100%'} height={'100%'}>
			{counter === 0 ? <AddContactChat setCounter={setCounter} /> : <Contact_Chat />}
		</Stack>
	);
};

export default ContactChat;
