import Instagram from '@/components/pages/left-sidebar/instagram';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const InstagramPage: NextPageWithLayout = () => {
	return <Instagram />;
};

InstagramPage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default InstagramPage;
