import { Card, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function StyleCardProfile({ children }: React.PropsWithChildren) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return <Card sx={{ width: '100%', padding: isMobile ? '16px 24px 0 24px' : '24px' }}>{children}</Card>;
}
