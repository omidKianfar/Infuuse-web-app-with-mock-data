import { Avatar, CircularProgress, FormHelperText, Stack } from '@mui/material';
import { SxProps, styled } from '@mui/material/styles';
import { Add } from 'iconsax-react';
import { isString } from 'lodash';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import { getFullImageUrl } from 'src/utils';
import { NextButton as Button } from '../Button';

const RootStyle = styled('div')(({ theme }) => ({
	width: 200,
	height: 225,
	display: 'flex',
	borderRadius: 5,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#F4F4F4',
	border: '1px solid #EBEBEB',
}));

const DropZoneStyle = styled('div')<{ disabled?: boolean }>(({ disabled }) => ({
	zIndex: 0,
	width: '100%',
	height: '100%',
	display: 'flex',
	outline: 'none',
	overflow: 'hidden',
	position: 'relative',
	alignItems: 'center',
	justifyContent: 'center',
	'& > *': { width: '100%', height: '100%' },
	...(!disabled && {
		'&:hover': {
			cursor: 'pointer',
			'& .placeholder': {
				zIndex: 9,
			},
		},
	}),
}));

const StyledAvatar = styled(Avatar)({
	width: 100,
	height: 100,
});

type RHFUploadAvatarProps = UploadAvatarProps & {
	name: string;
	accept?: string;
	disabled?: boolean;
	isUploading?: boolean;
	onDrop: (acceptedFiles: any[]) => void;
};
export function RHFUploadAvatar({ name, disabled, isUploading, ...other }: RHFUploadAvatarProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				const checkError = !!error && !field.value;
				return (
					<div>
						<UploadAvatar
							{...other}
							file={field.value}
							error={checkError}
							disabled={disabled}
							isUploading={isUploading}
						/>
						{checkError && (
							<FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
								{error.message}
							</FormHelperText>
						)}
					</div>
				);
			}}
		/>
	);
}

interface UploadAvatarProps {
	sx?: SxProps;
	error?: boolean;
	dense?: boolean;
	disabled?: boolean;
	isUploading?: boolean;
	file?: string | object;
	helperText?: React.ReactNode;
}

function UploadAvatar({ sx, error, file, dense, disabled, helperText, isUploading, ...other }: UploadAvatarProps) {
	const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
		multiple: false,
		accept: { 'image/*': [] },
		...other,
	});
	return (
		<>
			<RootStyle
				sx={{
					position: 'relative',
					...((isDragReject || error) && { borderColor: 'error.light' }),
					...(dense && { pb: 2, width: 'auto', height: 'auto', bgcolor: 'transparent', border: 'none' }),
					...sx,
				}}
			>
				<DropZoneStyle {...getRootProps()} disabled={disabled} sx={{ ...(isDragActive && { opacity: 0.72 }) }}>
					<input {...getInputProps()} disabled={disabled} />

					<Stack spacing={1} alignItems="center" justifyContent="center">
						<Stack overflow="hidden" borderRadius="50%" position="relative" border="1px dashed gray">
							<StyledAvatar alt="avatar" src={isString(file) ? getFullImageUrl(file) : file?.preview} />
							{isUploading && <Loader />}
						</Stack>
						{!disabled && (
							<Button type="button" variant="text" startIcon={<Add size={32} />}>
								Upload image
							</Button>
						)}
					</Stack>
				</DropZoneStyle>
			</RootStyle>

			{helperText && helperText}
		</>
	);
}

const Loader = () => {
	return (
		<Stack
			top={0}
			left={0}
			right={0}
			bottom={0}
			zIndex={999}
			bgcolor="#FFF"
			position="absolute"
			alignItems="center"
			justifyContent="center"
		>
			<CircularProgress size={21} color="inherit" />
		</Stack>
	);
};
