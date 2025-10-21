import InternalChatIcon from '@/assets/internal-chat-icon';
import Avatar from '@/components/atoms/avatar';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import UnSeenMessageCalc from '@/components/atoms/unseen-message-calc';
import { AccountStatus, Conversation, SortEnumType, TypeContactNetwork, useContactNetwork_GetListByContactIdQuery, useConversationMessage_GetByConversationIdQuery, useConversationMessage_SetSeenStatusMutation } from '@/graphql/generated';
import { SubscriptionLayoutContext } from '@/providers/socialMessageProvider';
import { getFullImageUrl, responseDestructure } from '@/utils';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import React, { useContext, useEffect, useState } from 'react';


interface Props {
	conversation: Conversation;
}


const AdminInternalChatMessageBox = ({ conversation }: Props) => {

	// --------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const ConversationId = router?.query?.conversationId;

	// --------------------------------states
	// unread message
	const [MessagesUnSeenIds, setMessagesUnSeenIds] = useState([]);

	// --------------------------------context
	const { ConversationLastMessageData, lastMessageSubscription } = useContext(SubscriptionLayoutContext);

	// --------------------------------query
	// network emails
	const NetworkEmails = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(conversation?.contact?.id),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.Email,
			},
		},
	});

	const NetworkEmailsData = NetworkEmails?.data?.contactNetwork_getListByContactId?.result;

	// get last message
	const { data: conversationLastMessage } = useConversationMessage_GetByConversationIdQuery({
		conversationId: Number(conversation?.id),
		skip: 0,
		take: 1,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	}, {
		enabled: !!conversation?.id
	});

	const conversationLastMessageData = conversationLastMessage?.conversationMessage_getByConversationId?.result;

	// ------------------------------update last message data
	useEffect(() => {
		if (lastMessageSubscription) {
			queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
			queryClient.invalidateQueries(['conversation_getList'])
		}
	}, [lastMessageSubscription])

	// ------------------------------get unseen message
	const { data: conversationMessagesUnSeen } = useConversationMessage_GetByConversationIdQuery({
		conversationId: Number(conversation?.id),
		skip: 0,
		take: 100000,
		where: {
			isSeen: {
				eq: false
			}
		}
	}, {
		enabled: !!conversation?.id
	});

	const conversationMessageDataUnSeen = conversationMessagesUnSeen?.conversationMessage_getByConversationId?.result;

	// ------------------------------set messages ids to state
	useEffect(() => {
		if (conversationMessageDataUnSeen) {
			conversationMessageDataUnSeen.items?.map((message) => {
				setMessagesUnSeenIds((prevState) => ([...prevState, message?.id]))
			})
		}
	}, [conversationMessageDataUnSeen])


	const { mutate: seenMessages } = useConversationMessage_SetSeenStatusMutation()

	// --------------------------------send chat page
	const routeChatDetail = () => {
		if (MessagesUnSeenIds.length >= 1) {
			seenMessages(
				{
					ints: MessagesUnSeenIds,

				},
				{
					onSuccess: async (data) => {
						const { status, result } = responseDestructure(data);
						if (status.code == 1) {
							handelRouter()
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });

						}
					},
				}
			);
		} else {
			handelRouter()
		}

	};

	// change conversationId set seen for all conversation message
	useEffect(() => {
		if (ConversationId) {
			seenMessages(
				{
					ints: [MessagesUnSeenIds],

				},
				{
					onSuccess: async (data) => {
						const { status, result } = responseDestructure(data);
						if (status.code == 1) {
							await queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
							await queryClient.refetchQueries(['conversation_getList'])
							setMessagesUnSeenIds([])

						}
					}
				},


			);
		}
	}, [ConversationId])

	// route to chat
	const handelRouter = async () => {
		await router.push({
			pathname: '/internal-chat/chat',
			query: {
				conversationId: conversation?.id,
				businessId: conversation?.business?.id,
				contactId: conversation?.contact?.id,
				memberId: conversationLastMessageData?.items[0]?.conversation?.conversationMembers[0]?.userId,
			},
		});
		await setMessagesUnSeenIds([])
		await queryClient.refetchQueries(['conversation_getList'])
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
	}

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
			{Number(ConversationId) !== Number(conversation?.id) && <>

				{conversation?.numberOfUnreadMessages >= 1 &&
					<Stack justifyContent={'center'} alignItems={'end'} position={'absolute'} top={'-16px'} right={'-1px'} width={'100%'}>
						<Box p={'0 16px'} bgcolor={theme?.palette?.infuuse?.red300} borderRadius={'8px 8px 0 8px'}>
							<UnSeenMessageCalc date={conversation?.createdDate} />
						</Box>
					</Stack>}
			</>}

			<Stack direction={'row'} justifyContent={'start'} alignItems={'start'}>
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
					{Number(ConversationId) !== Number(conversation?.id) && <>
						{conversation?.numberOfUnreadMessages >= 1 && (
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
								<Typography>{conversation?.numberOfUnreadMessages}</Typography>
							</Box>
						)}
					</>}
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
						<Box>
							<InternalChatIcon width="32px" height="32px" fill={theme?.palette?.infuuse?.porple200} />
						</Box>

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
							}}
						></Typography>
					</Stack>

					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<Box mr={'46px'}>
							<Avatar
								src={getFullImageUrl(conversation?.business?.logo)}
								width={'32px'}
								height={'32px'}
							/>
						</Box>

						<Typography>{dayjs(conversation?.createdDate).format('MM/DD/YYYY')}</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AdminInternalChatMessageBox;
