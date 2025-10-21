import React from 'react';
import { Box, InputAdornment, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import { NextButton } from '@/components/atoms/Button';
import { Label } from '../../../styles';
import UserIcon from '@/assets/user-icon';
import { enqueueSnackbar } from 'notistack';
import CloseIconBox from '@/assets/close-icon-box';
import { AccountStateDto } from '@/graphql/generated';

interface Props {
    operators: number | null;
    setOperators: React.Dispatch<React.SetStateAction<number | null>>;
    handleClose: () => void;
    setCounter: React.Dispatch<React.SetStateAction<number>>
    operatorData: AccountStateDto;

}

const Step1 = ({ handleClose, operators, setOperators, setCounter, operatorData }: Props) => {
    const theme = useTheme()

    const handelNext = () => {
        if (operators) {
            setCounter(1)
        } else {
            enqueueSnackbar('Please choose operators number', { variant: 'error' });

        }
    }

    return (
        <Stack width={'100%'}>
            <Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} mb={1}>
                <Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
                    <CloseIconBox />
                </Box>
            </Stack>

            <Stack justifyContent={'space-between'} alignItems={'center'} mb={2} flexWrap={'wrap'} bgcolor={theme?.palette?.infuuse?.orange200} borderRadius={2} p={1}>
                <Typography color={theme?.palette?.infuuse?.blueDark500} textAlign={'center'}>
                    {`Allocated Seats: ${operatorData?.activeOperatorCount}`}
                </Typography>
                <Typography color={theme?.palette?.infuuse?.blueDark500} textAlign={'center'}>
                    {`Available Seats: ${operatorData?.maxOperatorCount}`}
                </Typography>
            </Stack>

            <Label mb={'4px'}>Change Available Seats</Label>

            <CustomTextField
                value={operators}
                name="operators"
                fullWidth
                placeholder='Number of seats e.g 4'
                onChange={(e) => setOperators(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <UserIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={4} width={'100%'}>
                <NextButton onClick={handleClose} sx={{ height: '40px', width: '150px' }}>
                    Cancel
                </NextButton>

                <NextButton onClick={handelNext} sx={{ height: '40px', width: '150px' }}>
                    Next
                </NextButton>
            </Stack>


        </Stack>
    );
};

export default Step1;



export const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme?.palette?.common?.white,
        borderRadius: '16px',
        height: '48px',

        '& .MuiInputBase-input': {
            color: theme?.palette?.infuuse.blueLight400,
            // borderRadius: "16px",
        },
        '& fieldset': {
            borderColor: theme?.palette?.infuuse.blue100,
            // borderRadius: "16px",
        },
        '&.Mui-focused fieldset': {
            borderColor: theme?.palette?.infuuse.blue100,
            // borderRadius: "16px",
        },
    },
}));