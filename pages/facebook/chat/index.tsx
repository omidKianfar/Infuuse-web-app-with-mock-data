import Facebook_Chat from '@/components/pages/left-sidebar/facebook/chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const FacebookChatPage: NextPageWithLayout = () => {
	return <Facebook_Chat />;
};

FacebookChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="ChatLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default FacebookChatPage;
