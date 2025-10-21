import { FormHelperText, Select as MSelect } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';

const SelectInput = styled(MSelect)<{ light?: boolean; height?: number }>(({ theme, light = false, height = 0 }) => ({
	height: height ? height : 'auto',
	border: 'none',
	fontSize: '15px',
	borderRadius: 4,
	color: theme.palette.text.primary,
	backgroundColor: `${light || theme.palette.mode == 'light' ? '#F5F5F5' : theme.palette.primary.dark} !important`,
	'&::before': {
		borderBottomColor: `${theme.palette.primary.dark} !important`,
	},
	'.MuiSvgIcon-root ': {
		fill: 'white !important',
		fontSize: '25px',
	},
	'.MuiOutlinedInput-notchedOutline': {
		borderColor: `${theme.palette.primary.dark} !important`,
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: `${theme.palette.primary.dark} !important`,
	},
	'&:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: `${theme.palette.primary.dark} !important`,
	},
}));

type RHFSelectInputType = SelectInputProps &
	React.PropsWithChildren & {
		name: string;
		label?: string;
		light?: boolean;
		height?: number;
		onChanged?: (e: any) => void;
	};

export default function RHFSelectInput({ name, label, children, onChanged, ...other }: RHFSelectInputType) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<>
					<SelectInput
						fullWidth
						// variant="filled"
						{...field}
						error={!!error}
						onChange={(e) => {
							field.onChange(e.target.value);
							onChanged && onChanged(e);
						}}
						labelId={name + '-select-label'}
						id={name + '-select'}
						name={name}
						label={label}
						{...other}
					>
						{children}
					</SelectInput>

					{!!error && (
						<FormHelperText error sx={{ px: 2 }}>
							{error.message}
						</FormHelperText>
					)}
				</>
			)}
		/>
	);
}
