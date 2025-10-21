import Ticket from "@/components/pages/main-header/ticket";
import { UserType } from "@/graphql/generated";
import Layout from "@/layout";

const TicketPage: NextPageWithLayout = () => {
  return <Ticket />;
};

TicketPage.getLayout = function getLayout(page) {
  return <Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>{page}</Layout>;
};

export default TicketPage;
