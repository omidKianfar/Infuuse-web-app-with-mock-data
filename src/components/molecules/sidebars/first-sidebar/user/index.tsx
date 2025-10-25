import React, { useContext, useEffect, useState, } from 'react';
import IconComponent from '../icon-component';
import { useRouter } from 'next/router';
import { Box, Stack, useTheme } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ReportIcon from '@/assets/report-icon';
import InboxIcon from '@/assets/inbox-icon';
import PhoneIcon from '@/assets/phone-icon';
import SmsIcon from '@/assets/sms-icon';
import LiveChatIcon from '@/assets/live-chat-icon';
import VideoCallIcon from '@/assets/video-call-icon';
import FacebookIcon from '@/assets/facebook-icon';
import GmailIcon from '@/assets/gmail-icon';
import { TypeSocialNetwork, useConversation_GetUnseenMessagesByTypeQuery, UserDto, UserType, } from '@/graphql/generated';
import { queryClient } from 'pages/_app';
import { SubscriptionLayoutContext } from '@/providers/socialMessageProvider';

interface Props {
	CurrentUser: UserDto
}

const UserSidebarIcon = ({ CurrentUser }: Props) => {
	const router = useRouter();
	const theme = useTheme();

	const { lastMessageSubscription } = useContext(SubscriptionLayoutContext);


	const variables = {
		take: 10000,
		skip: 0,
	}

	const { data: UnSeenConversationsMessages } = useConversation_GetUnseenMessagesByTypeQuery(variables);
	const UnSeenConversationsMessagesData = UnSeenConversationsMessages?.conversation_getUnseenMessagesByType?.result;

	useEffect(() => {
		if (lastMessageSubscription) {
			refetchQueries()
		}
	}, [lastMessageSubscription])

	const refetchQueries = async () => {
		await queryClient.invalidateQueries(['conversation_getList'])
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	}

	const unSeenInboxMessage = UnSeenConversationsMessagesData?.items?.filter((unseenMessages) =>
		unseenMessages?.typeSocialNetwork !== TypeSocialNetwork?.InternalChat &&
		unseenMessages?.typeSocialNetwork !== TypeSocialNetwork?.SupportChat &&
		unseenMessages?.typeSocialNetwork !== TypeSocialNetwork?.SupportChatSurvey &&
		unseenMessages?.typeSocialNetwork !== TypeSocialNetwork?.TwilioVideoCall
	)?.map((unseenMessages) =>
		unseenMessages?.countUnseenMessages
	)?.reduce((a, b) => a += b, 0)




	const unSeenCallMessage = UnSeenConversationsMessagesData?.items?.filter((unseenMessages) =>
		unseenMessages?.typeSocialNetwork === TypeSocialNetwork?.TwilioVoiceCall
	)?.map((unseenMessages) =>
		unseenMessages?.countUnseenMessages
	)

	const unSeenFacbookMessage = UnSeenConversationsMessagesData?.items?.filter((unseenMessages) =>
		unseenMessages?.typeSocialNetwork === TypeSocialNetwork?.Facebook
	)?.map((unseenMessages) =>
		unseenMessages?.countUnseenMessages
	)

	const unSeenInstagramMessage = UnSeenConversationsMessagesData?.items?.filter((unseenMessages) =>
		unseenMessages?.typeSocialNetwork === TypeSocialNetwork?.Instagram
	)?.map((unseenMessages) => unseenMessages?.countUnseenMessages
	)

	const unSeenWhatsappMessage = UnSeenConversationsMessagesData?.items?.filter((unseenMessages) =>
		unseenMessages?.typeSocialNetwork === TypeSocialNetwork?.WhatsApp
	)?.map((unseenMessages) => unseenMessages?.countUnseenMessages
	)

	const unSeenGmailMessage = UnSeenConversationsMessagesData?.items?.filter((unseenMessages) =>
		unseenMessages?.typeSocialNetwork === TypeSocialNetwork?.Email
	)?.map((unseenMessages) => unseenMessages?.countUnseenMessages
	)

	const unSeenSMSMessage = UnSeenConversationsMessagesData?.items?.filter((unseenMessages) =>
		unseenMessages?.typeSocialNetwork === TypeSocialNetwork?.Sms ||
		unseenMessages?.typeSocialNetwork === TypeSocialNetwork?.Mms
	)?.map((unseenMessages) =>
		unseenMessages?.countUnseenMessages
	)?.reduce((a, b) => a += b, 0)

	const unSeenLiveChatMessage = UnSeenConversationsMessagesData?.items?.filter((unseenMessages) =>
		unseenMessages?.typeSocialNetwork === TypeSocialNetwork?.LiveChat
	)?.map((unseenMessages) =>
		unseenMessages?.countUnseenMessages
	)

	return (
		<>
			{/* -------------------------------reports */}
			{CurrentUser?.isBusinessOwner ||
				CurrentUser?.user?.userType === UserType?.AgencyMember ||
				(CurrentUser?.user?.userType === UserType?.BusinessMember &&
					CurrentUser?.businessAccesses?.[0]?.access?.isReportAccess) ? (
				<IconComponent
					pathname="/reports"
					hover={'Reports'}
					active={router?.pathname.includes('/reports') ? true : false}
					icon={
						<ReportIcon
							fill={
								router?.pathname.includes('/reports')
									? theme?.palette?.infuuse.orange200
									: theme?.palette?.infuuse.gray500
							}
						/>
					}
				/>
			) : null}


			<Stack>
				{/* -------------------------------inbox */}
				<IconComponent
					pathname="/inbox"
					unSeen={unSeenInboxMessage >= 1 && Number(unSeenInboxMessage)}
					hover={'Inbox'}
					active={router?.pathname.includes('/inbox') ? true : false}
					icon={
						<InboxIcon
							fill={
								router?.pathname.includes('/inbox')
									? theme?.palette?.infuuse.green400
									: theme?.palette?.infuuse.gray500
							}
						/>
					}
				/>

				{/* -------------------------------call */}
				<IconComponent
					pathname="/call"
					unSeen={unSeenCallMessage >= 1 && Number(unSeenCallMessage)}
					hover={'Call'}
					active={router?.pathname.includes('/call') ? true : false}
					icon={
						<PhoneIcon
							fill={
								router?.pathname.includes('/call') || router?.pathname.includes('/inbox')
									? theme?.palette?.infuuse.red100
									: theme?.palette?.infuuse.gray500
							}
						/>
					}
				/>
				{/* -------------------------------facebook */}
				<IconComponent
					pathname="/facebook"
					unSeen={unSeenFacbookMessage >= 1 && Number(unSeenFacbookMessage)}
					hover={'Facebook'}
					active={router?.pathname.includes('/facebook') ? true : false}
					icon={
						<FacebookIcon
							fill={
								router?.pathname.includes('/facebook') || router?.pathname.includes('/inbox')
									? theme?.palette?.infuuse.blueDark400
									: theme?.palette?.infuuse.gray500
							}
						/>
					}
				/>

				{/* -------------------------------instagram */}
				<IconComponent
					pathname="/instagram"
					unSeen={unSeenInstagramMessage >= 1 && Number(unSeenInstagramMessage)}
					hover={'Instagram'}
					active={router?.pathname.includes('/instagram') ? true : false}
					icon={
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								color:
									router?.pathname.includes('/instagram') || router?.pathname.includes('/inbox')
										? theme?.palette?.infuuse.porple200
										: theme?.palette?.infuuse.gray500,
							}}
						>
							<InstagramIcon sx={{ width: '32px', height: '32px' }} />
						</Box>
					}
				/>

				{/* -------------------------------whatsapp */}
				<IconComponent
					pathname="/whatsapp"
					unSeen={unSeenWhatsappMessage >= 1 && Number(unSeenWhatsappMessage)}
					hover={'Whatsapp'}
					active={router?.pathname.includes('/whatsapp') ? true : false}
					icon={
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								color:
									router?.pathname.includes('/whatsapp') || router?.pathname.includes('/inbox')
										? theme?.palette?.infuuse.green300
										: theme?.palette?.infuuse.gray500,
							}}
						>
							<WhatsAppIcon sx={{ width: '32px', height: '32px' }} />
						</Box>
					}
				/>

				{/* -------------------------------gmail */}
				<IconComponent
					pathname="/gmail"
					unSeen={unSeenGmailMessage >= 1 && Number(unSeenGmailMessage)}
					hover={'Gmail'}
					active={router?.pathname.includes('/gmail') ? true : false}
					icon={
						<GmailIcon
							fill={
								router?.pathname.includes('/gmail') || router?.pathname.includes('/inbox')
									? {
										fill1: '#EA4335',
										fill2: '#FBBC05',
										fill3: '#34A853',
										fill4: '#C5221F',
										fill5: '#4285F4',
									}
									: theme?.palette?.infuuse.gray500
							}
						/>
					}
				/>

				{/* -------------------------------message */}
				<IconComponent
					pathname="/message"
					unSeen={unSeenSMSMessage >= 1 && Number(unSeenSMSMessage)}
					hover={'Messages'}
					active={router?.pathname.includes('/message') ? true : false}
					icon={
						<SmsIcon
							fill={
								router?.pathname.includes('/message') || router?.pathname.includes('/inbox')
									? theme?.palette?.infuuse.porple200
									: theme?.palette?.infuuse.gray500
							}
						/>
					}
				/>

				{/* -------------------------------live chat */}
				<IconComponent
					pathname="/live-chat"
					unSeen={unSeenLiveChatMessage >= 1 && Number(unSeenLiveChatMessage)}
					hover={'Live Chat'}
					active={router?.pathname.includes('/live-chat') ? true : false}
					icon={
						<LiveChatIcon
							fill={
								router?.pathname.includes('/live-chat') || router?.pathname.includes('/inbox')
									? theme?.palette?.infuuse.green300
									: theme?.palette?.infuuse.gray500
							}
						/>
					}
				/>

				<IconComponent
					pathname="/video-call/history"
					hover={'Video Call'}
					active={router?.pathname.includes('/video-call/history') ? true : false}
					icon={
						<VideoCallIcon
							fill={
								router?.pathname.includes('/video-call/history')
									? theme?.palette?.infuuse.red100
									: theme?.palette?.infuuse.gray500
							}
						/>
					}
				/>
			</Stack>
		</>
	);
};

export default UserSidebarIcon;
