import { Notification, SortEnumType, useConversation_GetListQuery, useConversationMessage_GetByConversationIdQuery } from '@/graphql/generated';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@/components/atoms/avatar';
import { useRouter } from 'next/router';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import { getFullImageUrl } from '@/utils';
import UserIcon from '@/assets/user-icon';

interface Props {
	NotificationConvert: any;
	notificationRead: (id: number) => void;
	notification: Notification;
}

const AssignMemberNotification = ({ NotificationConvert, notificationRead, notification }: Partial<Props>) => {
	const theme = useTheme();
	const router = useRouter();


	const { data: Conversation } = useConversation_GetListQuery({
		skip: 0,
		take: 1,
		where: {
			id: {
				eq: Number(NotificationConvert?.Conversation?.Id)
			}
		}
	})
	const ConversationData = Conversation?.conversation_getList?.result

	const { data: conversationLastMessage } = useConversationMessage_GetByConversationIdQuery(
		{
			conversationId: Number(NotificationConvert?.Conversation?.Id),
			skip: 0,
			take: 1,
			order: {
				createdDate: SortEnumType?.Desc,
			},
		}, {
		enabled: !!NotificationConvert?.Conversation?.Id
	}
	);
	const conversationLastMessageData = conversationLastMessage?.conversationMessage_getByConversationId?.result;

	const selectConversation = async () => {
		await notificationRead?.(notification?.id as number);

		router?.push({
			pathname: '/inbox/assign-chats',
			query: {
				conversationId: ConversationData?.items?.[0]?.id ?? 0,
				businessId: ConversationData?.items?.[0]?.business?.id ?? 0,
				contactId: ConversationData?.items?.[0]?.contact?.id ?? 0,
				memberId:
					conversationLastMessageData?.items?.[0]?.conversation?.conversationMembers?.[0]?.userId ?? 0,
			},
		});
	};

	return (
		<Box border={`2px solid ${theme?.palette?.infuuse?.gray400}`} p={'8px'} borderRadius={2} mb={1} width={'100%'}>
			<>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					flexWrap={'wrap'}
				>
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} flexWrap={'wrap'}>
						<Box mr={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
							<UserIcon height="28px" width="28px" fill={theme?.palette?.infuuse?.green300} />
						</Box>

						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
							<Typography
								sx={{
									color: theme?.palette?.infuuse?.blueDark500,
									fontWeight: 'bold',
								}}
							>
								Assign Conversation
							</Typography>
						</Stack>
					</Stack>

					<Box
						onClick={() => notificationRead?.(notification?.id as number)}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						pt={'6px'}
						sx={{ cursor: 'pointer' }}
					>
						<CloseIcon />
					</Box>
				</Stack>

				<Divider sx={{ color: theme?.palette?.infuuse?.gray100, mb: 1, mt: 1 }} />

				<Stack
					onClick={selectConversation}
					sx={{ cursor: 'pointer' }}
				>
					<Stack mb={1}>
						<Stack
							direction={'row'}
							justifyContent={'start'}
							alignItems={'center'}
							flexWrap={'wrap'}
							mb={1}
						>
							<Avatar src={getFullImageUrl(NotificationConvert?.Creator?.PhotoUrl)} />
							<Typography
								color={theme?.palette?.infuuse?.blueDark500}
								fontWeight={'bold'}
								fontSize={'14px'}
								ml={1}
							>
								{NotificationConvert?.Creator?.FullName}
							</Typography>
						</Stack>
					</Stack>

					<Stack mb={1}>
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
							<span
								style={{
									marginRight: '8px',
									color: theme?.palette?.infuuse?.blueDark500,
									fontWeight: 'bold',
								}}
							>
								Business:
							</span>

							<Typography color={theme?.palette?.infuuse?.blue500} mr={1} fontWeight={'bold'}>
								{stringSlicer(ConversationData?.items?.[0]?.business?.name, 50)}
							</Typography>
						</Stack>
					</Stack>


				</Stack>
			</>
		</Box>
	);
};

export default AssignMemberNotification;
