import SearchIcon from '@/assets/search-icon';
import ModalContainer from '@/components/atoms/Modal';
import { Box, useTheme } from '@mui/material';
import React from 'react';
import { HeaderProps } from '../../type';
import SearchModal from '../../modal';

const SearchItem = ({ handelModal, handleClose, open }:Partial<HeaderProps>) => {
	const theme = useTheme();
	return (
		<>
			<Box sx={{ cursor: 'pointer' }} onClick={handelModal}>
				<SearchIcon fill={open ? theme?.palette?.infuuse?.blue100 : theme?.palette?.infuuse?.gray500} />
			</Box>
			<ModalContainer open={open} handleClose={handleClose}>
				<SearchModal handleClose={handleClose} />
			</ModalContainer>
		</>
	);
};

export default SearchItem;
