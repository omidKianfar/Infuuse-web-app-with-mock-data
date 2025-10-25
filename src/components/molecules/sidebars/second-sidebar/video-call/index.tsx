import VideoCallHistoryMessageBox from '@/components/pages/left-sidebar/video-call/history/video-call-history-message-box.tsx';
import { BusinessAccessDto, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { Stack } from '@mui/material';
import React from 'react';
import { SidebarContainer } from '../styles';

const VideoCallSidebar = () => {
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	return (
		<SidebarContainer>
			<Stack>
				{CurrentUser?.businessAccesses?.map((business) => (
					<Stack key={business?.business?.id}>
						<VideoCallHistoryMessageBox business={business as BusinessAccessDto} />
					</Stack>
				))}
			</Stack>
		</SidebarContainer>
	);
};

export default VideoCallSidebar;

