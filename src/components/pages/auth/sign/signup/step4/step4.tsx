import { Stack, useMediaQuery, useTheme } from '@mui/material';
import Header from './header';
import NoChatPage from '@/components/atoms/no-data';
import Body from './body';
import { DownButtonContainer } from '../../../styles';
import { NextButton } from '@/components/atoms/Button';
import { useRouter } from 'next/router';

const Step4 = () => {
	// -------------------------------tools
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const router = useRouter();

	const handelFinish = () => {
		router.push('/inbox');
	};

	return (
		<Stack width={'100%'} height={'100vh'} minHeight={'100vh'} maxHeight={'100vh'} overflow={'auto'} p={2}>
			<Header />

			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'start'}
				position={'relative'}
				width={'100%'}
				height={'100%'}
			>
				{/* ---------------------------------phone */}
				<Stack width={isMobile ? '100%' : '50%'} pt={2}>
					<Body />
				</Stack>
				{!isMobile && (
					<Stack width={'50%'}>
						<NoChatPage />
					</Stack>
				)}
				{/* ------------------------------- button */}
				{!isMobile && (
					<DownButtonContainer>
						<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} mb={2}>
							<NextButton
								onClick={handelFinish}
								sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}
							>
								Finish
							</NextButton>
						</Stack>
					</DownButtonContainer>
				)}
			</Stack>
		</Stack>
	);
};

export default Step4;
