import { ConversationMessage, TypeSocialNetwork } from '@/graphql/generated';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

import FromAllMessage from './all';
import SMSMessage from './mms';
import GmailMessage from './gmail';

interface Props {
	message: ConversationMessage;
}

const Message = ({ message }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	return (
		<Stack>
			{message?.typeSocialNetwork === TypeSocialNetwork?.Sms ? (
				<Box borderRadius={2} bgcolor={theme?.palette?.common?.white} p={2} boxShadow={2}>
					<pre
						style={{
							lineBreak: 'anywhere',
							padding: '4px 12px',
							wordBreak: 'break-word',
							textJustify: 'inter-word',
							wordWrap: 'break-word',
							fontFamily: 'sans-serif',
							color: theme?.palette?.infuuse?.blueDark,

						}}
					>{message?.message}</pre>
				</Box>
			) : message?.typeSocialNetwork === TypeSocialNetwork?.Mms ? (
				<SMSMessage message={message} />
			) : message?.typeSocialNetwork === TypeSocialNetwork?.Email ? (
				<GmailMessage message={message} />
			) : (
				<FromAllMessage message={message} />
			)}
		</Stack>
	);
};

export default Message;
