import TagList from '@/components/pages/settings/tags/category-list/tag-list';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const TagListPage: NextPageWithLayout = () => {
	return <TagList />;
};

TagListPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default TagListPage;
