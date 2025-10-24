'use client';
import { Stack } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { CustomLayout, CustomMainLayoutChildren, Main } from './styles';
import FirstSidebar from '@/components/molecules/sidebars/first-sidebar';
import MainHeader from '@/components/molecules/header/main-header';
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
