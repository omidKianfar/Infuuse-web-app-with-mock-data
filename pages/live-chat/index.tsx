import LiveChat from '@/components/pages/left-sidebar/live-chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const LiveChatPage: NextPageWithLayout = () => {
	return <LiveChat />;
};

LiveChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default LiveChatPage;
