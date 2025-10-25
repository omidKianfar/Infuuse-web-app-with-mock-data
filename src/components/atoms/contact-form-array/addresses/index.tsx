import { TextField, useFieldArray, useFormContext } from '@/components/atoms/Form';
import { Box, Divider, IconButton, InputAdornment, Stack, Typography, styled } from '@mui/material';
import AddIcon from '@/assets/add-icon';
import { Controller } from 'react-hook-form';
import CloseIconBox from '@/assets/close-icon-box';
import { useContactNetwork_DeleteByIdMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';

interface Props {
	name: string;
}
const AddressesInput = ({ name }: Props) => {
	const { control } = useFormContext();
	const { fields, append, remove } = useFieldArray({ name, control });

	const { mutate: DeleteNetwork } = useContactNetwork_DeleteByIdMutation();

	return (
		<Stack>
			<Divider sx={{ mb: 1 }} />
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<Label mb={'4px'}>Address</Label>

				<Box sx={{ cursor: 'pointer' }} onClick={() => append({ value: '' })}>
					<AddIcon />
				</Box>
			</Stack>
			{fields?.map((field, index) => {
				const inputName = `${name}[${index}].value`;
				const inputIdName = `${name}[${index}].id`;
				const address = field?.value;

				return (
					<Controller
						key={field.id}
						name={name}
						control={control}
						render={({ fieldState: { error }, field }) => {
							return (
								<Stack key={index}>
									<TextField
										fullWidth
										name={inputName}
										autoFocus
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={(e) => {
															const values = field.value;
															const target = values.find(
																(item: any) => item.value === address
															);
															console.log({ e });
															if (target.id) {
																DeleteNetwork(
																	{
																		contactNetworkId: Number(target.id),
																	},
																	{
																		onSuccess: (data) => {
																			const { status } =
																				responseDestructure(data);
																			if (status.code == 1) {
																				remove(index);
																			} else {
																				enqueueSnackbar(status.description, {
																					variant: 'error',
																				});
																			}
																		},
																	}
																);
															} else {
																remove(index);
															}
														}}
														sx={{ cursor: 'pointer' }}
													>
														<CloseIconBox />
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</Stack>
							);
						}}
					/>
				);
			})}
			<Divider sx={{ mt: '4px', mb: 1 }} />
		</Stack>
	);
};

export default AddressesInput;

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));
