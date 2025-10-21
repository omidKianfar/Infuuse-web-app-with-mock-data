import Feedback from '@/components/pages/left-sidebar/admin/feedback';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminFeedbackPage: NextPageWithLayout = () => {
	return <Feedback />;
};

AdminFeedbackPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminFeedbackPage;
