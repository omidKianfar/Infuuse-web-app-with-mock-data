import Whatsapp from '@/components/pages/left-sidebar/whatsapp';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const WhatsappPage: NextPageWithLayout = () => {
	return <Whatsapp />;
};

WhatsappPage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default WhatsappPage;
