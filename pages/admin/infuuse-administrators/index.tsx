import InfuuseAdmin from '@/components/pages/settings/admin/infuuse-administrators';
import AdminWhatsappNumbers from '@/components/pages/settings/admin/whatsapp-numbers';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminInfuuseAdminPage: NextPageWithLayout = () => {
	return <InfuuseAdmin />;
};

AdminInfuuseAdminPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminInfuuseAdminPage;
