import AgencySubscriptions from '@/components/pages/left-sidebar/admin/customer-list/agent/detail/subscription';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminCustomerListDetailAgencySubscriptionPage: NextPageWithLayout = () => {
	return <AgencySubscriptions />;
};

AdminCustomerListDetailAgencySubscriptionPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminCustomerListDetailAgencySubscriptionPage;
