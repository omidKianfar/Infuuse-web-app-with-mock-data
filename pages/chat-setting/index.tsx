import ChatSetting from '@/components/pages/settings/chat-setting';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const LiveChatSettingPage: NextPageWithLayout = () => {
	return <ChatSetting />;
};

LiveChatSettingPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default LiveChatSettingPage;
