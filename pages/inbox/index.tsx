import InboxConversation from '@/components/pages/left-sidebar/inbox';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const InboxPage: NextPageWithLayout = () => {
	return <InboxConversation />;
};

InboxPage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default InboxPage;
