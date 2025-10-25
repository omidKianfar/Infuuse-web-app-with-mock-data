import { TextField, TextFieldProps, styled } from '@mui/material';
import { useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RHFTextFieldType = TextFieldProps & {
	name: string;
	label?: string;
	light?: boolean;
	height?: number;
};

export default function RHFTextField({ name, type, ...other }: RHFTextFieldType) {
	const { control } = useFormContext();

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onChangePasswordVisibility = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<CustomTextField
					{...field}
					fullWidth
					sx={{ mb: 2 }}
					error={!!error}
					value={type === 'number' && field.value === 0 ? '' : field.value}
					helperText={error?.message || ''}
					FormHelperTextProps={{ sx: { fontSize: 12 } }}
					type={type}
					onChange={(event) => {
						if (type === 'number') {
							field.onChange(Number(event.target.value));
						} else {
							field.onChange(event.target.value);
						}
					}}
					{...other}
				/>
			)}
		/>
	);
}

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '48px',

		'& .MuiInputBase-input': {
			color: theme?.palette?.infuuse.blueLight400,
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
		},
	},
}));
