import FilterList from '@/components/atoms/select-filter/business-filter-list';
import VideoCallHistoryMessageBox from '@/components/pages/left-sidebar/video-call/history/video-call-history-message-box.tsx';
import { useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { Stack, styled } from '@mui/material';
import React, { useState } from 'react';

const VideoCallSidebar = () => {
	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	return (
		<WhatsappSidebarContainer>


			<Stack>
				{/* -------------------------------message box */}

				{CurrentUser?.businessAccesses?.map((business) => <Stack key={business?.business?.id}>
					<VideoCallHistoryMessageBox business={business} />
				</Stack>)}

			</Stack>
		</WhatsappSidebarContainer>
	);
};

export default VideoCallSidebar;

//  -------------------------------style
export const WhatsappSidebarContainer = styled(Stack)({
	width: '100%',
	height: '100%',
	maxHeight: '80vh',
	overflowY: 'auto',
	paddingTop: '16px',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});
