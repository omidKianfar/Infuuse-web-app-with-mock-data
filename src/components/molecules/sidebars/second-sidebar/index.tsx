import React, { useMemo } from 'react';
import { CustomSidebarLayout, Sidebar } from './styles';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import Image from '@/components/atoms/Image';
import { UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';

import InboxSidebar from './inbox';
import GmailSidebar from './gmail';
import FacebookSidebar from './facebook';
import InstagramSidebar from './instagram';
import WhatsappSidebar from './whatsapp';
import CallSidebar from './call';
import InternalChatSidebar from './internal-chat';
import VideoCallSidebar from './video-call';
import AdminInternalChatSidebar from './admin/internal-chat';
import AdminSupportSidebar from './admin/support';
import MessageSidebar from './message';
import LiveChatSidebar from './live-chat';

interface SidebarRoute {
	pathIncludes: string;
	component: React.FC;
	adminOnly?: boolean;
}

const allRoutes: SidebarRoute[] = [
	{ pathIncludes: '/admin/internal-chat', component: AdminInternalChatSidebar, adminOnly: true },
	{ pathIncludes: '/admin/support', component: AdminSupportSidebar, adminOnly: true },
	{ pathIncludes: '/inbox', component: InboxSidebar },
	{ pathIncludes: '/call', component: CallSidebar },
	{ pathIncludes: '/facebook', component: FacebookSidebar },
	{ pathIncludes: '/instagram', component: InstagramSidebar },
	{ pathIncludes: '/whatsapp', component: WhatsappSidebar },
	{ pathIncludes: '/gmail', component: GmailSidebar },
	{ pathIncludes: '/message', component: MessageSidebar },
	{ pathIncludes: '/live-chat', component: LiveChatSidebar },
	{ pathIncludes: '/internal-chat', component: InternalChatSidebar },
	{ pathIncludes: '/video-call/history', component: VideoCallSidebar },
];

const SecondSidebar = () => {
	const router = useRouter();
	const { data: userData } = useUser_GetCurrentUserQuery();
	const currentUser = userData?.user_getCurrentUser?.result;

	const ActiveSidebarComponent = useMemo(() => {
		return allRoutes.find((route) => {
			if (route.adminOnly && currentUser?.user?.userType !== UserType.Administrator) return false;
			return router.pathname.includes(route.pathIncludes);
		})?.component;
	}, [router.pathname, currentUser]);

	if (!ActiveSidebarComponent) return null;

	return (
		<CustomSidebarLayout direction="column" justifyContent="start" alignItems="center" position="relative">
			<Sidebar>
				<Stack mb={4}>
					<Image src="/images/infuuse-logo.svg" style={{ width: 120 }} />
				</Stack>
				<Stack>
					<ActiveSidebarComponent />
				</Stack>
			</Sidebar>
		</CustomSidebarLayout>
	);
};

export default SecondSidebar;
