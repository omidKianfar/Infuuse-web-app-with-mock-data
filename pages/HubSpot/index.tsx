import Hubspot from '@/components/pages/settings/huspot';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const HobspotPage: NextPageWithLayout = () => {
	return <Hubspot />;
};

HobspotPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default HobspotPage;
