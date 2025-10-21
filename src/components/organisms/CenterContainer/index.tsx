import { styled } from '@mui/material/styles';

const Container = styled('div')({
	display: 'flex',
	justifyContent: 'flex-start',
});

export default function CenterContainer({ children }: { children: any }) {
	return <Container>{children}</Container>;
}
