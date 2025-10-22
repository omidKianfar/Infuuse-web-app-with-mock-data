import { NextButton } from '@/components/atoms/Button';
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';
import settingStore from '@/store/setting.store';
import { ACCESS_REFRESH_TOKEN, ACCESS_TOKEN_KEY } from '@/utils/constants';
import { clearCookie } from '@/utils/storage/cookieStorage';
import { Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

interface Props {
	handleClose: () => void;
}

const LogoutModal = ({ handleClose }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();
	const queryClient = useQueryClient()

	const { logout, setSignupStepCounter } = useAuth();

	// -----------------------------------functions
	const handleLogout = async () => {
		try {
			await logout();
			queryClient.clear()
			setSignupStepCounter(0);
			settingStore.setting = false;
			clearCookie(ACCESS_TOKEN_KEY);
			clearCookie(ACCESS_REFRESH_TOKEN);
			router.replace('/signin');
		} catch (error) {
			console.error(error);
			enqueueSnackbar('Unable to logout!', { variant: 'error' });
		}
	};

	return (
		<Stack width={'400px'} height={'100%'} bgcolor={theme?.palette?.infuuse?.gray200} p={'24px'} borderRadius={2}>
			<Stack sx={{ textAlign: 'center', mb: 4 }}>
				<Typography fontWeight={'bold'} sx={{ textJustify: 'inter-word' }}>
					Do you want{' '}
					<span
						style={{
							color: theme?.palette?.infuuse?.orange100,
							margin: '0 4px',
						}}
					>
						Logout
					</span>
					?
				</Typography>
			</Stack>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<NextButton onClick={handleClose} sx={{ width: '150px' }}>
					Cancel
				</NextButton>
				<NextButton
					onClick={handleLogout}
					sx={{ width: '150px', backgroundColor: theme?.palette?.infuuse?.orange100 }}
				>
					Logout
				</NextButton>
			</Stack>
		</Stack>
	);
};

export default LogoutModal;
