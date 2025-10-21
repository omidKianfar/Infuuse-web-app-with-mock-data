import Gmail from '@/components/pages/left-sidebar/gmail';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const GmailPage: NextPageWithLayout = () => {
	return <Gmail />;
};

GmailPage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default GmailPage;
