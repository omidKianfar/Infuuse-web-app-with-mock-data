import { Stack } from '@mui/material';
import React from 'react';
import ContactInfo from './contact';
import UserItems from './user-items';
import IconItems from './icon-items';
import TabItems from './tab-items';

const SettingSidebar = () => {
	return (
		<Stack width={'100%'} height={'100%'}>
			{/* ------------------------------- section 1 */}
			<ContactInfo />
			{/* ------------------------------- section 2 */}
			<UserItems />
			{/* ------------------------------- section 3*/}
			<IconItems />
			{/* ------------------------------- section 4 */}
			<TabItems />
		</Stack>
	);
};

export default SettingSidebar;
