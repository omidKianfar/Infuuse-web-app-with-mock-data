import Members from '@/components/pages/settings/members';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const MembersPage: NextPageWithLayout = () => {
	return <Members />;
};

MembersPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default MembersPage;
