import Call from '@/components/pages/left-sidebar/call';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const CallPage: NextPageWithLayout = () => {
	return <Call />;
};

CallPage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default CallPage;
