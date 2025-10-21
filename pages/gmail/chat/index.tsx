import Gmail_Chat from '@/components/pages/left-sidebar/gmail/chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const GmailChatPage: NextPageWithLayout = () => {
	return <Gmail_Chat />;
};

GmailChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="ChatLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default GmailChatPage;
