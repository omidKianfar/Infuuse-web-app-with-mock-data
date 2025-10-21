import SecondSidebar from '@/components/molecules/sidebars/second-sidebar';
import CallNow from '@/components/molecules/sidebars/second-sidebar/call-now';
import SettingSidebar from '@/components/molecules/sidebars/second-sidebar/setting';
import settingStore from '@/store/setting.store';
import { Stack } from '@mui/material';
import { useSnapshot } from 'valtio';

interface Props {
	baselayout?: boolean;
}

const SidebarSecond = ({ baselayout }: Props) => {
	
	// -------------------------------state managment
	const { setting } = useSnapshot(settingStore);

	return (
		<Stack position={'relative'} height={'100%'}>
			{/* --------------------- call now to user sidebar*/}
			<CallNow />

			{/* --------------------- sidebars */}
			{baselayout ? (
				<>
					{/* --------------------- base layout */}
					{setting ? <SettingSidebar /> : null}
				</>
			) : (
				<>
					{/* --------------------- main layout and chat layout */}
					{setting ? <SettingSidebar /> : <SecondSidebar />}
				</>
			)}
		</Stack>
	);
};

export default SidebarSecond;
