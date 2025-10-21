import InternalChat from '@/components/pages/main-header/internal-chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const InternalPage: NextPageWithLayout = () => {
	return <InternalChat />;
};

InternalPage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default InternalPage;
