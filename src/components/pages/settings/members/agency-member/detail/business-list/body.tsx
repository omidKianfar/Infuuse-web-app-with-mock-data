import { Checkbox, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import {
	AgencyMemberAssignment,
	AgencyMemberAssignmentStatus,
	useAgencyMember_EditAssignmentToBusinessMutation,
} from '@/graphql/generated';
import { getFullImageUrl, responseDestructure } from '@/utils';
import { CheckboxFlexContainer, StyledTableCell, StyledTableRow } from '../../../styles';
import { NextButton } from '@/components/atoms/Button';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import { FormProvider, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { enqueueSnackbar } from 'notistack';
import { AccesssAgencyMemberAssignItems } from '../../../data';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
	businessAssignment: AgencyMemberAssignment;
}

interface DefaultValuesType {
	isSettingsManagmentAccess: boolean;
	isOpratorAccess: boolean;
	isReportAccess: boolean;
}

const BodyAssignment = ({ businessAssignment }: Props) => {
	// -------------------------------query

	// edit assignment
	const { mutate: agencyAccessBusinessAssign } = useAgencyMember_EditAssignmentToBusinessMutation();

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		isSettingsManagmentAccess: businessAssignment?.isSettingsManagmentAccess || false,
		isOpratorAccess: businessAssignment?.isOpratorAccess || false,
		isReportAccess: businessAssignment?.isReportAccess || false,
	};

	const methods = useForm({
		resolver: yupResolver(memberAssignmentSchema),
		values: defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: any) => {
		agencyAccessBusinessAssign(
			{
				agencyMemberAssignmentId: Number(businessAssignment?.id),
				input: {
					status: AgencyMemberAssignmentStatus?.Approved,
					isSettingsManagmentAccess: values?.isSettingsManagmentAccess,
					isOpratorAccess: values?.isOpratorAccess,
					isSocialManagmentAccess: values?.isSocialManagmentAccess,
					isReportAccess: values?.isReportAccess,
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<StyledTableRow onClick={(e) => e.stopPropagation()}>
			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
					<Avatar src={getFullImageUrl(businessAssignment?.business?.logo)} width={'42px'} height={'42px'} />
					
					<Typography fontSize={'14px'} ml={1}>
						{stringSlicer(businessAssignment?.business?.name, 25)}
					</Typography>
				</Stack>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>
					{businessAssignment?.lastModifiedDate
						? dayjs(businessAssignment?.lastModifiedDate).format('MM/DD/YYYY')
						: 'Pendding'}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
						<Stack
							direction={'row'}
							flexWrap={'wrap'}
							spacing={1}
							divider={<Divider orientation="vertical" flexItem />}
						>
							{AccesssAgencyMemberAssignItems?.map((item) => {
								return (
									<Controller
										key={item.value}
										name={item.value}
										render={({ field: { onChange, value } }) => {
											return (
												<CheckboxFlexContainer direction={'row'}>
													<Checkbox
														checked={value}
														onChange={(e) => onChange(e.target.checked)}
													/>
													<Typography fontWeight={'bold'}>{item.name}</Typography>
												</CheckboxFlexContainer>
											);
										}}
									/>
								);
							})}
						</Stack>

						<NextButton type="submit" sx={{ borderRadius: '360px', height: '42px' }}>
							<CheckIcon />
						</NextButton>
					</Stack>
				</FormProvider>
			</StyledTableCell>
		</StyledTableRow>
	);
};

export default BodyAssignment;

// -------------------------------schema
const memberAssignmentSchema = Yup.object().shape({
	isSettingsManagmentAccess: Yup.boolean(),
	isOpratorAccess: Yup.boolean(),
	isReportAccess: Yup.boolean(),
});
