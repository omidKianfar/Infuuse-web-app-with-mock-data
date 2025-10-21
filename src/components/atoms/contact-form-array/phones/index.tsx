import { useFieldArray, useFormContext } from '@/components/atoms/Form';
import { Box, Divider, Stack, Typography, styled } from '@mui/material';
import AddIcon from '@/assets/add-icon';
import { Controller } from 'react-hook-form';

import CustomPhoneInput from './CustomPhoneInput';

interface Props {
	name: string;
}
const PhonesInput = ({ name }: Props) => {
	const { control, register } = useFormContext();
	const { fields, append, remove } = useFieldArray({ name, control });

	return (
		<Stack>
			<Divider sx={{ mb: 1 }} />

			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<Label mb={'4px'}>Phone</Label>

				<Box sx={{ cursor: 'pointer' }} onClick={() => append({ value: '' })}>
					<AddIcon />
				</Box>
			</Stack>
			{fields?.map((field, index) => {
				const inputName = `${name}[${index}].value`;

				const phone = field;

				return (
					<Controller
						key={field.id}
						name={`${name}[${index}].value`}
						control={control}
						render={({ fieldState: { error }, field: { onChange, value } }) => {
							return (
								<Stack key={index}>
									<CustomPhoneInput
										value={value}
										name={inputName}
										onChange={onChange}
										remove={remove}
										index={index}
										phone={phone}
										field={field}
									/>
								</Stack>
							);
						}}
					/>
				);
			})}
		</Stack>
	);
};

export default PhonesInput;

// ------------------------------------styles
export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));
