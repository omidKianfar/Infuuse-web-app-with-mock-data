import EditCategory from '@/components/pages/settings/categories/category-list/detail/edit-categories';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const CategoryDetailPage: NextPageWithLayout = () => {
	return <EditCategory />;
};

CategoryDetailPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default CategoryDetailPage;
