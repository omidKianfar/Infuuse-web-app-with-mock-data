import { Box, Stack, styled, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DilarIcon from '@/assets/dilar-icon';
import Dilar from './dilar';
import { useSnapshot } from 'valtio';
import userSubscriptionStore from '@/store/user-subscription.store';
import { ConversationType, SortEnumType, TypeSocialNetwork, useConversation_GetListQuery } from '@/graphql/generated';
import { queryKeyManager } from '@/utils/queryKeys';
import MessageCart from '@/components/pages/left-sidebar/message-card';

const CallSidebar = () => {
	const theme = useTheme();
	const [dilar, setDilar] = useState<boolean>(false);

	// -------------------------------query
	const { conversationIds } = useSnapshot(userSubscriptionStore);

	const variables = {
		skip: 0,
		take: 10000,
		where: {
			and: [
				{
					type: {
						eq: ConversationType?.SocialNetworkChat
					}
				},
				{
					conversationMessages: {
						some: {
							typeSocialNetwork: {
								eq: TypeSocialNetwork?.TwilioVoiceCall,
							},
						},
					},
				}]
		},
		order: {
			lastMessage: {
				createdDate: SortEnumType?.Desc
			}
		},
	};

	// get agency conversations
	const { data: Conversation } = useConversation_GetListQuery(variables);

	useEffect(() => {
		queryKeyManager.addKey('conversationList', ['conversation_getList', variables]);
	}, []);

	const ConversationData = Conversation?.conversation_getList?.result;

	useEffect(() => {
		const ConversationIds = [];
		if (ConversationData) {
			ConversationData?.items?.map((conversation) => {
				ConversationIds.push(conversation?.id);
			});
			userSubscriptionStore.conversationIds = ConversationIds;
		}
	}, [ConversationData]);

	return (
		<CallSidebarContainer>
			<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} mb={1} p={'4px'}>
				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					bgcolor={theme?.palette?.infuuse?.gray100}
					width={'32px'}
					height={'32px'}
					borderRadius={'360px'}
					boxShadow={4}
					sx={{ cursor: 'pointer' }}
					onClick={() => setDilar(!dilar)}
				>
					<DilarIcon width="18px" height="18px" />
				</Box>
			</Stack>
			<Stack>
				{dilar ? (
					<Dilar />
				) : (
					<Stack
						sx={{
							maxHeight: '75vh',
							overflowY: 'auto',
							paddingTop: '24px',
							'&::-webkit-scrollbar': {
								display: 'none',
							},
							scrollbarWidth: 'none',
							scrollbarColor: 'transparent transparent',
						}}
					>
						{ConversationData?.items?.map((conversation) => (
							<Stack key={conversation?.id}>
								<MessageCart conversation={conversation} />
							</Stack>
						))}
					</Stack>
				)}
			</Stack>
		</CallSidebarContainer>
	);
};

export default CallSidebar;

export const CallSidebarContainer = styled(Stack)({
	width: '100%',
	height: '100%',
	maxHeight: '80vh',
	overflowY: 'auto',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});
