import EmailIcon from '@/assets/email-icon';
import PasswordIcon from '@/assets/password-icon';
import UserIcon from '@/assets/user-icon';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Divider, InputAdornment, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import AuthSection from '../../..';
import SignHeader from '../../../sign-header';
import { DownButtonContainer, Label, SignContainer } from '../../../styles';

import { NextButton } from '@/components/atoms/Button';
import userTypeStore from '@/store/userType.store';
import { useSnapshot } from 'valtio';
import FacebookIcon from '@/assets/facebook-icon';
import GmailIcon from '@/assets/gmail-icon';
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';
import { useSnackbar } from 'notistack';

const Step2 = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const { signUpWithEmail } = useAuth();
	const { userType } = useSnapshot(userTypeStore);
	const { enqueueSnackbar } = useSnackbar();

	// -------------------------------state
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	// -------------------------------form
	const defaultValues = {
		name: '',
		email: '',
		password: '',
	};

	const methods = useForm({
		resolver: yupResolver(SigninSchema),
		defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: typeof defaultValues) => {
		signUpWithEmail({
			email: values.email,
			password: values.password,
			name: values.name,
			type: userType,
		});
		setLoading(true)
	};

	// -------------------------------functions
	const onGoogleClick = () => {
		// signInWithGoogle({ type: userType });
		enqueueSnackbar('Signup with google not available', { variant: 'warning' });
	};

	const onFacebookClick = () => {
		// signInWithFacebook();
		enqueueSnackbar('Signup with facebook not available', { variant: 'warning' });
	};

	return (
		<AuthSection>
			<SignContainer direction="column" maxHeight={isMobile ? '650px' : '630px'}>
				<SignHeader title="Sign In" description="Seize The Day" />

				{/* -------------------------------form */}
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack position={'relative'} width={'100%'} height={isMobile ? '540px' : '520px'}>
						<Stack>
							{/* -------------------------------fields */}
							<Label>Name</Label>

							<TextField
								name="name"
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<UserIcon />
										</InputAdornment>
									),
								}}
							/>

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
						</Stack>

						{/* ------------------------------- sign google or facebook */}
						<Stack
							direction={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
							width={'100%'}
							mt={1}
						>
							<Divider sx={{ border: `2px solid ${theme?.palette?.infuuse._C4CAD8}`, width: '30%' }} />
							<Box
								sx={{
									width: '30%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Typography
									fontSize={'16px'}
									color={theme?.palette?.infuuse.blueLight500}
									sx={{ textWrap: 'nowrap' }}
								>
									Continue With
								</Typography>
							</Box>

							<Divider sx={{ border: `2px solid ${theme?.palette?.infuuse._C4CAD8}`, width: '30%' }} />
						</Stack>
						<Stack
							direction={'row'}
							justifyContent={'center'}
							alignItems={'center'}
							width={'100%'}
							mt={1}
							mb={1}
						>
							<Tooltip title="Meta signin not available yet">
								<Box mr={'80px'} sx={{ cursor: 'pointer' }} onClick={onFacebookClick}>
									<FacebookIcon
										fill={theme?.palette?.infuuse.blueDark400}
										width="38px"
										height="38px"
									/>
								</Box>
							</Tooltip>

							<Tooltip title="Gmail signin not available yet">
								<Box sx={{ cursor: 'pointer' }} onClick={onGoogleClick}>
									<GmailIcon
										width="55px"
										height="55px"
										fill={{
											fill1: '#EA4335',
											fill2: '#FBBC05',
											fill3: '#34A853',
											fill4: '#C5221F',
											fill5: '#4285F4',
										}}
									/>
								</Box>
							</Tooltip>
						</Stack>

						{/* ------------------------------- down menu */}
						<DownButtonContainer>
							{/* -------------------------------privacy policy */}
							<Stack borderRadius={4} bgcolor={theme?.palette?.infuuse.gray400} textAlign={'center'}>
								<Label p={1}>
									By clicking Agree & Join, you agree to the INFUUSE{' '}
									<span style={{ color: theme?.palette?.infuuse.blue200, cursor: 'pointer' }}>
										User Agreement
									</span>
									,{' '}
									<span style={{ color: theme?.palette?.infuuse.blue200, cursor: 'pointer' }}>
										Privacy Policy
									</span>
									, and
									<span
										style={{
											color: theme?.palette?.infuuse.blue200,
											marginLeft: '4px',
											cursor: 'pointer',
										}}
									>
										Cookie Policy
									</span>
									.
								</Label>
							</Stack>

							{/* -------------------------------button */}
							<Stack width={'100%'} direction={'row'} justifyContent={'center'} alignItems={'center'}>
								<NextButton type="submit" sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }} isLoading={loading}>
									AGREE & JOIN
								</NextButton>
							</Stack>
						</DownButtonContainer>
					</Stack>
				</FormProvider>
			</SignContainer>
		</AuthSection>
	);
};

export default Step2;

// -------------------------------schema
const SigninSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name').trim(),
	email: Yup.string().email().required('Enter Your Email').trim(),
	password: Yup.string().required('Enter Your Password').trim(),
});
