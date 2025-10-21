import Categories from '@/components/pages/settings/categories';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const CategoriesPage: NextPageWithLayout = () => {
	return <Categories />;
};

CategoriesPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default CategoriesPage;
