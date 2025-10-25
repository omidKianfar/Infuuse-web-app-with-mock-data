import React, { lazy, Suspense } from 'react';
import { Stack, useTheme } from '@mui/material';
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';
import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';

const Step1 = lazy(() => import('./step1/step1'));
const Step2 = lazy(() => import('./step2/step2'));
const Step3 = lazy(() => import('./step3/step3'));
const Step4 = lazy(() => import('./step4/step4'));

const Signup = () => {
	const theme = useTheme();

	const { signupStepCounter } = useAuth();
	console.log(signupStepCounter);

	return (
		<Stack bgcolor={theme?.palette?.infuuse.gray200}>
			<Suspense fallback={<LoadingProgress />}>
				{signupStepCounter === 0 ? (
					<Step1 />
				) : signupStepCounter === 1 ? (
					<Step2 />
				) : signupStepCounter === 2 ? (
					<Step3 />
				) : signupStepCounter === 3 ? (
					<Step4 />
				) : null}
			</Suspense>
		</Stack>
	);
};

export default Signup;
