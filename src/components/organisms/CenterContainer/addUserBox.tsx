import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContainerBox = styled(Box)(({ theme }) => ({
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
}));

export default function AddUserBox({ children }: { children: any }) {
	return <ContainerBox>{children}</ContainerBox>;
}
