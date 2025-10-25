import dayjs from 'dayjs';
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormContext, Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CustomeDatePicker = styled(DatePicker)<{ light?: boolean; height?: number; value?: any }>(
	({ theme, light = false, height = 0, value }) => ({
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
	})
);

type RHFDatePickerType = React.ComponentProps<typeof DatePicker> & {
	name: string;
	label: string;
	light?: boolean;
	height?: number;
};

export default function RHFDatePicker({ name, label, ...other }: RHFDatePickerType) {
	const { control } = useFormContext();

	return (
		<div>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState: { error } }) => {
					return (
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<CustomeDatePicker
								label={label}
								sx={{ mb: 2 }}
								format="MM/DD/YYYY"
								value={field?.value ? dayjs(field?.value) : null}
								onChange={(newValue: any) => field.onChange(newValue)}
								slotProps={{
									textField: {
										error: !!error,
										fullWidth: true,
										helperText: error?.message,
									},
								}}
								{...other}
							/>
						</LocalizationProvider>
					);
				}}
			/>
		</div>
	);
}
