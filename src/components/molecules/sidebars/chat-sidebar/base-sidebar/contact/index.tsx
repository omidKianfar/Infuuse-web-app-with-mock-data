import { Box, Stack, Typography, styled, useTheme } from '@mui/material';
import React, { ChangeEvent, useContext, useRef, useState } from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import { BaseSidebarContext } from '..';
import useFileUpload from '@/hooks/useUploadFile';
import { getFullImageUrl, responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import Avatar from '@/components/atoms/avatar';
import { EditAvatarContainer } from '@/components/pages/settings/businesses/styles';
import EditIcon from '@/assets/edit-icon';
import EmailsInput from '../../../../../atoms/contact-form-array/emils';
import PhonesInput from '../../../../../atoms/contact-form-array/phones';
import AddressesInput from '../../../../../atoms/contact-form-array/addresses';
import CloseIconBox from '@/assets/close-icon-box';
import { useRouter } from 'next/router';
import {
	TypeContactNetwork,
	useBusiness_GetByBusinessIdQuery,
	useContact_EditMutation,
	useContact_GetByContactIdQuery,
	useContactNetwork_GetListByContactIdQuery,
} from '@/graphql/generated';
import { queryClient } from 'pages/_app';

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

const ContactSidebar = () => {
	// ------------------------------- tools
	const theme = useTheme();
	const router = useRouter();

	const contactId = router?.query?.contactId;
	const businessId = router?.query?.businessId;

	// -------------------------------context
	const { sidebars, setSidebars } = useContext(BaseSidebarContext);

	// -------------------------------query
	// contact data
	const { data: contacts } = useContact_GetByContactIdQuery({
		contactId: Number(contactId),
	});

	const ContactsData = contacts?.contact_getByContactId?.result;

	// business data
	const { data: business } = useBusiness_GetByBusinessIdQuery({
		businessId: Number(businessId),
	});

	const BusinessData = business?.business_getByBusinessId?.result;

	// network emails
	const NetworkEmails = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(contactId),
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
		contactId: Number(contactId),
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
		contactId: Number(contactId),
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

	// -------------------------------state
	const [photoUrl, setPhotoUrl] = useState(ContactsData?.photoUrl);

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		firstName: ContactsData?.firstName || '',
		lasttName: ContactsData?.lastName || '',
		JobTitle: ContactsData?.jobTitle || '',
		companyName: ContactsData?.company || '',
		emails: NetworkEmailsData || [],
		phones: NetworkPhonesData || [],
		addresses: NetworkAddressesData || [],
		business: BusinessData?.name || '',
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
				contactId: Number(contactId),
				input: {
					fullName: values?.firstName + ' ' + values?.lasttName,
					firstName: values?.firstName,
					lastName: values?.lasttName,
					photoUrl: photoUrl,
					jobTitle: values?.JobTitle,
					company: values?.companyName,
					// isHubSpot: ContactsData?.isHubSpot,
					contactNetworks: [...EmailArr, ...phoneArr, ...addressArr],
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						setSidebars({
							...sidebars,
							contact: false,
						});
						queryClient.invalidateQueries(['contact_getByContactId']);
						queryClient.invalidateQueries(['conversation_getList']);
						queryClient.invalidateQueries(['contactNetwork_getListByContactId']);
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
			width={'360px'}
			height={'100%'}
			sx={{
				overflowY: 'auto',
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				scrollbarWidth: 'none',
				scrollbarColor: 'transparent transparent',
			}}
			bgcolor={theme?.palette?.infuuse?.gray200}
			p={2}
			borderRadius={2}
		>
			{/* -------------------------------haeder */}
			<Stack>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
					<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'} fontSize={'18px'}>
						Contact
					</Typography>

					<Box
						sx={{ cursor: 'pointer' }}
						onClick={() =>
							setSidebars({
								...sidebars,
								contact: false,
							})
						}
					>
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

export default ContactSidebar;

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
