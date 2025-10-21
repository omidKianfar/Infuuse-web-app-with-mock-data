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
			{router.pathname.includes('/contact-chat') && message?.conversationMemberId === null ? (
				<Box ml={1}>
					<LiveChatIcon fill={theme?.palette?.infuuse.green300} />
				</Box>
			) : !router.pathname.includes('/contact-chat') && message?.conversationMemberId ? (
				<>
					{message?.typeSocialNetwork === TypeSocialNetwork?.LiveChat ? (
						<Box ml={1}>
							<LiveChatIcon fill={theme?.palette?.infuuse.green300} />
						</Box>
					) : message?.typeSocialNetwork === TypeSocialNetwork?.Email ? (
						<Box ml={1}>
							<GmailIcon
								fill={{
									fill1: '#EA4335',
									fill2: '#FBBC05',
									fill3: '#34A853',
									fill4: '#C5221F',
									fill5: '#4285F4',
								}}
							/>
						</Box>
					) : message?.typeSocialNetwork === TypeSocialNetwork?.Facebook ? (
						<Box ml={1}>
							<FacebookIcon fill={theme?.palette?.infuuse.blueDark400} />
						</Box>
					) : message?.typeSocialNetwork === TypeSocialNetwork?.Instagram ? (
						<Box ml={1}>
							<InstagramIcon
								sx={{ width: '32px', height: '32px', fill: theme?.palette?.infuuse.porple200 }}
							/>
						</Box>
					) : message?.typeSocialNetwork === TypeSocialNetwork?.PhoneNumber ? (
						<Box ml={1}>
							<PhoneIcon fill={theme?.palette?.infuuse?.green300} />
						</Box>
					) : message?.typeSocialNetwork === TypeSocialNetwork?.Sms ? (
						<Box ml={1}>
							<SmsIcon fill={theme?.palette?.infuuse.porple200} />
						</Box>
					) : message?.typeSocialNetwork === TypeSocialNetwork?.Mms ? (
						<Box ml={1}>
							<SmsIcon fill={theme?.palette?.infuuse.porple200} />
						</Box>
					) : message?.typeSocialNetwork === TypeSocialNetwork?.LiveChat ? (
						<Box ml={1}>
							<WhatsAppIcon
								sx={{ width: '32px', height: '32px', fill: theme?.palette?.infuuse.green300 }}
							/>
						</Box>
					) : router.pathname.includes('/internal-chat') ? (
						<Box ml={1}>
							<InternalChatIcon fill={theme?.palette?.infuuse.porple200} />
						</Box>
					) : null}
				</>
			) : null}
		</>
	);
};

export default RightIcons;
