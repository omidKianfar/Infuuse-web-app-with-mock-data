import ContactChat from '@/components/pages/settings/contact-chat';
import Layout from '@/layout';

const ContactChatPage: NextPageWithLayout = () => {
	return <ContactChat />;
};

ContactChatPage.getLayout = function getLayout(page) {
	return <Layout type="contactLayout">{page}</Layout>;
};

export default ContactChatPage;
