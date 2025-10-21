import { CircularProgress } from '@mui/material';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props<
	T,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
	name: string;
	label?: string;
	placeholder?: string;
	helperText?: React.ReactNode;
}

export default function RHFAutocomplete<
	T,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined,
>({
	name,
	label,
	placeholder,
	helperText,
	...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
	const { control, setValue } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<Autocomplete
					{...field}
					onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
					renderInput={(params) => (
						<TextField
							{...params}
							label={label}
							error={!!error}
							placeholder={placeholder}
							helperText={error ? error?.message : helperText}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{other.loading ? <CircularProgress color="inherit" size={18} /> : null}
										{params.InputProps.endAdornment}
									</React.Fragment>
								),
							}}
						/>
					)}
					{...other}
				/>
			)}
		/>
	);
}
