import Subscriptions from "@/components/pages/settings/subscriptions";
import { UserType } from "@/graphql/generated";
import Layout from "@/layout";

const SubscriptionsPage: NextPageWithLayout = () => {
  return <Subscriptions />;
};

SubscriptionsPage.getLayout = function getLayout(page) {
  return <Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>{page}</Layout>;
};

export default SubscriptionsPage;
