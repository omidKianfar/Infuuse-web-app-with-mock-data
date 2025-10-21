import InboxAllchannel_Chat from '@/components/pages/left-sidebar/inbox/all-channel/all-channel-chats';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const InboxChatPage: NextPageWithLayout = () => {
	return <InboxAllchannel_Chat />;
};

InboxChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="ChatLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default InboxChatPage;
