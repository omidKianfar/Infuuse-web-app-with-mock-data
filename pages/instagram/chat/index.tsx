import Instagram_Chat from '@/components/pages/left-sidebar/instagram/chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const InstagramChatPage: NextPageWithLayout = () => {
	return <Instagram_Chat />;
};

InstagramChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="ChatLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default InstagramChatPage;
