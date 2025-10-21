import TemplateList from '@/components/pages/settings/templates/category-list/template-list';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const TemplateListPage: NextPageWithLayout = () => {
	return <TemplateList />;
};

TemplateListPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default TemplateListPage;
