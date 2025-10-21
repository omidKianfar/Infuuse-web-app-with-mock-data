import { Box, MenuItem, Stack, TextField, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { NextButton } from '@/components/atoms/Button';
import { BusinessContainer, ColorPaletteBox, ColorPaletteContainer, CustomTextField, HeadComment, Label } from '../../styles';
import InfoIcon from '@mui/icons-material/Info';
import {
	ColorTagType,
	useAgencyMember_BusinessConnectionRequestMutation,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import BusinessEmailSearch from '@/components/atoms/search/business-email-select-search';


const ModifyBusinessInformation = () => {
	// -------------------------------tools
	const theme = useTheme();

	// -------------------------------query
	// add request to business
	const { mutate: addBusinessWithAgency } = useAgencyMember_BusinessConnectionRequestMutation();

	const [choosenBusinessId, setChoosenBusinessId] = useState<number | null>(null)
	const [choosenBusinessEmail, setChoosenBusinessEmail] = useState<string | null>(null)
	const [choosenTagColor, setChoosenTagColor] = useState<ColorTagType>(ColorTagType?.Black)


	const modifyBusinessInformationHandler = (values: any) => {
		addBusinessWithAgency(
			{
				businessId: Number(choosenBusinessId),
				colorTag: choosenTagColor,
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

	// color list
	const tagColorItems = [
		{ color: theme?.palette?.infuuseColorTag?.black, name: 'Black', value: ColorTagType?.Black },
		{ color: theme?.palette?.infuuseColorTag?.brown, name: 'Brown', value: ColorTagType?.Brown },
		{ color: theme?.palette?.infuuseColorTag?.red, name: 'Red', value: ColorTagType?.Red },
		{ color: theme?.palette?.infuuseColorTag?.orange, name: 'Orange', value: ColorTagType?.Orange },
		{ color: theme?.palette?.infuuseColorTag?.yellow, name: 'Yellow', value: ColorTagType?.Yellow },
		{ color: theme?.palette?.infuuseColorTag?.gold, name: 'Gold', value: ColorTagType?.Gold },
		{ color: theme?.palette?.infuuseColorTag?.green, name: 'Green', value: ColorTagType?.Green },
		{ color: theme?.palette?.infuuseColorTag?.blue, name: 'Blue', value: ColorTagType?.Blue },
		{ color: theme?.palette?.infuuseColorTag?.purple, name: 'Purple', value: ColorTagType?.Purple },
		{ color: theme?.palette?.infuuseColorTag?.pink, name: 'Pink', value: ColorTagType?.Pink },
		{ color: theme?.palette?.infuuseColorTag?.turquoise, name: 'Turquoise', value: ColorTagType?.Turquoise },
		{ color: theme?.palette?.infuuseColorTag?.seaGreen, name: 'Sea Green', value: ColorTagType?.SeaGreen },
		{ color: theme?.palette?.infuuseColorTag?.tan, name: 'Tan', value: ColorTagType?.Tan },
	];

	return (
		<Stack width={'100%'} height={'100%'}>
			<BusinessContainer>
				<HeadComment direction={'row'} justifyContent={'start'} alignItems={'start'} spacing={1}>
					<InfoIcon sx={{ fill: theme?.palette?.infuuse?.blue100 }} />

					<Label sx={{ wordBreak: 'break-word', wordWrap: 'break-word', textWrap: 'wrap' }}>
						In this section you can add businesses that already exist. Once you add the business, the owner
						will be notified and they can either accept or reject your request. Keep in mind that all
						business need a business owner even if you intend to fully manage them on your own as an agency.
					</Label>
				</HeadComment>
				{/* -------------------------------form */}
				<Stack position={'relative'}>
					{/* -------------------------------fields */}
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
						<Stack width={'50%'}>
							<Label>Email</Label>

							<BusinessEmailSearch
								choosenBusinessId={choosenBusinessId}
								setChoosenBusinessId={setChoosenBusinessId}
								choosenBusinessEmail={choosenBusinessEmail}
								setChoosenBusinessEmail={setChoosenBusinessEmail} />
						</Stack>

						<Stack width={'50%'}>
							<Label>Tag Color</Label>

							<CustomTextField name="tagColor" fullWidth select value={choosenTagColor}>
								{tagColorItems?.map((palette) => (
									<MenuItem key={palette?.value} value={palette?.value} onClick={() => setChoosenTagColor(palette?.value as ColorTagType)}>
										<ColorPaletteContainer direction={'row'} spacing={1}>
											<ColorPaletteBox bgcolor={palette?.color}></ColorPaletteBox>
											<Box>{palette?.name}</Box>
										</ColorPaletteContainer>
									</MenuItem>
								))}
							</CustomTextField>
						</Stack>
					</Stack>
				</Stack>

				{/* ------------------------------- button */}
				<Stack
					position={'absolute'}
					left={0}
					bottom={'16px'}
					width={'100%'}
					justifyContent={'end'}
					alignItems={'center'}
				>
					<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} px={2}>
						<NextButton onClick={modifyBusinessInformationHandler} sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}>
							Save
						</NextButton>
					</Stack>
				</Stack>
			</BusinessContainer>
		</Stack>
	);
};

export default ModifyBusinessInformation;


