import chatStore from '@/store/chat.store';
import { useSnapshot } from 'valtio';
import AddDealSidebar from './add';
import EditDealSidebar from './edit';

const DealSidebar = () => {
	// -------------------------------state management
	const { dealId } = useSnapshot(chatStore);

	console.log('dealId', dealId);

	return <>{dealId === null ? <AddDealSidebar /> : <EditDealSidebar />}</>;
};

export default DealSidebar;
