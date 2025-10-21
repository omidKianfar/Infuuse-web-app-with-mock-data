import AdminDetail from '@/components/pages/settings/admin/infuuse-administrators/admin-list/detail';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminInfuuseAdminDetailPage: NextPageWithLayout = () => {
	return <AdminDetail />;
};

AdminInfuuseAdminDetailPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminInfuuseAdminDetailPage;
