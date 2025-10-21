import { useTwilio } from '@/providers/Twilio/provider';
import settingStore from '@/store/setting.store';
import { Stack, styled } from '@mui/material';
import { useEffect } from 'react';
import CallCard from './call-card';

const CallNow = () => {
	const { callHistory } = useTwilio();

	useEffect(() => {
		if (callHistory?.length) {
			settingStore.setting = true;
		}
	}, [callHistory]);

	return (
		<CallSidebarContainer>
			{callHistory.map((item) => (
				<CallCard key={item.id} item={item} />
			))}
		</CallSidebarContainer>
	);
};

export default CallNow;

export const CallSidebarContainer = styled(Stack)({
	width: '100%',
	maxHeight: '100vh',
	padding: '16px',
	overflow: 'auto',
	position: 'absolute',
	top: 0,
	left: 0,
	zIndex: 10000,
});
