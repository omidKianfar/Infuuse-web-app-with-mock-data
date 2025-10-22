import EmailIcon from '@/assets/email-icon';
import PasswordIcon from '@/assets/password-icon';
import { NextButton } from '@/components/atoms/Button';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { useAuth } from '@/providers/AuthProvider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthSection from '../../..';
import SignHeader from '../../../sign-header';
import { DownButtonContainer, ForgotPassword, Label, SignContainer } from '../../../styles';

const Login = () => {
	//  -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	// ------------------------------- useAuth
	const { isLoading, signInWithEmail, setSignupStepCounter } = useAuth();

	useEffect(() => {
		setSignupStepCounter(0);
	}, []);

	// -------------------------------state
	const [visible, setVisible] = useState(false);

	// -------------------------------form
	const defaultValues = {
		email: '',
		password: '',
	};

	const methods = useForm({
		resolver: yupResolver(SigninSchema),
		defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: typeof defaultValues) => {
		signInWithEmail(values.email, values.password);
	};

	// -------------------------------functions
	const forgotPassword = () => {
		router.push('/forget-password');
	};

	return (
		<AuthSection>
			<SignContainer direction="column" maxHeight="400px">
				{/*  -------------------------------header */}
				<SignHeader title="Sign In" description="Seize The Day" />

				{/* -------------------------------form */}
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack>
						{/* -------------------------------fields */}
						<Label>Email</Label>

						<TextField
							name="email"
							fullWidth
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<EmailIcon />
									</InputAdornment>
								),
							}}
						/>
						<Stack position="relative" width={'100%'}>
							<Label>Password</Label>

							<TextField
								name="password"
								type={visible ? 'text' : 'password'}
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PasswordIcon />
										</InputAdornment>
									),

									endAdornment: (
										<InputAdornment position="end">
											<Box
												onClick={() => setVisible(!visible)}
												display={'flex'}
												justifyContent={'center'}
												alignItems={'center'}
												sx={{ cursor: 'pointer' }}
											>
												{visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
											</Box>
										</InputAdornment>
									),
								}}
							/>

							{/* -------------------------------forgot password */}
							<ForgotPassword onClick={forgotPassword}>
								<Typography
									fontSize={'16px'}
									sx={{
										'&:hover': {
											color: theme?.palette?.infuuse.blue500,
										},
									}}
								>
									Forgat Password?
								</Typography>
							</ForgotPassword>
						</Stack>
					</Stack>

					{/* ------------------------------- button */}
					<DownButtonContainer>
						<Stack width={'100%'} direction={'row'} justifyContent={'center'} alignItems={'center'}>
							<NextButton
								type="submit"
								isLoading={isLoading === 'SIGN_IN_WITH_EMAIL'}
								sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}
							>
								Sign In
							</NextButton>
						</Stack>
					</DownButtonContainer>
				</FormProvider>
			</SignContainer>
		</AuthSection>
	);
};

export default Login;

// -------------------------------schema
const SigninSchema = Yup.object().shape({
	email: Yup.string().email().required('Enter Your Email').trim(),
	password: Yup.string().required('Enter Your Password').trim(),
});
