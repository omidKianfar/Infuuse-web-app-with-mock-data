declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xs: true;
		sm: true;
		md: true;
		lg: true;
		xl: true;
		xxl: true;
	}
}

const breakpoints = {
	values: {
		xs: 0,
		sm: 600,
		md: 900,
		lg: 1200,
		xl: 1536,
		xxl: 2500,
	},
};

export default breakpoints;
