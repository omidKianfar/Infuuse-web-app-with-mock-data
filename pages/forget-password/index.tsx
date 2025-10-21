import ForgetPassword from '@/components/pages/auth/sign/signin/ForgetPassword';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const ForgotPasswordPage: NextPageWithLayout = () => {
	return <ForgetPassword />;
};

ForgotPasswordPage.getLayout = function getLayout(page) {
	return (
		<Layout type="AuthLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default ForgotPasswordPage;
