import Whatsapp_Chat from '@/components/pages/left-sidebar/whatsapp/chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const WhatsappChatPage: NextPageWithLayout = () => {
	return <Whatsapp_Chat />;
};

WhatsappChatPage.getLayout = function getLayout(page) {
	return <Layout type="ChatLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>{page}</Layout>;
};

export default WhatsappChatPage;
