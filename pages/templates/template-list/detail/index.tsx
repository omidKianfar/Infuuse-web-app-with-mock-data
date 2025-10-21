import EditTemplate from '@/components/pages/settings/templates/category-list/template-list/detail/edit-template';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const TemplateDetailPage: NextPageWithLayout = () => {
	return <EditTemplate />;
};

TemplateDetailPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default TemplateDetailPage;
