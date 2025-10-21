import Facebook from '@/components/pages/left-sidebar/facebook';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const FaceBookPage: NextPageWithLayout = () => {
	return <Facebook />;
};

FaceBookPage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default FaceBookPage;
