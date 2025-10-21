import EditIcon from '@/assets/edit-icon';
import InternalChatIcon from '@/assets/internal-chat-icon';
import ModalContainer from '@/components/atoms/Modal';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import UnSeenMessageCalc from '@/components/atoms/unseen-message-calc';
import {
	AccountStatus,
	Conversation,
	SortEnumType,
	TypeContactNetwork,
	useContactNetwork_GetListByContactIdQuery,
	useConversationMessage_GetByConversationIdQuery,
	useConversationMessage_SetSeenStatusMutation,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { SubscriptionLayoutContext } from '@/providers/socialMessageProvider';
import { responseDestructure } from '@/utils';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';
import EditGroup from './modal/edit-group';

interface Props {
	conversation: Conversation;
}

const InternalChatMessageBox = ({ conversation }: Props) => {

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
	const CurrentUserId = User?.user_getCurrentUser?.result?.user?.id

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

	// get unseen message
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

	// set seen message
	const { mutate: seenMessages } = useConversationMessage_SetSeenStatusMutation()

	// --------------------------------functions
	// update last message data
	useEffect(() => {
		if (lastMessageSubscription) {
			refetchQueries()
		}
	}, [lastMessageSubscription])

	// change conversationId set seen for all conversation message
	// useEffect(() => {
	// 	if (ConversationId) {
	// 		seenMessages(
	// 			{
	// 				ints: MessagesUnSeenIds,
	// 			},
	// 			{
	// 				onSuccess: async (data) => {
	// 					const { status } = responseDestructure(data);
	// 					if (status.code == 1) {
	// 						await setMessagesUnSeenIds([])
	// 						await refetchQueries()
	// 					}
	// 				}
	// 			},
	// 		);
	// 	}
	// }, [ConversationId])

	// set messages ids to state
	useEffect(() => {
		if (conversationMessageDataUnSeen) {
			conversationMessageDataUnSeen.items?.map((message) => {
				setMessagesUnSeenIds((prevState) => ([...prevState, message?.id]))
			})
		}
	}, [conversationMessageDataUnSeen])

	// send chat page
	const routeChatDetail = () => {
		if (Number(conversation?.lastMessage?.conversationMember?.userId) !== Number(CurrentUserId) && MessagesUnSeenIds.length >= 1) {
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

	// route to chat
	const handelRouter = async () => {
		await router.push({
			pathname: '/internal-chat/chat',
			query: {
				conversationId: conversation?.id,
				memberId: conversationLastMessageData?.items[0]?.conversation?.conversationMembers[0]?.userId,
			},
		});
		await setMessagesUnSeenIds([])
		await refetchQueries()
	}

	// refetch queries
	const refetchQueries = async () => {
		await queryClient.refetchQueries(['conversation_getList'])
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	}

	// ------------------------------- modal
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	return (
		<Stack
			width={'100%'}
			height={'100%'}
			borderRadius={2}
			p={'8px'}
			mb={3}
			bgcolor={theme?.palette?.infuuse?.gray100}

			border={
				Number(ConversationId) === Number(conversation?.id)
					? `2px solid ${theme?.palette?.infuuse?.green300}`
					: `1px solid ${theme?.palette?.infuuse?.gray500}`
			}

			position={'relative'}
		>
			{Number(ConversationId) !== Number(conversation?.id) && <>
				{Number(conversation?.lastMessage?.conversationMember?.userId) !== Number(CurrentUserId) && conversation?.numberOfUnreadMessages >= 1 &&
					<Stack justifyContent={'center'} alignItems={'end'} position={'absolute'} top={'-16px'} right={'-1px'} width={'100%'}>
						<Box p={'0 16px'} bgcolor={theme?.palette?.infuuse?.red300} borderRadius={'8px 8px 0 8px'}>
							<UnSeenMessageCalc date={conversationMessageDataUnSeen?.items[0]?.createdDate} />
						</Box>
					</Stack>}
			</>}

			<Stack onClick={routeChatDetail} sx={{ cursor: 'pointer' }}>
				<Stack position={'relative'}>
					<Box bgcolor={theme?.palette?.infuuse?.blue500} borderRadius={1} p={'4px 8px'}>
						<Typography color={theme?.palette?.common?.white} fontWeight={'bold'} >
							{stringSlicer(conversation?.title, 30)}
						</Typography>
					</Box>

					{Number(conversation?.lastMessage?.conversationMember?.userId) !== Number(CurrentUserId) && Number(ConversationId) !== Number(conversation?.id) && <>
						{conversation?.numberOfUnreadMessages >= 1 && (
							<Box
								position={'absolute'}
								top={'-16px'}
								left={'-8px'}
								bgcolor={theme?.palette?.infuuse?.red100}
								borderRadius={'360px'}
								width={'20px'}
								height={'20px'}
								display={'flex'}
								justifyContent={'center'}
								alignItems={'center'}
							>
								<Typography>{conversation?.numberOfUnreadMessages} </Typography>
							</Box>
						)}
					</>}
				</Stack>
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

					<Stack overflow={'hidden'} width={'100%'} >
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

							{conversationLastMessageData?.items[0]?.conversationAttachments?.length > 0
								? <Typography
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

								> Attachment
								</Typography>
								: <Typography
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
								></Typography>}
						</Stack>


					</Stack>

				</Stack>
			</Stack>

			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<Box display={'flex'} justifyContent={'center'} alignItems={'center'} onClick={handelModal} sx={{ cursor: 'pointer' }} width={'15%'}>
					<EditIcon fill={theme?.palette?.infuuse?.blue100} />
				</Box>

				<Box display={'flex'} justifyContent={'end'} alignItems={'center'} onClick={routeChatDetail} sx={{ cursor: 'pointer' }} width={'85%'}>
					<Typography>{dayjs(conversationLastMessageData?.items[0]?.createdDate).format('MM/DD/YYYY')}</Typography>
				</Box>
			</Stack>

			<ModalContainer open={open} handleClose={handleClose}>
				<EditGroup handleClose={handleClose} conversation={conversation} />
			</ModalContainer>
		</Stack >
	);
};

export default InternalChatMessageBox;
