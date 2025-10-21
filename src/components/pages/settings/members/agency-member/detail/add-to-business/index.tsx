import { Box, Checkbox, InputAdornment, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import { CheckboxContainer, Footer, Label, MemberContainer } from '../../../styles';
import { enqueueSnackbar } from 'notistack';
import { responseDestructure } from '@/utils';
import { useRouter } from 'next/router';
import BusinessIcon from '@/assets/business-icon';
import {
	AgencyMemberAssignmentStatus,
	SortEnumType,
	useAgencyMember_AddAssignmentToBusinessMutation,
	useBusiness_GetListAgencyRequestsQuery,
} from '@/graphql/generated';
import { Controller } from 'react-hook-form';
import { AccesssAgencyMemberAssignItems } from '../../../data';

interface DefaultValuesType {
	business: string;
	isManageAgencyUserAccess: boolean;
	isOpratorAccess: boolean;
	isReportAccess: boolean;
}

const AddToBusiness = () => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const MemberId = router?.query?.memberId;

	// -------------------------------query
	// get businesses
	const { data: businessRequests } = useBusiness_GetListAgencyRequestsQuery({
		skip: 0,
		take: 10000,
		where: {
			status: {
				eq: AgencyMemberAssignmentStatus?.Approved,
			},
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const BusinessRequestsData = businessRequests?.business_getListAgencyRequests?.result;

	// add to business
	const { mutate: addTobusiness } = useAgencyMember_AddAssignmentToBusinessMutation();

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		business: '',
		isManageAgencyUserAccess: true,
		isOpratorAccess: true,
		isReportAccess: true,
	};

	const methods = useForm({
		resolver: yupResolver(memberSchema),
		values: defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = (values: any) => {
		addTobusiness(
			{
				input: {
					status: AgencyMemberAssignmentStatus?.Approved,
					isSettingsManagmentAccess: values?.isManageAgencyUserAccess,
					isOpratorAccess: values?.isOpratorAccess,
					isReportAccess: values?.isReportAccess,
				},
				agencyMemberId: Number(MemberId),
				businessId: Number(values?.business),
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						reset();
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<Stack width={'100%'} height={'100%'}>
			<MemberContainer>
				{/* -------------------------------form */}
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack position={'relative'}>
						{/* -------------------------------fields */}

						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2} mt={2}>
							<Stack width={'50%'}>
								<Label mb={'4px'}>Business</Label>

								<TextField
									name="business"
									select
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<BusinessIcon />
											</InputAdornment>
										),
									}}
								>
									{BusinessRequestsData?.items?.map((item) => (
										<MenuItem value={item?.business?.id} key={item?.business?.id}>
											{item?.business?.name}
										</MenuItem>
									))}
								</TextField>
							</Stack>
						</Stack>
					</Stack>

					{/* access */}
					<Typography fontSize={'16px'} fontWeight={'bold'} color={theme?.palette?.infuuse?.blue200} mt={2}>
						Access Sets{' '}
					</Typography>

					<Box
						mt={2}
						width={'100%'}
						display={'flex'}
						justifyContent={'start'}
						alignItems={'center'}
						flexWrap={'wrap'}
						sx={{ gap: '16px 0' }}
					>
						{AccesssAgencyMemberAssignItems?.map((item) => {
							return (
								<Controller
									key={item.value}
									name={item.value}
									render={({ field: { onChange, value } }) => {
										return (
											<CheckboxContainer>
												<Checkbox
													checked={value}
													onChange={(e) => onChange(e.target.checked)}
												/>
												<Typography fontWeight={'bold'} color={theme?.palette?.common?.white}>
													{item.name}
												</Typography>
											</CheckboxContainer>
										);
									}}
								/>
							);
						})}
					</Box>

					{/* ------------------------------- footer */}
					<Footer>
						<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} px={2}>
							<NextButton type="submit" sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}>
								Add
							</NextButton>
						</Stack>
					</Footer>
				</FormProvider>
			</MemberContainer>
		</Stack>
	);
};

export default AddToBusiness;

// -------------------------------schema
const memberSchema = Yup.object().shape({
	business: Yup.string().required('Enter Your Business'),
	isManageAgencyUserAccess: Yup.boolean(),
	isOpratorAccess: Yup.boolean(),
	isReportAccess: Yup.boolean(),
});
