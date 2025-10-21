import FacebookIcon from '@/assets/facebook-icon';
import GmailIcon from '@/assets/gmail-icon';
import LiveChatIcon from '@/assets/live-chat-icon';
import { TypeSocialNetwork } from '@/graphql/generated';
import { Box, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@/assets/phone-icon';
import SmsIcon from '@/assets/sms-icon';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InternalChatIcon from '@/assets/internal-chat-icon';

interface Props {
	message: any;
}

const RightIcons = ({ message }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	return (
		<>
			{router.pathname.includes('/call') && message?.conversationMemberId ? (
				<>
					{message?.typeSocialNetwork === TypeSocialNetwork?.TwilioVoiceCall ? (
						<Box ml={1}>
							<PhoneIcon fill={theme?.palette?.infuuse?.green300} />
						</Box>
					) : null}
				</>
			) : null}
		</>
	);
};

export default RightIcons;
