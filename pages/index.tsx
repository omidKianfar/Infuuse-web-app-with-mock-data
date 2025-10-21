import InboxConversation from '@/components/pages/left-sidebar/inbox';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const HomePage: NextPageWithLayout = () => {
	return <InboxConversation />;
};

HomePage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default HomePage;
