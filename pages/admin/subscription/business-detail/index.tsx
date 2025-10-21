import EditSubscriptionBusiness from '@/components/pages/left-sidebar/admin/subscription/log-subscriptions/table/subscriptions-table/detail/business';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminSubscriptionDetailBusinessPage: NextPageWithLayout = () => {
	return <EditSubscriptionBusiness />;
};

AdminSubscriptionDetailBusinessPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminSubscriptionDetailBusinessPage;
