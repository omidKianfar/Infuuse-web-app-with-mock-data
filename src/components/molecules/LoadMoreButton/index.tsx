
import { NextButton } from '@/components/atoms/Button';
import { styled } from '@mui/material';
import React, { forwardRef, useEffect } from 'react';

type Props = React.ComponentProps<typeof Button> & {
	inView: boolean;
	isFetching: boolean;
	fetchNextPage: () => void;
	hasNextPage?: boolean | undefined;
};

const LoadMoreButton = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const { inView, isFetching, hasNextPage, fetchNextPage, ...rest } = props;

	useEffect(() => {
		if (inView && hasNextPage && !isFetching) fetchNextPage();
	}, [props]);

	if (!hasNextPage) return null;

	return (
		<StyledContainer ref={ref}>
			<NextButton width={150} variant="text" onClick={fetchNextPage} loading={Boolean(isFetching)} {...rest}>
				Load more
			</NextButton>
		</StyledContainer>
	);
});

const StyledContainer = styled('div')({
	width: '100%',
	display: 'flex',
	margin: '16px 0',
	alignItems: 'center',
	justifyContent: 'center',
});

export default LoadMoreButton;
