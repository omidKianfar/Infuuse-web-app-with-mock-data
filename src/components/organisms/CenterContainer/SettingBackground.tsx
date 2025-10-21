import { styled } from '@mui/material/styles';

const Container = styled('div')({
	display: 'flex',
});

export default function SettingContainer({ children }: { children: any }) {
	return (
		<>
			<Container>{children}</Container>
		</>
	);
}
