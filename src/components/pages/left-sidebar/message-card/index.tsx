import FacebookIcon from '@/assets/facebook-icon';
import GmailIcon from '@/assets/gmail-icon';
import LiveChatIcon from '@/assets/live-chat-icon';
import PhoneIcon from '@/assets/phone-icon';
import SmsIcon from '@/assets/sms-icon';
import Avatar from '@/components/atoms/avatar';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import UnSeenMessageCalc from '@/components/atoms/unseen-message-calc';
import {
	AccountStatus,
	Conversation,
	SortEnumType,
	TypeSocialNetwork,
	useConversationMessage_GetByConversationIdQuery,
	useConversationMessage_SetSeenStatusMutation,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { SubscriptionLayoutContext } from '@/providers/socialMessageProvider';
import { getFullImageUrl, responseDestructure } from '@/utils';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';

interface Props {
	conversation: Conversation;
}

const MessageCart = ({ conversation }: Props) => {
	// --------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const ConversationId = router?.query?.conversationId;

	// --------------------------------states
	// unread message
	const [MessagesUnSeenIds, setMessagesUnSeenIds] = useState([]);

	// --------------------------------context
	const { lastMessageSubscription } = useContext(SubscriptionLayoutContext);

	// --------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUserId = User?.user_getCurrentUser?.result?.user?.id;

	// network emails
	// const NetworkEmails = useContactNetwork_GetListByContactIdQuery({
	// 	contactId: Number(conversation?.contact?.id),
	// 	skip: 0,
	// 	take: 1000,
	// 	where: {
	// 		typeContactNetwork: {
	// 			eq: TypeContactNetwork?.Email,
	// 		},
	// 	},
	// });
	// const NetworkEmailsData = NetworkEmails?.data?.contactNetwork_getListByContactId?.result;

	// get last message
	const { data: conversationLastMessage } = useConversationMessage_GetByConversationIdQuery(
		{
			conversationId: Number(conversation?.id),
			skip: 0,
			take: 1,
			order: {
				createdDate: SortEnumType?.Desc,
			},
		},
		{
			enabled: !!conversation?.id,
		}
	);
	const conversationLastMessageData = conversationLastMessage?.conversationMessage_getByConversationId?.result;

	// set seen message
	const { mutate: seenMessages } = useConversationMessage_SetSeenStatusMutation();

	// ------------------------------get unseen message
	const { data: conversationMessagesUnSeen } = useConversationMessage_GetByConversationIdQuery(
		{
			conversationId: Number(conversation?.id),
			skip: 0,
			take: 100000,
			where: {
				isSeen: {
					eq: false,
				},
			},
		},
		{
			enabled: !!conversation?.id,
		}
	);
	const conversationMessageDataUnSeen = conversationMessagesUnSeen?.conversationMessage_getByConversationId?.result;

	// --------------------------------functions
	// update last message data
	useEffect(() => {
		if (lastMessageSubscription) {
			refetchQueries();
		}
	}, [lastMessageSubscription]);

	// change conversationId set seen for all conversation message
	// useEffect(() => {
	// 	if (ConversationId) {
	// 		seenMessages(
	// 			{
	// 				ints: MessagesUnSeenIds,
	// 			},
	// 			{
	// 				onSuccess: async (data) => {
	// 					const { status, result } = responseDestructure(data);
	// 					if (status.code == 1) {
	// 						await setMessagesUnSeenIds([])
	// 						await refetchQueries()
	// 					}
	// 				},
	// 			}
	// 		);
	// 	}
	// }, [ConversationId]);

	// set messages ids to state
	useEffect(() => {
		if (conversationMessageDataUnSeen) {
			conversationMessageDataUnSeen.items?.map((message) => {
				setMessagesUnSeenIds((prevState) => [...prevState, message?.id]);
			});
		}
	}, [conversationMessageDataUnSeen]);

	// send chat page
	const routeChatDetail = async () => {
		if (conversation?.business?.status === AccountStatus?.Active) {
			if (
				Number(conversation?.lastMessage?.conversationMember?.userId) !== Number(CurrentUserId) &&
				MessagesUnSeenIds.length >= 1
			) {
				await seenMessages(
					{
						ints: MessagesUnSeenIds,
					},
					{
						onSuccess: async (data) => {
							const { status, result } = responseDestructure(data);
							if (status.code == 1) {
							} else {
								// enqueueSnackbar(status.description, { variant: 'error' });
							}
						},
					}
				);
				await handelRouter();
			} else {
				handelRouter();
			}
		} else {
			enqueueSnackbar('Your account deactived', { variant: 'error' });
		}
	};

	// route to chat
	const handelRouter = async () => {
		await router.push({
			pathname: router.pathname.includes('inbox')
				? '/inbox/all-channel-chats'
				: router.pathname.includes('call')
					? '/call/chat'
					: router.pathname.includes('facebook')
						? '/gmail/facebook'
						: router.pathname.includes('gmail')
							? '/gmail/chat'
							: router.pathname.includes('instagram')
								? '/instagram/chat'
								: router.pathname.includes('live-chat')
									? '/live-chat/chat'
									: router.pathname.includes('message')
										? '/message/chat'
										: 'whatsapp',
			query: {
				conversationId: conversation?.id,
				businessId: conversation?.business?.id,
				contactId: conversation?.contact?.id,
				memberId: conversationLastMessageData?.items[0]?.conversation?.conversationMembers[0]?.userId,
			},
		});
		await setMessagesUnSeenIds([]);
		await refetchQueries();
	};

	// refetch queries
	const refetchQueries = async () => {
		await queryClient.refetchQueries(['conversation_getList']);
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId']);
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	};

	const conversationMessageDataUnSeenLength = conversationMessageDataUnSeen?.items?.filter(
		(message) => Number(message?.conversationMember?.userId) !== Number(CurrentUserId)
	).length;

	return (
		<Stack
			width={'100%'}
			height={'100%'}
			borderRadius={2}
			p={'8px 16px'}
			mb={3}
			bgcolor={theme?.palette?.infuuse?.gray100}
			sx={{ cursor: 'pointer' }}
			border={
				Number(ConversationId) === Number(conversation?.id)
					? `2px solid ${theme?.palette?.infuuse?.green300}`
					: `1px solid ${theme?.palette?.infuuse?.gray500}`
			}
			onClick={routeChatDetail}
			position={'relative'}
		>
			{Number(conversation?.lastMessage?.conversationMember?.userId) !== Number(CurrentUserId) &&
				Number(ConversationId) !== Number(conversation?.id) && (
					<>
						{conversationMessageDataUnSeenLength >= 1 && (
							<Stack
								justifyContent={'center'}
								alignItems={'end'}
								position={'absolute'}
								top={'-16px'}
								right={'-1px'}
								width={'100%'}
							>
								<Box
									p={'0 16px'}
									bgcolor={theme?.palette?.infuuse?.red300}
									borderRadius={'8px 8px 0 8px'}
								>
									<UnSeenMessageCalc date={conversationMessageDataUnSeen?.items[0]?.createdDate} />
								</Box>
							</Stack>
						)}
					</>
				)}

			<Stack direction={'row'} justifyContent={'start'} alignItems={'start'} width={'100%'}>
				{(conversation?.business?.status === AccountStatus?.Suspended ||
					conversation?.business?.status === AccountStatus?.AwaitingSubscriptionPayment) && (
					<Stack
						position={'absolute'}
						top={0}
						left={0}
						justifyContent={'center'}
						alignItems={'center'}
						zIndex={500}
						width={'100%'}
						height={'100%'}
					>
						<Box p={'8px 16px'} borderRadius={2} bgcolor={theme?.palette?.infuuse?.red300}>
							<Typography fontSize={'16px'} fontWeight={'bold'} color={theme?.palette?.common?.white}>
								Business Deactived
							</Typography>
						</Box>
					</Stack>
				)}

				<Stack mr={1} position={'relative'}>
					<Avatar src={getFullImageUrl(conversation?.contact?.photoUrl)} width={'60px'} height={'60px'} />
					{Number(conversation?.lastMessage?.conversationMember?.userId) !== Number(CurrentUserId) &&
						Number(ConversationId) !== Number(conversation?.id) && (
							<>
								{conversationMessageDataUnSeenLength >= 1 && (
									<Box
										position={'absolute'}
										top={0}
										left={0}
										bgcolor={theme?.palette?.infuuse?.red100}
										borderRadius={'360px'}
										width={'20px'}
										height={'20px'}
										display={'flex'}
										justifyContent={'center'}
										alignItems={'center'}
									>
										<Typography>{conversationMessageDataUnSeenLength}</Typography>
									</Box>
								)}
							</>
						)}
				</Stack>

				<Stack overflow={'hidden'}>
					<Typography mb={1} fontWeight={'bold'}>
						{stringSlicer(
							conversation?.contact?.fullName
								? conversation?.contact?.fullName
								: NetworkEmailsData?.items[0]?.value,
							18
						)}
					</Typography>

					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} mb={2}>
						{/* ---------------------------icons */}
						<Box>
							{conversationLastMessageData?.items[0]?.typeSocialNetwork ===
							TypeSocialNetwork?.LiveChat ? (
								<LiveChatIcon fill={theme?.palette?.infuuse?.green300} />
							) : conversationLastMessageData?.items[0]?.typeSocialNetwork ===
							  TypeSocialNetwork?.Email ? (
								<GmailIcon
									fill={{
										fill1: '#EA4335',
										fill2: '#FBBC05',
										fill3: '#34A853',
										fill4: '#C5221F',
										fill5: '#4285F4',
									}}
								/>
							) : conversationLastMessageData?.items[0]?.typeSocialNetwork ===
							  TypeSocialNetwork?.Facebook ? (
								<FacebookIcon fill={theme?.palette?.infuuse.blueDark400} />
							) : conversationLastMessageData?.items[0]?.typeSocialNetwork ===
							  TypeSocialNetwork?.Instagram ? (
								<InstagramIcon
									sx={{ width: '32px', height: '32px', fill: theme?.palette?.infuuse.porple200 }}
								/>
							) : conversationLastMessageData?.items[0]?.typeSocialNetwork ===
							  TypeSocialNetwork?.PhoneNumber ? (
								<PhoneIcon fill={theme?.palette?.infuuse?.green300} />
							) : conversationLastMessageData?.items[0]?.typeSocialNetwork === TypeSocialNetwork?.Sms ? (
								<SmsIcon fill={theme?.palette?.infuuse.porple200} />
							) : conversationLastMessageData?.items[0]?.typeSocialNetwork === TypeSocialNetwork?.Mms ? (
								<SmsIcon fill={theme?.palette?.infuuse.porple200} />
							) : conversationLastMessageData?.items[0]?.typeSocialNetwork ===
							  TypeSocialNetwork?.WhatsApp ? (
								<WhatsAppIcon
									sx={{ width: '32px', height: '32px', fill: theme?.palette?.infuuse.green300 }}
								/>
							) : null}
						</Box>

						{conversationLastMessageData?.items[0]?.conversationAttachments?.length > 0 ? (
							<Typography
								sx={{
									lineBreak: 'anywhere',
									wordBreak: 'break-word',
									textJustify: 'inter-word',
									wordWrap: 'break-word',
									ml: 1,
									maxHeight: '40px',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								{' '}
								Attachment
							</Typography>
						) : (
							<Typography
								sx={{
									lineBreak: 'anywhere',
									wordBreak: 'break-word',
									textJustify: 'inter-word',
									wordWrap: 'break-word',
									ml: 1,
									maxHeight: '40px',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
								dangerouslySetInnerHTML={{
									__html: conversationLastMessageData?.items[0]?.message,
									// __html: stringSlicer(conversationLastMessageData?.items[0]?.message, 25),
								}}
							></Typography>
						)}
					</Stack>

					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<Box mr={'46px'}>
							<Avatar
								src={getFullImageUrl(conversation?.business?.logo)}
								width={'32px'}
								height={'32px'}
							/>
						</Box>

						<Typography>
							{dayjs(conversationLastMessageData?.items[0]?.createdDate).format('MM/DD/YYYY')}
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default MessageCart;
