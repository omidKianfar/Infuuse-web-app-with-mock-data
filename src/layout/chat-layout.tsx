import { Stack } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { ChatPage, CustomChatLayoutChildren, CustomLayout, Main } from './styles';
import FirstSidebar from '@/components/molecules/sidebars/first-sidebar';
import ChatHeader from '@/components/molecules/header/chat-header';
import ChatSidebar from '@/components/molecules/sidebars/chat-sidebar';
import MainHeader from '@/components/molecules/header/main-header';
import { useSnapshot } from 'valtio';
import chatStore from '@/store/chat.store';
import SidebarSecond from './sidebar';

const ChatLayout = ({ children }: PropsWithChildren) => {
	// -------------------------------state management
	const { chatSidebar } = useSnapshot(chatStore);

	return (
		<CustomLayout direction={'row'} justifyContent={'start'} alignItems={'start'}>
			{/* -------------------------------left sidebar */}
			<FirstSidebar />

			{/* -------------------------------user sidebar */}
			<SidebarSecond />

			{/* -------------------------------main */}
			<Main>
				{/* -------------------------------main header */}
				<Stack px={'16px'}>
					<MainHeader />
				</Stack>

				{/* -------------------------------main children */}
				<CustomChatLayoutChildren>
					{/* -------------------------------chat */}
					<ChatPage>
						<Stack
							width={'100%'}
							height={'100%'}
							direction={'row'}
							justifyContent={'start'}
							alignItems={'start'}
						>
							<Stack width={'100%'} height={'100%'}>
								{/* -------------------------------chat header */}
								<ChatHeader />

								{/* -------------------------------chat children */}
								<Stack width={'100%'} height={'100%'}>
									{children}
								</Stack>
							</Stack>

							{/* -------------------------------chat sidebar */}
							{chatSidebar && <ChatSidebar />}
						</Stack>
					</ChatPage>
				</CustomChatLayoutChildren>
			</Main>
		</CustomLayout>
	);
};

export default ChatLayout;
