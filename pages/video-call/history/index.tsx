import VideoCallHistory from '@/components/pages/left-sidebar/video-call/history';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const VideoCallHistoryPage: NextPageWithLayout = () => {
	return <VideoCallHistory />;
};

VideoCallHistoryPage.getLayout = function getLayout(page) {
	return (
		<Layout type="MainLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default VideoCallHistoryPage;
