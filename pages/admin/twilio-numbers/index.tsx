import TwilioNumbers from "@/components/pages/settings/admin/twilio-numbers";
import { UserType } from "@/graphql/generated";
import Layout from "@/layout";

const AdminTwilioNumbersPage: NextPageWithLayout = () => {
  return <TwilioNumbers />;
};

AdminTwilioNumbersPage.getLayout = function getLayout(page) {
  return <Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>{page}</Layout>;
};

export default AdminTwilioNumbersPage;
