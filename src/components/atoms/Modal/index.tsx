import * as React from 'react';
import Modal from '@mui/material/Modal';
import { styled, Box } from '@mui/material';

type Props = React.PropsWithChildren & {
	open: boolean;
	handleClose: () => void;
};

const CustomBox = styled(Box)((theme) => ({
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: theme.theme.palette.common.white,
	borderRadius: '32px',
	outline: 'none',
}));

export default function ModalContainer({ open, handleClose, children }: Props) {
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<CustomBox>{children}</CustomBox>
			</Modal>
		</div>
	);
}
