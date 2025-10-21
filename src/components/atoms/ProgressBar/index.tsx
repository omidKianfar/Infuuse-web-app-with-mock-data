import { LinearProgress, LinearProgressProps, Stack, Typography } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';

export default function ProgressBar() {
	const theme = useTheme();
	const router = useRouter();

	NProgress.configure({ showSpinner: false });

	useEffect(() => {
		const handleStart = () => NProgress.start();
		const handleStop = () => NProgress.done();

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleStop);
		router.events.on('routeChangeError', handleStop);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleStop);
			router.events.off('routeChangeError', handleStop);
		};
	}, [router]);

	return (
		<GlobalStyles
			styles={{
				'#nprogress': {
					pointerEvents: 'none',
					'& .bar': {
						top: 0,
						left: 0,
						height: 2,
						width: '100%',
						position: 'fixed',
						zIndex: theme.zIndex.snackbar,
						backgroundColor: theme.palette.primary.main,
						boxShadow: `0 0 2px ${theme.palette.primary.main}`,
					},
					'& .peg': {
						right: 0,
						opacity: 1,
						width: 100,
						height: '100%',
						display: 'block',
						position: 'absolute',
						transform: 'rotate(3deg) translate(0px, -4px)',
						boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
					},
				},
			}}
		/>
	);
}

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number; label: string; rate: number }) {
	return (
		<Stack direction="row" alignItems="center">
			<Typography color="text.secondary" fontSize={13} mr={2} minWidth={65}>
				{props.label}
			</Typography>
			<Stack flex={1}>
				<LinearProgress variant="determinate" color="warning" {...props} />
			</Stack>
			<Typography pl={1} minWidth={35}>
				{props.rate || 0}
			</Typography>
		</Stack>
	);
}
