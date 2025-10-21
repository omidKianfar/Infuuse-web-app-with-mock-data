import EditSubscriptionAgency from '@/components/pages/left-sidebar/admin/subscription/log-subscriptions/table/subscriptions-table/detail/agency';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminSubscriptionDetailAgencyPage: NextPageWithLayout = () => {
	return <EditSubscriptionAgency />;
};

AdminSubscriptionDetailAgencyPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminSubscriptionDetailAgencyPage;
