import React from 'react';
import { CustomSidebarLayout, Sidebar } from './styles';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import InboxSidebar from './inbox';
import Image from '@/components/atoms/Image';
import LiveChatSidebar from './live-chat';
import GmailSidebar from './gmail';
import FacebookSidebar from './facebook';
import InstagramSidebar from './instagram';
import WhatsappSidebar from './whatsapp';
import MessageSidebar from './message';
import CallSidebar from './call';
import InternalChatSidebar from './internal-chat';
import { UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import AdminInternalChatSidebar from './admin/internal-chat';
import AdminSupportSidebar from './admin/support';
import CallNow from './call-now';
import VideoCallSidebar from './video-call';

const SecondSidebar = () => {
	const router = useRouter();

	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	return (
		<CustomSidebarLayout direction={'column'} justifyContent={'start'} alignItems={'center'} position={'relative'}>
			<Sidebar>
				<Stack mb={4}>
					<Image src={'/images/infuuse-logo.svg'} style={{ width: '120px' }} />
				</Stack>

				{CurrentUser?.user?.userType === UserType?.Administrator ? (
					<Stack>
						{router?.pathname.includes('/admin/internal-chat') ? (
							<AdminInternalChatSidebar />
						) : router?.pathname.includes('/admin/support') ? (
							<AdminSupportSidebar />
						) : null}
					</Stack>
				) : (
					<Stack>

						{router?.pathname.includes('/inbox') ? (
							<InboxSidebar />
						) : router?.pathname.includes('/call') ? (
							<CallSidebar />
						) : router?.pathname.includes('/facebook') ? (
							<FacebookSidebar />
						) : router?.pathname.includes('/instagram') ? (
							<InstagramSidebar />
						) : router?.pathname.includes('/whatsapp') ? (
							<WhatsappSidebar />
						) : router?.pathname.includes('/gmail') ? (
							<GmailSidebar />
						) : router?.pathname.includes('/message') ? (
							<MessageSidebar />
						) : router?.pathname.includes('/live-chat') ? (
							<LiveChatSidebar />
						) : router?.pathname.includes('/internal-chat') ? (
							<InternalChatSidebar />
						) : router?.pathname.includes('/video-call/history') ? (
							<VideoCallSidebar />
						) : null}
					</Stack>
				)}
			</Sidebar>
		</CustomSidebarLayout>
	);
};

export default SecondSidebar;
