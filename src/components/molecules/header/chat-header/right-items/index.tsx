import { Stack, Tooltip, useTheme } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import { DrawerLayout, IconContainer } from '../styles';
import NoteIcon from '@/assets/note-icon';
import DealIcon from '@/assets/deal-icon';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import { useSnapshot } from 'valtio';
import chatStore from '@/store/chat.store';
import { Props } from '../types';
import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';

const SidebarButtonRightArrowIcon = lazy(() => import('@/assets/sidebar-button-right-arrow-icon'));
const SidebarButtonLeftArrowIcon = lazy(() => import('@/assets/sidebar-button-left-arrow-icon'));

const HeaderRightSection = ({ handelModal }: Partial<Props>) => {
	const theme = useTheme();

	const { chatSidebar, dealSidebar } = useSnapshot(chatStore);

	const chatDrowerHandeler = () => {
		chatStore.chatSidebar = !chatSidebar;
		chatStore.dealSidebar = false;
	};

	const handeldealDrower = () => {
		chatStore.chatSidebar = true;
		chatStore.dealSidebar = !dealSidebar;
		chatStore.dealId = null;
	};
	return (
		<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
			<Tooltip title="Send video call link">
				<IconContainer onClick={() => handelModal?.(2)}>
					<VideocamRoundedIcon sx={{ fontSize: '40px', fill: theme?.palette?.infuuse?.blueLight400 }} />
				</IconContainer>
			</Tooltip>

			<Tooltip title="Add Note">
				<IconContainer onClick={() => handelModal?.(1)}>
					<NoteIcon />
				</IconContainer>
			</Tooltip>

			<Tooltip title="Add Deal">
				<IconContainer onClick={handeldealDrower}>
					<DealIcon />
				</IconContainer>
			</Tooltip>

			{/* <IconContainer>
						<CheckedIcon fill={theme?.palette?.infuuse?.green200} />
					</IconContainer> */}

			<DrawerLayout onClick={chatDrowerHandeler}>
				<Suspense fallback={<LoadingProgress />}>
					{chatSidebar || dealSidebar ? (
						<SidebarButtonRightArrowIcon fill={theme?.palette?.infuuse?.blue200} />
					) : (
						<SidebarButtonLeftArrowIcon />
					)}
				</Suspense>
			</DrawerLayout>
		</Stack>
	);
};

export default HeaderRightSection;
