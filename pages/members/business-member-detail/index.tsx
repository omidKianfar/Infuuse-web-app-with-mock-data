import BusinessMemberDetail from '@/components/pages/settings/members/business-member/detail';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const MembersDetailPage: NextPageWithLayout = () => {
	return <BusinessMemberDetail />;
};

MembersDetailPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default MembersDetailPage;
