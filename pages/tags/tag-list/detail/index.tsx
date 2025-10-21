import EditTag from '@/components/pages/settings/tags/category-list/tag-list/detail/edit-tag';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const TagDetailPage: NextPageWithLayout = () => {
	return <EditTag />;
};

TagDetailPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default TagDetailPage;
