import Contacts from '@/components/pages/main-header/contacts';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const ContactsPage: NextPageWithLayout = () => {
	return <Contacts />;
};

ContactsPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default ContactsPage;
