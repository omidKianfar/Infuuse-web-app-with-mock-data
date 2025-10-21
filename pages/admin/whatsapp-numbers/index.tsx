import TwilioNumbers from '@/components/pages/settings/admin/twilio-numbers';
import AdminWhatsappNumbers from '@/components/pages/settings/admin/whatsapp-numbers';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const AdminWhatsappNumbersPage: NextPageWithLayout = () => {
	return <AdminWhatsappNumbers />;
};

AdminWhatsappNumbersPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>
			{page}
		</Layout>
	);
};

export default AdminWhatsappNumbersPage;
