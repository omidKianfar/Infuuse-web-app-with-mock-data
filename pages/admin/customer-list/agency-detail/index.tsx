import AgencyCustomerListDetail from '@/components/pages/left-sidebar/admin/customer-list/agent/detail';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminCustomerListDetailPage: NextPageWithLayout = () => {
	return <AgencyCustomerListDetail />;
};

AdminCustomerListDetailPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminCustomerListDetailPage;
