import SocialChannels from "@/components/pages/settings/social-channels";
import { UserType } from "@/graphql/generated";
import Layout from "@/layout";

const SocialChannelsPage: NextPageWithLayout = () => {
  return <SocialChannels />;
};

SocialChannelsPage.getLayout = function getLayout(page) {
  return <Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>{page}</Layout>;
};

export default SocialChannelsPage;
