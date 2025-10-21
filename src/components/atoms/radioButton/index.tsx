import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function RowRadioButtonsGroup() {
	return (
		<FormControl>
			<RadioGroup
				style={{ justifyContent: 'space-evenly' }}
				row
				aria-labelledby="demo-row-radio-buttons-group-label"
				name="row-radio-buttons-group"
			>
				<FormControlLabel value="As Individual" control={<Radio size="small" />} label="As Individual" />
				<FormControlLabel value="As Team" control={<Radio size="small" />} label="As Team" />
			</RadioGroup>
		</FormControl>
	);
}
