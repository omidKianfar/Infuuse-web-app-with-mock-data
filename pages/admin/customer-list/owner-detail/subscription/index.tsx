import OwnerSubscriptions from '@/components/pages/left-sidebar/admin/customer-list/owner/detail/subscription';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminCustomerListDetailOwnerSubscriptionPage: NextPageWithLayout = () => {
	return <OwnerSubscriptions />;
};

AdminCustomerListDetailOwnerSubscriptionPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminCustomerListDetailOwnerSubscriptionPage;
