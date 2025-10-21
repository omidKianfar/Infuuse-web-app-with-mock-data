import Signin from '@/components/pages/auth/sign/signin';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const SigninPage: NextPageWithLayout = () => {
	return <Signin />;
};

SigninPage.getLayout = function getLayout(page) {
	return (
		<Layout type="AuthLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default SigninPage;
