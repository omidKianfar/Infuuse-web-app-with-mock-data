import Phonebook from '@/components/pages/main-header/phonebook';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const PhonebookPage: NextPageWithLayout = () => {
	return <Phonebook />;
};

PhonebookPage.getLayout = function getLayout(page) {
	return <Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>{page}</Layout>;
};

export default PhonebookPage;
