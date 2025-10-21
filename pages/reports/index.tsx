import Reports from "@/components/pages/left-sidebar/reports";
import { UserType } from "@/graphql/generated";
import Layout from "@/layout";

const ReportPage: NextPageWithLayout = () => {
  return <Reports />;
};

ReportPage.getLayout = function getLayout(page) {
  return <Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>{page}</Layout>;
};

export default ReportPage;
