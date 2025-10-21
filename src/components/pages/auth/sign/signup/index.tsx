import React, { createContext, useState } from 'react';
import Step3 from './step3/step3';
import Step1 from './step1/step1';
import Step2 from './step2/step2';
import { Stack, useTheme } from '@mui/material';
import Step4 from './step4/step4';
import { useAuth } from '@/providers/AuthProvider';
import { UserType } from '@/graphql/generated';

const Signup = () => {
	// -------------------------------tools
	const theme = useTheme();

	const { signupStepCounter } = useAuth();

	return (
		<Stack bgcolor={theme?.palette?.infuuse.gray200}>
			{signupStepCounter === 0 ? (
				<Step1 />
			) : signupStepCounter === 1 ? (
				<Step2 />
			) : signupStepCounter === 2 ? (
				<Step3 />
			) : signupStepCounter === 3 ? (
				<Step4 />
			) : null}
		</Stack>
	);
};

export default Signup;
