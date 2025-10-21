import { Card, Stack, styled } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';

const Lottie = dynamic(()=>import("lottie-react"), {ssr:false})

export default function TableWrapperSetting({
	children,
	isFetching,
}: React.PropsWithChildren & { isFetching?: boolean }) {
	return (
		<StyledSettingCard>
			{isFetching && <Loader />}
			{children}
		</StyledSettingCard>
	);
}

const StyledSettingCard = styled(Card)(({ theme }) => ({
	margin: '5px 0',
	boxShadow: 'none',
	border: 'none',
}));

export function Loader() {
	return (
		<Stack
			top={0}
			left={0}
			right={0}
			bottom={0}
			zIndex={999}
			bgcolor="white"
			position="absolute"
			alignItems="center"
			justifyContent="center"
		>
			<Lottie loop style={{ width: 250 }} />
		</Stack>
	);
}
