import { Link, Typography } from '@mui/material';
import React, { forwardRef } from 'react';
import { GetFontValue } from 'src/utils';

type TextMaxLineProps = React.ComponentProps<typeof Typography> & {
	line?: number;
	asLink?: boolean;
	persistent?: boolean;
	variant?: TypographyType;
};

const TextMaxLine = forwardRef<any, TextMaxLineProps>(
	({ asLink, variant = 'body2', line = 1, persistent = false, children, sx, ...other }, ref) => {
		const { lineHeight } = GetFontValue(variant);

		const style = {
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			display: '-webkit-box',
			WebkitLineClamp: line,
			WebkitBoxOrient: 'vertical',
			...(persistent && {
				height: lineHeight * line,
			}),
			...sx,
		};

		if (asLink) {
			return (
				<Link color="inherit" ref={ref} variant={variant} sx={{ ...style, cursor: 'pointer' }} {...other}>
					{children}
				</Link>
			);
		}

		return (
			<Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
				{children}
			</Typography>
		);
	}
);

export default TextMaxLine;
