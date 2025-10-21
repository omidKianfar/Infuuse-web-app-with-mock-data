import Tags from '@/components/pages/settings/tags';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const TagsPage: NextPageWithLayout = () => {
	return <Tags />;
};

TagsPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default TagsPage;
