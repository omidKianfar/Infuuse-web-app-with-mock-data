import DeactivePayment from '@/components/pages/auth/sign/deactive-peyment-page';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const DeactivatedPaymentPage: NextPageWithLayout = () => {
	return <DeactivePayment />;
};

DeactivatedPaymentPage.getLayout = function getLayout(page) {
	return (
		<Layout type="AuthLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default DeactivatedPaymentPage;
