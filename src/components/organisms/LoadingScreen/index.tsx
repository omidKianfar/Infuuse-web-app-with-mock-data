import { alpha, styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import waitingAnimation from './waiting.json';

const Lottie = dynamic(()=>import("lottie-react"), {ssr:false})

interface Props {
	variant?: 'FillViewPort' | 'FillParentView';
}
const Wrapper = styled('div')<{ variant?: 'FillViewPort' | 'FillParentView' }>(
	({ theme, variant = 'FillParentView' }) => ({
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		backdropFilter: 'blur(5px)',
		WebkitBackdropFilter: 'blur(5px)', // Fix on Mobile
		width: variant == 'FillViewPort' ? '100vw' : '100%',
		height: variant == 'FillViewPort' ? '100vh' : '100%',
		backgroundColor: alpha(theme.palette.background.default, 0.7),
	})
);

export default function FullscreenLoading({ variant }: Props) {
	return (
		<Wrapper variant={variant}>
			<Lottie animationData={waitingAnimation} loop style={{ width: 250 }} />
		</Wrapper>
	);
}
