import Message_Chat from '@/components/pages/left-sidebar/message/chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const MessageChatPage: NextPageWithLayout = () => {
	return <Message_Chat />;
};

MessageChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="ChatLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default MessageChatPage;
