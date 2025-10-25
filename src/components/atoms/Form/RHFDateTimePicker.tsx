import { styled } from '@mui/material/styles';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const CustomeDateTimePicker = styled(DateTimePicker)<{ light?: boolean; height?: number; value?: any }>
	(({ theme, light = false, height = 0, value }) => ({
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

type RHFDateTimePickerType = React.ComponentProps<typeof DateTimePicker> & {
	name: string;
	label: string;
	light?: boolean;
	height?: number;

};

export default function RHFDateTimePicker({ name, label, ...other }: RHFDateTimePickerType) {
	const { control } = useFormContext();

	return (
		<div>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState: { error } }) => {
					return (
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<CustomeDateTimePicker
								label={label}
								sx={{ mb: 2 }}
								format="DD/MM/YYYY hh:mm A"
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
