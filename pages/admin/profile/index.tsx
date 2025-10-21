import Profile from "@/components/pages/settings/profile";
import { UserType } from "@/graphql/generated";
import Layout from "@/layout";

const AdminProfilePage: NextPageWithLayout = () => {
  return <Profile />;
};

AdminProfilePage.getLayout = function getLayout(page) {
  return <Layout type="BaseLayout" accessibleRoles={[UserType?.Administrator]}>{page}</Layout>;
};

export default AdminProfilePage;
