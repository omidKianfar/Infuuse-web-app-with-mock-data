import Profile from "@/components/pages/settings/profile";
import { UserType } from "@/graphql/generated";
import Layout from "@/layout";

const ProfilePage: NextPageWithLayout = () => {
  return <Profile />;
};

ProfilePage.getLayout = function getLayout(page) {
  return <Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember, UserType?.Administrator]}>{page}</Layout>;
};

export default ProfilePage;
