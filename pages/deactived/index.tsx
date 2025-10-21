import DeactivePage from '@/components/pages/auth/sign/deactive-page';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const DeactivatedPage: NextPageWithLayout = () => {
	return <DeactivePage />;
};

DeactivatedPage.getLayout = function getLayout(page) {
	return (
		<Layout type="AuthLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default DeactivatedPage;
