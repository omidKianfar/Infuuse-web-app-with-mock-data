import Signup from "@/components/pages/auth/sign/signup";
import { UserType } from "@/graphql/generated";
import Layout from "@/layout";

const SignupPage: NextPageWithLayout = () => {
  return <Signup />;
};

SignupPage.getLayout = function getLayout(page) {
  return <Layout type="AuthLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>{page}</Layout>;
};

export default SignupPage;
