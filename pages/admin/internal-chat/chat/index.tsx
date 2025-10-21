import AdminInternalCHat_Chat from '@/components/pages/left-sidebar/admin/internal-chat/chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminInternalChat_chatPage: NextPageWithLayout = () => {
	return <AdminInternalCHat_Chat />;
};

AdminInternalChat_chatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="ChatLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminInternalChat_chatPage;
