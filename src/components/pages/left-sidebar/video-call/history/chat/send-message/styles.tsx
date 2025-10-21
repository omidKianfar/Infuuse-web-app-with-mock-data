import { styled, Typography } from '@mui/material';

export const CustomTypography = styled(Typography)(({ theme }) => ({
	wordBreak: 'break-word', textWrap: 'wrap', textJustify: 'inter-word'
}));
