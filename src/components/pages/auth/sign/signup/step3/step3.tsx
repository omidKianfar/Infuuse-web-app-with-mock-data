import { Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import Header from './header';
import HeaderStandard from './standard/header';
import BodyStandard from './standard/body';
import HeaderBasic from './basic/header';
import BodyBasic from './basic/body';
import HeaderEnterprise from './enterprise/header';
import BodyEnterprise from './enterprise/body';

const Step3 = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Stack width={'100%'} height={'100vh'} minHeight={'100vh'} maxHeight={'100vh'} overflow={'auto'} p={2}>
			<Header />

			<Stack mt={'100px'}>
				<Grid container xs={12}>
					<Grid item xs={12} sm={12} md={12} lg={4} xl={4} p={isMobile ? 0 : '0 8px'}>
						{' '}
						<Stack
							position={'relative'}
							border={`3px solid ${theme?.palette?.common?.white}`}
							height={'100%'}
							borderRadius={'16px'}
							p={2}
							bgcolor={theme?.palette?.common?.white}
						>
							<HeaderBasic />

							<BodyBasic />
						</Stack>
					</Grid>

					{/* ------------------------------------------Standard  */}

					<Grid item xs={12} sm={12} md={12} lg={4} xl={4} p={isMobile ? '100px 0 0 0' : '0 8px'}>
						{' '}
						<Stack
							position={'relative'}
							border={`3px solid ${theme?.palette?.common?.white}`}
							height={'100%'}
							borderRadius={'16px'}
							p={2}
							bgcolor={theme?.palette?.common?.white}
						>
							<HeaderStandard />

							<BodyStandard />
						</Stack>
					</Grid>

					{/* ------------------------------------------Enterprise */}

					<Grid item xs={12} sm={12} md={12} lg={4} xl={4} p={isMobile ? '100px 0 0 0' : '0 8px'}>
						{' '}
						<Stack
							position={'relative'}
							border={`3px solid ${theme?.palette?.common?.white}`}
							height={'100%'}
							borderRadius={'16px'}
							p={2}
							bgcolor={theme?.palette?.common?.white}
						>
							<HeaderEnterprise />

							<BodyEnterprise />
						</Stack>
					</Grid>
				</Grid>
			</Stack>
		</Stack>
	);
};

export default Step3;
