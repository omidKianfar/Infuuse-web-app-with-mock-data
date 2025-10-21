import { useRouter } from 'next/router';
import { useAuth } from '@/providers/AuthProvider';
import { Grid, InputAdornment, Stack, Typography, useMediaQuery } from '@mui/material';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { useTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import StyleCardContainer from '@/components/organisms/StyleCard';
import { NextButton } from '@/components/atoms/Button';
import { getFullImageUrl } from '@/utils';
import Image from '@/components/atoms/Image';
import { ForgetPasswordIcon } from '@/assets/forgetpass';
import EmailIcon from '@/assets/email-icon';

const defaultValues = { email: '' };

export default function ForgetPassword() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const { resetPassword, isLoading } = useAuth();
	const router = useRouter();
	const [isDone, setIsDone] = useState(false);

	const methods = useForm({
		resolver: yupResolver(ResetPasswordSchema),
		defaultValues,
	});
	const { handleSubmit } = methods;

	const onSignIn = useCallback(() => {
		router.replace('/signin');
	}, []);

	const onSubmit = async (values: typeof defaultValues) => {
		await resetPassword(values.email);
		setIsDone(true);
	};

	return (
		<Stack
			width={'100%'}
			height={'100%'}
			direction={'row'}
			justifyContent={'center'}
			alignItems={'center'}
			bgcolor={theme?.palette?.infuuse?.gray100}
		>
			<Stack
				width={'500px'}
				height={isMobile ? '100%' : '400px'}
				bgcolor={theme?.palette?.infuuse?.gray200}
				p={3}
				borderRadius={2}
			>
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack justifyContent="center">
						{isMobile ? (
							<Stack direction="column" justifyContent="center" alignItems="center">
								<Image src={'/images/infuuse-logo.svg'} />
								<Typography
									sx={{
										textAlign: 'center',
									}}
									mt={4}
									color={theme.palette?.infuuse?.blue500}
									fontWeight={'bold'}
									fontSize={'16px'}
								>
									Reset Password
								</Typography>
							</Stack>
						) : (
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								mt={4}
								mb={{ md: isDone ? 1 : 4 }}
							>
								<Typography
									sx={{
										textAlign: 'center',
									}}
									fontWeight={'bold'}
									fontSize={'16px'}
									color={theme.palette?.infuuse?.blue500}
								>
									Reset Password
								</Typography>
								<Image src={'/images/infuuse-logo.svg'} />
							</Stack>
						)}
						{isDone ? (
							<>
								<Stack px={2} mt={2} direction="column" justifyContent="center" alignItems="center">
									<ForgetPasswordIcon />
									<Typography sx={{ textAlign: 'center' }} color={theme.palette?.infuuse?.blue500}>
										A link was sent to your email. Please check your inbox and spam box.
									</Typography>
								</Stack>
								<Stack mt={2}>
									<TextField
										disabled
										name="email"
										color="info"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<EmailIcon />
												</InputAdornment>
											),
										}}
									/>
								</Stack>

								<NextButton onClick={onSignIn} sx={{ mt: 4 }}>
									Go Back
								</NextButton>
							</>
						) : (
							<>
								<Stack px={4} mt={3} direction="row" justifyContent="center">
									<Typography
										sx={{ textAlign: 'center' }}
										gutterBottom
										color={theme.palette?.infuuse?.blue500}
									>
										Enter your email address to send a reset password link to you
									</Typography>
								</Stack>

								<Stack mt={3}>
									<TextField
										name="email"
										color="info"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<EmailIcon />
												</InputAdornment>
											),
										}}
									/>
								</Stack>

								<NextButton sx={{ mt: 4 }} loading={isLoading == 'RESET_PASSWORD'}>
									Send Link
								</NextButton>
							</>
						)}
					</Stack>
				</FormProvider>
			</Stack>
		</Stack>
	);
}

export const ResetPasswordSchema = Yup.object().shape({
	email: Yup.string().email().required('Enter Your Email'),
});
