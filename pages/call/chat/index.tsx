import Call_chat from '@/components/pages/left-sidebar/call/chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const CallChatPage: NextPageWithLayout = () => {
	return <Call_chat />;
};

CallChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="ChatLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default CallChatPage;
