import { Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
	message: any;
}

const Message = ({ message }: Props) => {
	// -------------------------------tools

	return (
		<Stack borderRadius={2} p={1} boxShadow={2} position={'relative'}>
			<Typography
				sx={{
					lineBreak: 'anywhere',
					p: '4px 12px',
					wordBreak: 'break-word',
					textJustify: 'inter-word',
					wordWrap: 'break-word',
				}}
				dangerouslySetInnerHTML={{ __html: message?.conversationMessage?.message }}
			></Typography>{' '}
		</Stack>
	);
};

export default Message;
