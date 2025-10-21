import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { Controller, useFormContext } from 'react-hook-form';

interface Props extends Omit<FormControlLabelProps, 'control'> {
	name: string;
	label?: string;
	color?: SwitchProps['color'];
	helperText?: React.ReactNode;
}

export default function RHFSwitch({ name, color, helperText, ...other }: Props) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div>
					<FormControlLabel control={<Switch {...field} color={color} checked={field.value} />} {...other} />

					{(!!error || helperText) && (
						<FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
					)}
				</div>
			)}
		/>
	);
}
