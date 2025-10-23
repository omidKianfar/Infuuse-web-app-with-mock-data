'use client';
import { Stack } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { CustomLayout, CustomMainLayoutChildren, Main } from './styles';
import FirstSidebar from '@/components/molecules/sidebars/first-sidebar';
import SettingSidebar from '@/components/molecules/sidebars/second-sidebar/setting';
import SecondSidebar from '@/components/molecules/sidebars/second-sidebar';
import MainHeader from '@/components/molecules/header/main-header';
import { useSnapshot } from 'valtio';
import settingStore from '@/store/setting.store';
import SidebarSecond from './sidebar';

const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<CustomLayout direction={'row'} justifyContent={'start'} alignItems={'start'}>

			<FirstSidebar />

			<SidebarSecond />

			<Main>
				<Stack px={'16px'}>
					<MainHeader />
				</Stack>
				
				<CustomMainLayoutChildren>{children}</CustomMainLayoutChildren>
			</Main>
		</CustomLayout>
	);
};

export default MainLayout;
