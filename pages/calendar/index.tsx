import Calendar from '@/components/pages/main-header/calendar.tsx';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const CalendarPage: NextPageWithLayout = () => {
	return <Calendar />;
};

CalendarPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default CalendarPage;
