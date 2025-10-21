import React, { PropsWithChildren } from 'react';
import { Main, CustomLayout, CustomBaseLayoutChildren } from './styles';
import { Stack } from '@mui/material';
import Image from '@/components/atoms/Image';
import FirstSidebar from '@/components/molecules/sidebars/first-sidebar';
import MainHeader from '@/components/molecules/header/main-header';
import { useSnapshot } from 'valtio';
import settingStore from '@/store/setting.store';
import SidebarSecond from './sidebar';

const BaseLayout = ({ children }: PropsWithChildren) => {
	// -------------------------------state management
	const { setting } = useSnapshot(settingStore);

	return (
		<CustomLayout direction={'row'} justifyContent={'start'} alignItems={'start'}>
			{/* -------------------------------left sidebar */}
			<FirstSidebar />

			{/* user sidebar */}
			<SidebarSecond baselayout={true} />

			{/* -------------------------------main */}
			<Main>
				<Stack px={'16px'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
					{!setting && (
						<Stack>
							<Image src={'/images/infuuse-logo.svg'} style={{ width: '120px' }} />
						</Stack>
					)}

					{/* -------------------------------main header */}
					<MainHeader />
				</Stack>
				{/* -------------------------------main children */}
				<CustomBaseLayoutChildren setting={setting}>{children}</CustomBaseLayoutChildren>
			</Main>
		</CustomLayout>
	);
};

export default BaseLayout;
