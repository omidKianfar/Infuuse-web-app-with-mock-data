import Businesses from '@/components/pages/settings/businesses';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const BusinessesPage: NextPageWithLayout = () => {
	return <Businesses />;
};

BusinessesPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default BusinessesPage;
