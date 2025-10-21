import CustomerList from '@/components/pages/left-sidebar/admin/customer-list';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminCustomerListPage: NextPageWithLayout = () => {
	return <CustomerList />;
};

AdminCustomerListPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminCustomerListPage;
