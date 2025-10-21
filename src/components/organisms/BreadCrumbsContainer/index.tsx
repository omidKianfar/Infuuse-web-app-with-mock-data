import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Header = styled(Box)({
	width: '100%',
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
});

export default function BreadCrumbsHeaderContainer({ children }: { children: any }) {
	return <Header>{children}</Header>;
}
