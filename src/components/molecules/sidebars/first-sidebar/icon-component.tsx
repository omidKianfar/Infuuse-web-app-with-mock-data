import Link from 'next/link';
import React from 'react';
import { IconBox, IconBoxActive, IconBoxBadge } from './styles';
import { Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { useSnapshot } from 'valtio';
import settingStore from '@/store/setting.store';

interface Props {
	pathname: string;
	icon: any;
	unSeen: number;
	active: boolean;
	hover: string;
}

const IconComponent = ({ pathname, icon, unSeen, hover, active }: Partial<Props>) => {
	const theme = useTheme();

	const { setting } = useSnapshot(settingStore);

	return (
		<Tooltip title={hover} placement="right-start">
			<Link href={{ pathname: pathname }} onClick={() => (settingStore.setting = false)}>
				<Stack justifyContent={'center'} alignItems={'center'} position={'relative'}>
					{/* -------------------------------badge */}
					{unSeen ? (
						<IconBoxBadge>
							<Typography color={theme?.palette?.common?.white}>{unSeen}</Typography>
						</IconBoxBadge>
					) : null}
					{/* -------------------------------active item */}
					{/* {active ? <IconBoxActive /> : null} */}
					<IconBox>{icon}</IconBox>
				</Stack>
			</Link>
		</Tooltip>
	);
};

export default IconComponent;
