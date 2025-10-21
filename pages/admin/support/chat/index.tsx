import AdminSupport_Chat from '@/components/pages/left-sidebar/admin/support/chat';
import Call_chat from '@/components/pages/left-sidebar/call/chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminSupport_ChatPage: NextPageWithLayout = () => {
	return <AdminSupport_Chat />;
};

AdminSupport_ChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="ChatLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminSupport_ChatPage;
