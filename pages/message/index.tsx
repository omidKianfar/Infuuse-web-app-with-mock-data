import Message from '@/components/pages/left-sidebar/message';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const MessagePage: NextPageWithLayout = () => {
	return <Message />;
};

MessagePage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default MessagePage;
