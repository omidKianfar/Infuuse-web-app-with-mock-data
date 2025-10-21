import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Radio, RadioGroup, FormHelperText, FormControlLabel } from '@mui/material';

type RHFRadioGroupProps = Partial<React.ComponentProps<typeof RadioGroup>> & {
	name: string;
	options: Array<string>;
	getOptionLabel?: Array<string>;
};

export default function RHFRadioGroup({ name, options, getOptionLabel, ...other }: RHFRadioGroupProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div>
					<RadioGroup {...field} {...other}>
						{options.map((option, index) => (
							<FormControlLabel
								key={option}
								value={option}
								control={<Radio />}
								label={getOptionLabel?.length ? getOptionLabel[index] : option}
							/>
						))}
					</RadioGroup>

					{!!error && (
						<FormHelperText error sx={{ px: 2 }}>
							{error.message}
						</FormHelperText>
					)}
				</div>
			)}
		/>
	);
}
