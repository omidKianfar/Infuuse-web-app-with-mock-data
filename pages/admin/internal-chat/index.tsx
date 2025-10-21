import AdminInternalChat from '@/components/pages/left-sidebar/admin/internal-chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminInternalChatPage: NextPageWithLayout = () => {
	return <AdminInternalChat />;
};

AdminInternalChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminInternalChatPage;
