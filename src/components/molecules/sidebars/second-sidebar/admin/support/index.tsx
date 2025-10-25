import AdminSupportMessageBox from '@/components/pages/left-sidebar/admin/support/support-message-box.tsx';
import { useSupportMessage } from '@/hooks/cache-conversations/use-support-conversation-message-cache';
import { Stack } from '@mui/material';
import React from 'react';
import { adminSupportChatVariables } from '../../sidebar-variables';
import { SidebarContainer } from '../../styles';

const AdminSupportSidebar = () => {
	const { SupportChatData } = useSupportMessage(adminSupportChatVariables);

	return (
		<SidebarContainer>
			{SupportChatData?.map((conversation) => (
				<Stack key={conversation?.id}>
					<AdminSupportMessageBox conversation={conversation} />
				</Stack>
			))}
		</SidebarContainer>
	);
};

export default AdminSupportSidebar;

