import SupportIcon from '@/assets/support-icon';
import Avatar from '@/components/atoms/avatar';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import UnSeenMessageCalc from '@/components/atoms/unseen-message-calc';
import { AccountStatus, Conversation, SortEnumType, useConversationMessage_GetByConversationIdQuery, useConversationMessage_SetSeenStatusMutation, useSupportChat_GetListQuery, useUser_GetCurrentUserQuery } from '@/graphql/generated';
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

const AdminSupportMessageBox = ({ conversation }: Props) => {

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
	// 					const { status, result } = responseDestructure(data);
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
	const routeChatDetail = async () => {
		if (Number(conversation?.lastMessage?.conversationMember?.userId) !== Number(CurrentUserId) && MessagesUnSeenIds.length >= 1) {
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

	};

	// route to chat
	const handelRouter = async () => {
		await router.push({
			pathname: '/admin/support/chat',
			query: {
				conversationId: conversation?.id,
				businessId: conversation?.business?.id,
				contactId: conversation?.contact?.id,
				memberId: conversationLastMessageData?.items[0]?.conversation?.conversationMembers[0]?.userId,
			},
		});
		await setMessagesUnSeenIds([])
		await refetchQueries()

	}

	// refetch queries
	const refetchQueries = async () => {
		await queryClient.refetchQueries(['supportChat_getList'])
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	}

	const conversationMessageDataUnSeenLength = conversationMessageDataUnSeen?.items?.filter((message) =>
		Number(message?.conversationMember?.userId) !== Number(CurrentUserId)
	).length

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
			{Number(conversation?.lastMessage?.conversationMember?.userId) !== Number(CurrentUserId) && Number(ConversationId) !== Number(conversation?.id) && <>

				{conversationMessageDataUnSeenLength >= 1 &&
					<Stack justifyContent={'center'} alignItems={'end'} position={'absolute'} top={'-16px'} right={'-1px'} width={'100%'}>
						<Box p={'0 16px'} bgcolor={theme?.palette?.infuuse?.red300} borderRadius={'8px 8px 0 8px'}>
							<UnSeenMessageCalc date={conversationMessageDataUnSeen?.items[0]?.createdDate} />
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
					<Avatar src={getFullImageUrl(conversation?.conversationMembers[0]?.user?.photoUrl)} width={'60px'} height={'60px'} />
					{Number(conversation?.lastMessage?.conversationMember?.userId) !== Number(CurrentUserId) && Number(ConversationId) !== Number(conversation?.id) && <>
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
					</>}
				</Stack>

				<Stack overflow={'hidden'} width={'100%'}>
					<Typography mb={1} fontWeight={'bold'}>
						{stringSlicer(
							conversation?.conversationMembers[0]?.user?.fullName,
							18
						)}
					</Typography>

					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} mb={2} >
						<Box>
							<SupportIcon fill={theme?.palette?.infuuse?.orange100} />
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

					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} >
						<Typography>{dayjs(conversationLastMessageData?.items[0]?.createdDate).format('MM/DD/YYYY')}</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AdminSupportMessageBox;
