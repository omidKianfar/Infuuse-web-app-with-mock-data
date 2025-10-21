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
	// tools
	const router = useRouter();

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	return (
		<CustomSidebarLayout direction={'column'} justifyContent={'start'} alignItems={'center'} position={'relative'}>
			{/* ------------------------------admin sidebar */}
			<Sidebar>
				<Stack mb={4}>
					<Image src={'/images/infuuse-logo.svg'} style={{ width: '120px' }} />
				</Stack>

				{/* -------------------------------sidebars */}
				{CurrentUser?.user?.userType === UserType?.Administrator ? (
					<Stack>
						{router?.pathname.includes('/admin/internal-chat') ? (
							//  -------------------------------internal chat
							<AdminInternalChatSidebar />
						) : router?.pathname.includes('/admin/support') ? (
							//  -------------------------------support
							<AdminSupportSidebar />
						) : null}
					</Stack>
				) : (
					<Stack>
						{/* ------------------------------user sidebar */}

						{router?.pathname.includes('/inbox') ? (
							//  -------------------------------inbox
							<InboxSidebar />
						) : router?.pathname.includes('/call') ? (
							//  -------------------------------call
							<CallSidebar />
						) : router?.pathname.includes('/facebook') ? (
							//  -------------------------------facebook
							<FacebookSidebar />
						) : router?.pathname.includes('/instagram') ? (
							//  -------------------------------instagram
							<InstagramSidebar />
						) : router?.pathname.includes('/whatsapp') ? (
							//  -------------------------------whatsapp
							<WhatsappSidebar />
						) : router?.pathname.includes('/gmail') ? (
							//  -------------------------------gmail
							<GmailSidebar />
						) : router?.pathname.includes('/message') ? (
							//  -------------------------------message
							<MessageSidebar />
						) : router?.pathname.includes('/live-chat') ? (
							//  -------------------------------live chat
							<LiveChatSidebar />
						) : router?.pathname.includes('/internal-chat') ? (
							//  -------------------------------live chat
							<InternalChatSidebar />
						) : router?.pathname.includes('/video-call/history') ? (
							//  -------------------------------live chat
							<VideoCallSidebar />
						) : null}
					</Stack>
				)}
			</Sidebar>
		</CustomSidebarLayout>
	);
};

export default SecondSidebar;
