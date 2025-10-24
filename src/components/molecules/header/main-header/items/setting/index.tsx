import SettingIcon from '@/assets/setting-icon';
import settingStore from '@/store/setting.store';
import { Box, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { useSnapshot } from 'valtio';

const SettingItem = () => {
	const theme = useTheme();

	const { setting } = useSnapshot(settingStore);

	return (
		<>
			<Tooltip title="Setting">
				<Box onClick={() => (settingStore.setting = !setting)} sx={{ cursor: 'pointer', ml: 2 }}>
					<SettingIcon fill={setting ? theme?.palette?.infuuse.green400 : theme?.palette?.infuuse.gray500} />
				</Box>
			</Tooltip>
		</>
	);
};

export default SettingItem;
