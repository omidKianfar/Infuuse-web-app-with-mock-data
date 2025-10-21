import SigninNotification from '@/components/pages/auth/sign/signin/signin-notification';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const SigninNotificationPage: NextPageWithLayout = () => {
	return <SigninNotification />;
};

SigninNotificationPage.getLayout = function getLayout(page) {
	return (
		<Layout
			type="NotificationLayout"
			accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember, UserType?.Administrator]}
		>
			{page}
		</Layout>
	);
};

export default SigninNotificationPage;
