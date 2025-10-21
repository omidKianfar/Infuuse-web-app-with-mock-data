import SubscriptionFailed from "@/components/pages/settings/subscriptions/failed";
import { UserType } from "@/graphql/generated";
import Layout from "@/layout";

const SubscriptionsFailedPage: NextPageWithLayout = () => {
  return <SubscriptionFailed />;
};

SubscriptionsFailedPage.getLayout = function getLayout(page) {
  return <Layout type="AuthLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>{page}</Layout>;
};

export default SubscriptionsFailedPage;
