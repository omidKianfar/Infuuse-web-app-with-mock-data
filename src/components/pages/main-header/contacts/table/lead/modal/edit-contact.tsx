import { Box, Stack, Typography, styled, useTheme } from '@mui/material';
import React, { ChangeEvent, useRef, useState } from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import useFileUpload from '@/hooks/useUploadFile';
import { getFullImageUrl, responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import Avatar from '@/components/atoms/avatar';
import { EditAvatarContainer } from '@/components/pages/settings/businesses/styles';
import EditIcon from '@/assets/edit-icon';
import CloseIconBox from '@/assets/close-icon-box';
import EmailsInput from '@/components/atoms/contact-form-array/emils';
import PhonesInput from '@/components/atoms/contact-form-array/phones';
import AddressesInput from '@/components/atoms/contact-form-array/addresses';
import {
	Deal,
	TypeContactNetwork,
	useContact_EditMutation,
	useContactNetwork_GetListByContactIdQuery,
} from '@/graphql/generated';
import { useQueryClient } from '@tanstack/react-query';

interface DefaultValuesType {
	firstName: string;
	lasttName: string;
	JobTitle: string;
	companyName: string;
	emails: [];
	phones: [];
	addresses: [];
	business: string;
}

interface Props {
	handleClose: () => void;
	deal: Deal;
}

const EditContactModal = ({ handleClose, deal }: Props) => {
	// ------------------------------- tools
	const theme = useTheme();
	const queryClient = useQueryClient();

	// -------------------------------state
	const [photoUrl, setPhotoUrl] = useState(deal?.contact?.photoUrl);

	// -------------------------------query
	// network emails
	const NetworkEmails = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(deal?.contact?.id),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.Email,
			},
		},
	});

	const NetworkEmailsData = NetworkEmails?.data?.contactNetwork_getListByContactId?.result?.items?.map((item) => ({
		id: item?.id,
		value: item?.value,
	}));

	// network phones
	const NetworkPhones = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(deal?.contact?.id),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.PhoneNumber,
			},
		},
	});

	const NetworkPhonesData = NetworkPhones?.data?.contactNetwork_getListByContactId?.result?.items?.map((item) => ({
		id: item?.id,
		value: item?.value,
	}));


	// network addresses
	const NetworkAddressess = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(deal?.contact?.id),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.Address,
			},
		},
	});

	const NetworkAddressesData = NetworkAddressess?.data?.contactNetwork_getListByContactId?.result?.items?.map(
		(item) => ({ id: item?.id, value: item?.value })
	);

	// edit contact
	const { mutate: EditContact } = useContact_EditMutation();

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		firstName: deal?.contact?.firstName || '',
		lasttName: deal?.contact?.lastName || '',
		JobTitle: deal?.contact?.jobTitle || '',
		companyName: deal?.contact?.company || '',
		emails: NetworkEmailsData || [],
		phones: NetworkPhonesData || [],
		addresses: NetworkAddressesData || [],
		business: deal?.contact?.business?.name || '',
	};

	const methods = useForm({
		resolver: yupResolver(ContactSchema),
		values: defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: any) => {
		// emails map
		const EmailArr = values?.emails.map((email) => ({
			id: email?.id,
			url: '',
			value: email.value,
			typeContactNetwork: TypeContactNetwork?.Email,
		}));

		// phones map
		const phoneArr = values?.phones.map((phone) => ({
			id: phone?.id,
			url: '',
			value: phone?.value,
			typeContactNetwork: TypeContactNetwork?.PhoneNumber,
		}));

		// addresses map
		const addressArr = values?.addresses.map((address) => ({
			id: address?.id,
			url: '',
			value: address?.value,
			typeContactNetwork: TypeContactNetwork?.Address,
		}));


		EditContact(
			{
				contactId: Number(deal?.contact?.id),
				input: {
					fullName: values?.firstName + ' ' + values?.lasttName,
					firstName: values?.firstName,
					lastName: values?.lasttName,
					photoUrl: photoUrl,
					jobTitle: values?.JobTitle,
					company: values?.companyName,
					// isHubSpot: deal?.contact?.isHubSpot,
					contactNetworks: [...EmailArr, ...phoneArr, ...addressArr],
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						handleClose();
						queryClient.refetchQueries(['contact_getListByBusinessId']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	// -------------------------------functions
	// upload photo
	const inputRef = useRef<HTMLInputElement>();

	const { uploadFile, progress, reset, url } = useFileUpload();

	const UploadPicHandler = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (!files?.length) return;

		try {
			const res = await uploadFile(files[0]);

			setPhotoUrl(res?.url as string);
		} catch (error) {
			enqueueSnackbar('Failed upload photo', { variant: 'error' });
		} finally {
			event.target.value = '';
		}
	};

	return (
		<Stack
			width={'400px'}
			sx={{
				overflowY: 'auto',
			}}
			bgcolor={theme?.palette?.infuuse?.gray200}
			p={2}
			borderRadius={2}
			height={'600px'}
		>
			{/* -------------------------------haeder */}
			<Stack>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
					<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'} fontSize={'18px'}>
						Add Contact
					</Typography>

					<Box sx={{ cursor: 'pointer' }} onClick={handleClose}>
						<CloseIconBox />
					</Box>
				</Stack>
				<Stack>
					{/* -------------------------------form */}
					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
						{/* ------------------------------- avatar */}
						<Stack width={'100%'} direction={'row'} justifyContent={'center'} alignItems={'center'} mb={2}>
							<Stack mb={4} position={'relative'} width={'100px'} height={'100px'}>
								<Box position={'absolute'} left={'40%'} top={'40%'}>
									<Typography>{progress > 1 && progress < 100 ? `${progress}%` : null}</Typography>
								</Box>

								{/* -------------------------------photo */}
								<Avatar src={getFullImageUrl(photoUrl)} width={'100px'} height={'100px'} />

								<EditAvatarContainer
									onClick={() => {
										inputRef.current.click();
									}}
								>
									<EditIcon />
									<input
										type="file"
										hidden
										accept="image/*"
										onChange={(event) => UploadPicHandler(event)}
										ref={inputRef as any}
									/>
								</EditAvatarContainer>
							</Stack>
						</Stack>

						{/* -------------------------------fields */}
						<Stack>
							<Stack width={'100%'}>
								<Label mb={'4px'}>First Name</Label>

								<TextField name="firstName" fullWidth />
							</Stack>

							<Stack>
								<Label mb={'4px'}>Last Name</Label>

								<TextField name="lasttName" fullWidth />
							</Stack>
							<Stack>
								<Label mb={'4px'}>Job Title</Label>

								<TextField name="JobTitle" fullWidth />
							</Stack>

							<Stack>
								<Label mb={'4px'}>Company Name</Label>

								<TextField name="companyName" fullWidth />
							</Stack>

								<EmailsInput name={'emails'} />

								<PhonesInput name={'phones'} />

								<AddressesInput name={'addresses'} />

							<Stack>
								<Label mb={'4px'}>Business</Label>

								<TextField name="business" disabled fullWidth />
							</Stack>
						</Stack>

						{/* ------------------------------- footer */}
						<Stack width={'100%'} direction={'row'} alignItems={'center'} mt={'50px'}>
							<NextButton type="submit" sx={{ width: '100%', fontSize: '16px', fontWeight: 600 }}>
								Save
							</NextButton>
						</Stack>
					</FormProvider>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default EditContactModal;

// -------------------------------schema
const ContactSchema = Yup.object().shape({
	firstName: Yup.string().required('Enter Your First Name').trim(),
	lasttName: Yup.string().required('Enter Your Last Name').trim(),
});

// ------------------------------------styles
export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));
