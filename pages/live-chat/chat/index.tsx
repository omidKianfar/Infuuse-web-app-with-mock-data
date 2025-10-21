import LiveChat_Chat from '@/components/pages/left-sidebar/live-chat/chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const LiveChatChatPage: NextPageWithLayout = () => {
	return <LiveChat_Chat />;
};

LiveChatChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="ChatLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default LiveChatChatPage;
