import { Card, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

export default function StyleCardContainer({ children }: React.PropsWithChildren) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<StyledCard sx={{ margin: isMobile ? '10px' : '0', padding: isMobile ? '24px ' : '20px 50px' }}>
			{children}
		</StyledCard>
	);
}

const StyledCard = styled(Card)({
	width: 550,
	borderRadius: '30px',
});
