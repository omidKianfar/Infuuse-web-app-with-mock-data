import 'react-international-phone/style.css';

import { IconButton, InputAdornment, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import { defaultCountries, FlagImage, parseCountry, usePhoneInput } from 'react-international-phone';
import CloseIconBox from '@/assets/close-icon-box';
import { TextField } from '@/components/atoms/Form';
import { useContactNetwork_DeleteByIdMutation } from '@/graphql/generated';
import { useSnapshot } from 'valtio';
import phonesStore from '@/store/phones.store';
export default ({ value = '', onChange, remove, index, phone, field, ...restProps }: any) => {
	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
		defaultCountry: 'us',
		value,
		countries: defaultCountries,
		onChange: (data) => {
			onChange(data.phone);
		},
	});

	const { phones } = useSnapshot(phonesStore);

	const { mutate: DelteNetwork } = useContactNetwork_DeleteByIdMutation();

	return (
		<TextField
			fullWidth
			color="primary"
			autoFocus
			placeholder="Phone number"
			value={inputValue}
			onChange={handlePhoneValueChange}
			type="tel"
			inputRef={inputRef}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start" style={{ marginRight: '2px', marginLeft: '-8px' }}>
						<Select
							MenuProps={{
								style: {
									height: '300px',
									width: '360px',
									top: '10px',
									left: '-34px',
								},
								transformOrigin: {
									vertical: 'top',
									horizontal: 'left',
								},
							}}
							sx={{
								width: 'max-content',
								// Remove default outline (display only on focus)
								fieldset: {
									display: 'none',
								},
								'&.Mui-focused:has(div[aria-expanded="false"])': {
									fieldset: {
										display: 'block',
									},
								},
								// Update default spacing
								'.MuiSelect-select': {
									padding: '8px',
									paddingRight: '24px !important',
								},
								svg: {
									right: 0,
								},
							}}
							value={country.iso2}
							onChange={(e) => setCountry(e.target.value)}
							renderValue={(value) => <FlagImage iso2={value} style={{ display: 'flex' }} />}
						>
							{defaultCountries.map((c) => {
								const country = parseCountry(c);
								return (
									<MenuItem key={country.iso2} value={country.iso2}>
										<FlagImage iso2={country.iso2} style={{ marginRight: '8px' }} />
										<Typography marginRight="8px">{country.name}</Typography>
										<Typography color="gray">+{country.dialCode}</Typography>
									</MenuItem>
								);
							})}
						</Select>
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							onClick={(e) => {
								const target = phones.find((item: any) => item.value === field.value);

								if (target && target.id) {
									DelteNetwork({
										contactNetworkId: Number(target.id),
									});
									remove(index);
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
			{...restProps}
		/>
	);
};
