import { Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';

import Step1 from './step1';
import Step2 from './step2';

interface Props {
	handleClose: () => void;
}

const AddTagModal = ({ handleClose }: Props) => {
	const [counter, setCounter] = useState(0);

	return (
		<Stack>
			{counter === 0 ? (
				<Step1 handleClose={handleClose} setCounter={setCounter} />
			) : (
				<Step2 setCounter={setCounter} />
			)}
		</Stack>
	);
};

export default AddTagModal;
