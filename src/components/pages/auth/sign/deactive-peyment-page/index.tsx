import React, { useState } from 'react';

import { Stack, useTheme } from '@mui/material';
import DeactivePage from './deactive';
import AddSubscription from './add-subscription';
import MainHeader from './main-header';

const DeactivePayment = () => {
	const theme = useTheme();

	const [counter, setCounter] = useState(0);

	return (
		<Stack width={'100%'} height={'100%'} bgcolor={theme?.palette?.infuuse.gray200} position={'relative'}>
			<MainHeader />

			{counter === 0 ? <DeactivePage setCounter={setCounter} /> : counter === 1 ? <AddSubscription /> : null}
		</Stack>
	);
};

export default DeactivePayment;
