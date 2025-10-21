import AgencyMemberDetail from '@/components/pages/settings/members/agency-member/detail';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const MembersDetailPage: NextPageWithLayout = () => {
	return <AgencyMemberDetail />;
};

MembersDetailPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default MembersDetailPage;
