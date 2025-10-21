import FacebookIcon from '@/assets/facebook-icon';
import GmailIcon from '@/assets/gmail-icon';
import InternalChatIcon from '@/assets/internal-chat-icon';
import LiveChatIcon from '@/assets/live-chat-icon';
import { TypeSocialNetwork } from '@/graphql/generated';
import { Box, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@/assets/phone-icon';
import SmsIcon from '@/assets/sms-icon';
import VideoIcon from '@/assets/video-icon';

const LeftIcons = () => {
	const theme = useTheme();
	const router = useRouter();

	return (
		<>
			{router.pathname.includes('/video-call/history') ? (
				<>
					<Box mr={1}>
						<VideoIcon fill={theme?.palette?.infuuse?.orange200} />
					</Box>
				</>
			) : null}
		</>
	);
};

export default LeftIcons;
