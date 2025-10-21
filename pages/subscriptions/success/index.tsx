import SubscriptionSuccess from "@/components/pages/settings/subscriptions/success";
import { UserType } from "@/graphql/generated";
import Layout from "@/layout";

const SubscriptionsSuccessPage: NextPageWithLayout = () => {
  return <SubscriptionSuccess />;
};

SubscriptionsSuccessPage.getLayout = function getLayout(page) {
  return <Layout type="AuthLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>{page}</Layout>;
};

export default SubscriptionsSuccessPage;
