import AdminSubscriptions from '@/components/pages/left-sidebar/admin/subscription';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminSubscriptionPage: NextPageWithLayout = () => {
	return <AdminSubscriptions />;
};

AdminSubscriptionPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminSubscriptionPage;
