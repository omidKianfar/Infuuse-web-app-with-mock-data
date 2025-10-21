import InternalChat_Chat from '@/components/pages/main-header/internal-chat/chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const InternalChatPage: NextPageWithLayout = () => {
	return <InternalChat_Chat />;
};

InternalChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="ChatLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default InternalChatPage;
