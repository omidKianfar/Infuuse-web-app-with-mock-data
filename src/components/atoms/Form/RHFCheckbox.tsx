import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

type SingleCheckboxProps = Partial<React.ComponentProps<typeof FormControlLabel>> & {
	name: string;
};

export function RHFCheckbox({ name, ...other }: SingleCheckboxProps) {
	const { control } = useFormContext();

	return (
		<FormControlLabel
			{...other}
			control={
				<Controller
					name={name}
					control={control}
					render={({ field }) => <Checkbox {...field} checked={field.value} />}
				/>
			}
		/>
	);
}

type MultiCheckboxProps = SingleCheckboxProps & {
	options: Array<string>;
};

export function RHFMultiCheckbox({ name, options, ...other }: MultiCheckboxProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				const onSelected = (option: any) =>
					field.value.includes(option)
						? field.value.filter((value: any) => value !== option)
						: [...field.value, option];

				return (
					<FormGroup>
						{options.map((option) => (
							<FormControlLabel
								{...other}
								key={option}
								label={option}
								control={
									<Checkbox
										checked={field.value.includes(option)}
										onChange={() => field.onChange(onSelected(option))}
									/>
								}
							/>
						))}
					</FormGroup>
				);
			}}
		/>
	);
}
