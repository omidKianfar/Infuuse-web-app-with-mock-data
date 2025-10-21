import React, { useContext, useEffect } from 'react';
import IconComponent from '../icon-component';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import BusinessIcon from '@/assets/business-icon';
import SupportIcon from '@/assets/support-icon';
import FeedbackIcon from '@/assets/feedback-icon';
import SubscriptionIcon from '@/assets/subscription-icon';
import { UserDto, useSupportChat_GetListQuery } from '@/graphql/generated';
import { queryClient } from 'pages/_app';
import { SubscriptionLayoutContext } from '@/providers/socialMessageProvider';

interface Props {
	CurrentUser: UserDto
}

const AdminSidebarIcon = ({ CurrentUser }: Props) => {
	// -------------------------------tools
	const router = useRouter();
	const theme = useTheme();

	// --------------------------------context
	const { lastMessageSubscription } = useContext(SubscriptionLayoutContext);

	// --------------------------------query
	const { data: supportConversationListList } = useSupportChat_GetListQuery({
		take: 10000,
		skip: 0,
		where: {
			and: [
				{
					lastMessage: {
						conversationMember: {
							userId: {
								neq: Number(CurrentUser?.user?.id)
							}
						}
					}
				}
			]
		}
	})
	const supportConversationListListData = supportConversationListList?.supportChat_getList?.result

	// --------------------------------functions
	// update last message data
	useEffect(() => {
		if (lastMessageSubscription) {
			refetchQueries()
		}
	}, [lastMessageSubscription])
	// unseen call 


	// refetch queries
	const refetchQueries = async () => {
		await queryClient.invalidateQueries(['supportChat_getList'])
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	}

	const unSeenSupportMessage = supportConversationListListData?.items?.map((conversation) => conversation?.numberOfUnreadMessages).reduce((a, b) => a + b, 0)

	return (
		<>
			{/* -------------------------------reports */}
			<IconComponent
				pathname="/admin/customer-list"
				// unSeen={1}
				hover={'Customer List'}
				active={router?.pathname.includes('/admin/customer-list') ? true : false}
				icon={
					<BusinessIcon
						width="32"
						height="32"
						fill={
							router?.pathname.includes('/admin/customer-list')
								? theme?.palette?.infuuse.blue100
								: theme?.palette?.infuuse.gray500
						}
					/>
				}
			/>

			{/* <IconComponent
				pathname="/admin/internal-chat"
				// unSeen={1}
				hover={'internal chat'}
				active={router?.pathname.includes('/admin/internal-chat') ? true : false}
				icon={
					<InternalChatIcon
						fill={
							router?.pathname.includes('/admin/internal-chat')
								? theme?.palette?.infuuse.porple200
								: theme?.palette?.infuuse.gray500
						}
					/>
				}
			/> */}

			<IconComponent
				pathname="/admin/support"
				unSeen={unSeenSupportMessage >= 1 && Number(unSeenSupportMessage)}
				hover={'Support'}
				active={router?.pathname.includes('/admin/support') ? true : false}
				icon={
					<SupportIcon
						fill={
							router?.pathname.includes('/admin/support')
								? theme?.palette?.infuuse.orange100
								: theme?.palette?.infuuse.gray500
						}
					/>
				}
			/>

			<IconComponent
				pathname="/admin/feedback"
				// unSeen={1}
				hover={'Feedbacks'}
				active={router?.pathname.includes('/admin/feedback') ? true : false}
				icon={
					<FeedbackIcon
						width="32"
						height="32"
						fill={
							router?.pathname.includes('/admin/feedback')
								? theme?.palette?.infuuse.porple200
								: theme?.palette?.infuuse.gray500
						}
					/>
				}
			/>

			<IconComponent
				pathname="/admin/subscription"
				// unSeen={}
				hover={'Subscriptions'}
				active={router?.pathname.includes('/admin/subscription') ? true : false}
				icon={
					<SubscriptionIcon
						width="32"
						height="32"
						fill={
							router?.pathname.includes('/admin/subscription')
								? theme?.palette?.infuuse.orange100
								: theme?.palette?.infuuse.gray500
						}
					/>
				}
			/>
		</>
	);
};

export default AdminSidebarIcon;
