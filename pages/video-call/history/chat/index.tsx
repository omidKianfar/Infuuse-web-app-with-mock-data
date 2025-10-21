import VideoCallHistory_Chat from '@/components/pages/left-sidebar/video-call/history/chat';
import { UserType } from '@/graphql/generated';
import Layout from '@/layout';

const VideoCallHistory_ChatPage: NextPageWithLayout = () => {
	return <VideoCallHistory_Chat />;
};

VideoCallHistory_ChatPage.getLayout = function getLayout(page) {
	return (
		<Layout type="BaseLayout" accessibleRoles={[UserType?.BusinessMember, UserType?.AgencyMember]}>
			{page}
		</Layout>
	);
};

export default VideoCallHistory_ChatPage;
