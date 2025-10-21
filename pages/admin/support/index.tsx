import AdminSupport from '@/components/pages/left-sidebar/admin/support';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminSupportPage: NextPageWithLayout = () => {
	return <AdminSupport />;
};

AdminSupportPage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminSupportPage;
