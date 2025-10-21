import VideoCall from '@/components/pages/left-sidebar/video-call/with-link';
import Layout from '@/layout';

const VideoCallPage: NextPageWithLayout = () => {
	return <VideoCall />;
};

VideoCallPage.getLayout = function getLayout(page) {
	return <Layout type="contactLayout">{page}</Layout>;
};

export default VideoCallPage;
