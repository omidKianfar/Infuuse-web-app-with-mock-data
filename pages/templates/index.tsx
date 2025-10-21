import Templates from "@/components/pages/settings/templates";
import { UserType } from "@/graphql/generated";
import Layout from "@/layout";

const TemplatesPage: NextPageWithLayout = () => {
  return <Templates />;
};

TemplatesPage.getLayout = function getLayout(page) {
  return <Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>{page}</Layout>;
};

export default TemplatesPage;
